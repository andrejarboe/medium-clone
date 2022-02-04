import Navbar from '../../components/Navbar'
import { sanityClient, urlFor } from '../../lib/sanity'
import { Post } from '../../lib/typings'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

interface Props {
  post: Post
}

function Posts({ post }: Props) {
  //   console.log('***********page info*************')

  //   console.log(post)

  return (
    <main>
      <Navbar />

      <img
        className="h-40 w-full object-cover object-center"
        src={urlFor(post.mainImage).url()!}
        alt={post.title}
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={urlFor(post.author.image).url()!}
            alt={post.author.name}
          />
          <p className="text-sm font-extralight">
            Blog Post by{' '}
            <span className="text-green-600">{post.author.name} </span> -
            Published at {new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="prose mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              // hl: (props: any) => (
              //   <hl className="my-5 text-2xl font-bold" {...props} />
              // ),
              container: ({ children }) => children,
            }}
          />
        </div>
      </article>
    </main>
  )
}

export default Posts

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
        _id,
        slug{
            current
        }
    }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        title,
        author-> {
            name,
            image
        },
        description,
        mainImage,
        slug,
        body
    }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds, it will update the old cached version
  }
}

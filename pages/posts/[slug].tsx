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
            serializers={
              {
                // hl: (props: any) => (
                //   <hl className="my-5 text-2xl font-bold" {...props} />
                // ),
                // container: ({ children }) => children,
              }
            }
          />
        </div>
      </article>

      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />

      <form
        className="my-10 mx-auto mb-10 flex max-w-2xl flex-col p-5"
        action=""
      >
        <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
        <h4 className="text-3xl font-bold">Leave a comment below!</h4>
        <hr className="mt-2 py-3" />
        <label className="mb-5 block">
          <span className="text-gray-700">Name</span>
          <input
            className="form-input my-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
            placeholder="Bob Smith"
            type="text"
          />
        </label>
        <label className="mb-5 block">
          <span className="text-gray-700">Email</span>
          <input
            className="form-input my-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
            placeholder="bobsmith@example.com"
            type="text"
          />
        </label>
        <label className="mb-5 block">
          <span className="text-gray-700">Comment</span>
          <textarea
            className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
            placeholder="Bob Smith"
            rows={8}
          />
        </label>
      </form>
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

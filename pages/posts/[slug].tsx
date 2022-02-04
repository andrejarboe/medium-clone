import Navbar from '../../components/Navbar'
import { sanityClient, urlFor } from '../../lib/sanity'
import { Post } from '../../lib/typings'
import { GetStaticProps } from 'next'

interface Props {
  post: Post
}

function Posts({ post }: Props) {
//   console.log('***********page info*************')

//   console.log(post)

  return (
    <main>
      <Navbar />
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
        slug
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

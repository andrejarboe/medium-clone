import { log } from 'console'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../lib/sanity'
import { Post } from '../lib/typings'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  console.log(posts)

  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Banner */}
      <div className="flex items-center justify-between border-y border-black bg-yellow-400 py-10 md:py-0">
        {/* left Banner  */}
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write, read, and connect
          </h1>
        </div>
        {/*End left Banner  */}
        {/* Right Banner  */}
        <div className="">
          <img
            className="hidden h-32 md:inline-flex lg:h-full"
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
            alt=""
          />
        </div>
        {/*End Right Banner  */}
      </div>
      {/* END Banner */}

      {/* posts SSR */}
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                src={urlFor(post.mainImage).url()!}
                alt={post.title}
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
              />
              <div className="flex justify-between items-center bg-white p-5 ">
                <div className="">
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <div className="h-24 w-24 flex items-center justify-end">
                  <img
                    src={urlFor(post.author.image).url()!}
                    className="h-12 w-12 rounded-full object-cover"
                    alt={post.author.name}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* end posts SSR */}
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
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

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}

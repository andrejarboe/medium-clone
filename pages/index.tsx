import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
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

      {/* posts */}
        
      {/* end posts */}
    </div>
  )
}

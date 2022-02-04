import Link from 'next/link'

export default function Header() {
  return (
    <header className="mx-auto flex max-w-7xl justify-between p-5 ">
      {/* left  */}
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 cursor-pointer object-contain"
            src="https://links.papareact.com/yvf"
            alt="Medium logo"
          />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3 className="cursor-pointer">About</h3>
          <h3 className="cursor-pointer">Contact</h3>
          <h3 className="cursor-pointer rounded-full bg-green-600 px-4 py-1 text-white">
            Follow
          </h3>
        </div>
      </div>
      {/* end left  */}
      {/* right  */}
      <div className="flex items-center space-x-5 text-green-600 ">
        <h3 className="cursor-pointer">Sign In</h3>
        <h3 className="cursor-pointer rounded-full border px-4 py-1">
          Get Started
        </h3>
      </div>
      {/* end right  */}
    </header>
  )
}

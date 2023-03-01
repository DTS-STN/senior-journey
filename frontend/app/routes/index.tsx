import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto max-w-4xl">
          <section id="hero" className="mt-10 text-center">
            <h1 className="h1 text-5xl font-bold">Choose a language</h1>
            <div className="mt-4 text-xl text-gray-600">
              <Link to="/en">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                  English
                </button>
              </Link>
              <Link to="/fr">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                  Français
                </button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

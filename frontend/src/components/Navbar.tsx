import { Link } from "react-router-dom"

const Navbar = () => {
  console.log("navbar loaded")
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center max-w-5xl mx-auto justify-between px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            <Link to="/">Noteful</Link>
          </h1>
        </div>
        <div className="flex gap-6">
          <Link
            to="/"
            className="text-lg font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="text-lg font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Create new log
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


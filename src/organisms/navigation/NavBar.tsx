// src/organisms/navigation/Navbar.tsx
import { Link } from 'react-router-dom'
import { Search, Menu, Settings } from 'lucide-react'

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Hierloom</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
              <Search className="mr-2 h-4 w-4" />
              <span>Search...</span>
            </button>
          </div>

          <nav className="flex items-center space-x-2">
            <Link
              to="/settings"
              className="w-9 px-0 h-9 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 px-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </button>
          </nav>
        </div>
      </div>
    </nav>
  )
}
import { useState } from "react"
import { Link } from "react-router-dom"

interface NavbarItem {
  label: string
  href: string
}

const navItems: NavbarItem[] = [
  { label: "Apply", href: "/apply" },
  { label: "About Us", href: "/about-us" },
  { label: "Programs", href: "/programs" },
  // {
  //   label: "Info Session",
  //   href: "https://calendly.com/stemulate-program/info-sessions",
  // },
]

export const Navbar: React.FC = () => {
  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = useState<boolean>(false)

  return (
    <header className="relative z-50 flex w-full items-center justify-between bg-neutral-900 px-5 py-4 text-white backdrop-blur-md md:px-6 lg:px-8">
      <div className="text-xl font-bold">
        <Link to="/">
          <img className="p-2" src="logo.svg" alt="logo" />
        </Link>
      </div>

      <nav className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-2 text-base underline-offset-4 md:flex lg:gap-x-6 lg:text-xl">
        {[
          {
            label: "Home",
            href: "/",
          },
        ]
          .concat(navItems)
          .map((item, i) => (
            <Link
              key={i}
              to={item.href}
              className="hover:text-red-500 font-serif"
            >
              {item.label}
            </Link>
          ))}
      </nav>

      <div className="md:hidden relative">
        <button
          onClick={() => setIsMobileNavMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileNavMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div
          className={`absolute text-xl rounded-xl right-0 top-12 bg-neutral-900/90 backdrop-blur-md w-48 text-white flex flex-col space-y-3 p-4 rounded-lg border z-50 transform transition-all duration-300 ease-in-out origin-top-right ${
            isMobileNavMenuOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {[
            {
              label: "Home",
              href: "/",
            },
          ]
            .concat(navItems)
            .map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className="block hover:text-red-500 font-serif"
                onClick={() => setIsMobileNavMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
        </div>
      </div>
    </header>
  )
}

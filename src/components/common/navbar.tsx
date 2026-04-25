import { useState } from "react"
import { TransitionLink } from "./transition-link"

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

interface NavbarProps {
  withBottomFade?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ withBottomFade = false }) => {
  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = useState<boolean>(false)

  return (
    <header className="relative z-50">
      <div className="relative z-10 flex w-full items-center justify-between bg-neutral-900 px-5 py-4 text-white backdrop-blur-md md:px-6 lg:px-8">
        <div className="text-xl font-bold">
          <TransitionLink to="/">
            <img className="p-2" src="logo.svg" alt="logo" />
          </TransitionLink>
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
              <TransitionLink
                key={i}
                to={item.href}
                className="hover:text-red-500 font-serif"
              >
                {item.label}
              </TransitionLink>
            ))}
        </nav>

        <div className="relative md:hidden">
          <button
            onClick={() => setIsMobileNavMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6"
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
            className={`absolute right-0 top-12 z-50 flex w-48 origin-top-right flex-col space-y-3 rounded-lg rounded-xl border bg-neutral-900/90 p-4 text-xl text-white backdrop-blur-md transition-all duration-300 ease-in-out ${
              isMobileNavMenuOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0"
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
                <TransitionLink
                  key={i}
                  to={item.href}
                  className="block font-serif hover:text-red-500"
                  onClick={() => setIsMobileNavMenuOpen(false)}
                >
                  {item.label}
                </TransitionLink>
              ))}
          </div>
        </div>
      </div>
      {withBottomFade ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 translate-y-full bg-gradient-to-b from-neutral-900 to-transparent"
        />
      ) : null}
    </header>
  )
}

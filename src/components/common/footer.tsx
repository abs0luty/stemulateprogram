import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { FC } from "react"
import { TransitionLink } from "./transition-link"

interface FooterLink {
  href: string
  icon: JSX.Element
}

const links: FooterLink[] = [
  {
    href: "https://www.instagram.com/stemulate_program/",
    icon: <InstagramLogoIcon className="w-8 h-8" />,
  },
  {
    href: "https://www.linkedin.com/company/stemulate-program/",
    icon: <LinkedInLogoIcon className="w-8 h-8" />,
  },
  {
    href: "https://t.me/stemulate",
    icon: (
      <>
        <svg
          className="w-8 h-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 333334 333334"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            fill="#ffffff"
            d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm80219 91205l-29735 149919s-4158 10396-15594 5404l-68410-53854s76104-68409 79222-71320c3119-2911 2079-3534 2079-3534 207-3535-5614 0-5614 0l-100846 64043-42002-14140s-6446-2288-7069-7277c-624-4992 7277-7694 7277-7694l166970-65498s13722-6030 13722 3951zm-87637 122889l-27141 24745s-2122 1609-4443 601l5197-45965 26387 20619z"
          />
        </svg>
      </>
    ),
  },
]

const companyLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms Of Service", href: "/tos" },
  { name: "Contact Info", href: "/contact-info" },
]

interface FooterProps {
  withTopFade?: boolean
}

export const Footer: FC<FooterProps> = ({ withTopFade = false }) => (
  <footer className="relative bg-neutral-900 text-white">
    {withTopFade ? (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-neutral-900"
      />
    ) : null}
    <div className="relative container mx-auto">
      <div className="flex flex-col items-center gap-8 px-6 pb-8 pt-10 text-center sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:pt-12 lg:text-left">
        <div className="flex w-full justify-center lg:-ml-4 lg:mb-0 lg:w-auto lg:flex-shrink-0 lg:justify-start">
          <TransitionLink to="/">
            <img className="max-w-full p-2" src="logo.svg" alt="logo" />
          </TransitionLink>
        </div>
        <div className="grid w-full max-w-xl grid-cols-1 justify-items-center gap-x-2 gap-y-4 sm:grid-cols-2 lg:mb-0 lg:max-w-[24rem] lg:flex-1 lg:justify-items-start">
          {companyLinks.map(({ name, href }) => (
            <TransitionLink
              key={name}
              to={href}
              className="text-base transition hover:text-neutral-300 sm:text-lg"
            >
              {name}
            </TransitionLink>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 lg:mb-0 lg:w-auto lg:justify-end">
          {links.map(({ href, icon }) => (
            <a
              key={href}
              target="_blank"
              href={href}
              className="hover:bg-neutral-700 transition p-2 rounded-xl"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center py-4 text-gray-400 md:text-sm text-xs">
        &copy; 2025-2026 STEMulate Research Program. All rights reserved.
      </div>
    </div>
  </footer>
)

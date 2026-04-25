import { useEffect } from "react"
import { useLocation } from "react-router-dom"

type SeoConfig = {
  title: string
  description: string
  robots?: string
  path?: string
}

const SITE_NAME = "STEMulate Research Program"
const SITE_URL = "https://www.stemulateprogram.com"
const DEFAULT_OG_IMAGE = `${SITE_URL}/image.png`

const SEO_BY_PATH: Record<string, SeoConfig> = {
  "/": {
    title: "STEMulate Research Program | 2026 Research Bootcamp & Mentorship",
    description:
      "Join STEMulate's 2026 research program for motivated students: a research writing bootcamp, one-on-one mentorship, global cohort, and guidance toward original research projects.",
    path: "/",
  },
  "/apply": {
    title: "Apply for STEMulate 2026 | Research Bootcamp Application",
    description:
      "Apply to STEMulate 2026 for our research writing bootcamp and mentorship program. Submit your application through the official portal before the May 20 or May 31, 2026 deadlines.",
    path: "/apply",
  },
  "/programs": {
    title: "STEMulate Programs | Research Writing Bootcamp & Mentorship",
    description:
      "Explore STEMulate programs, including the Research Writing Bootcamp and Individual Research Mentorship Program for students building original research with expert guidance.",
    path: "/programs",
  },
  "/about-us": {
    title: "About STEMulate | Student Research Education Mission",
    description:
      "Learn about STEMulate's mission to train students in research, project development, and academic excellence across STEM, economics, and social sciences.",
    path: "/about-us",
  },
  "/publications": {
    title: "Student Publications | STEMulate Research Program",
    description:
      "Read student research papers and presentations produced through the STEMulate Research Program across healthcare, economics, education, and other fields.",
    path: "/publications",
  },
  "/contact-info": {
    title: "Contact STEMulate | Admissions & Program Questions",
    description:
      "Contact STEMulate for admissions, deadlines, program details, and application support by email or phone.",
    path: "/contact-info",
  },
  "/privacy-policy": {
    title: "Privacy Policy | STEMulate Research Program",
    description:
      "Review the STEMulate Research Program privacy policy for information about how applicant and participant data is collected, used, and protected.",
    robots: "noindex, follow",
    path: "/privacy-policy",
  },
  "/tos": {
    title: "Terms of Service | STEMulate Research Program",
    description:
      "Read the STEMulate Research Program terms of service for application portal use, eligibility, responsibilities, and participation rules.",
    robots: "noindex, follow",
    path: "/tos",
  },
  "*": {
    title: "Page Not Found | STEMulate Research Program",
    description:
      "The page you requested could not be found on the STEMulate Research Program website.",
    robots: "noindex, nofollow",
  },
}

const getOrCreateMetaTag = (attribute: "name" | "property", value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${value}"]`
  )

  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }

  return element
}

const getOrCreateCanonicalLink = () => {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )

  if (!element) {
    element = document.createElement("link")
    element.setAttribute("rel", "canonical")
    document.head.appendChild(element)
  }

  return element
}

export const RouteSeo = () => {
  const location = useLocation()
  const seo = SEO_BY_PATH[location.pathname] ?? SEO_BY_PATH["*"]
  const canonicalUrl = `${SITE_URL}${seo.path ?? location.pathname}`

  useEffect(() => {
    document.title = seo.title
    document.documentElement.lang = "en"

    getOrCreateMetaTag("name", "description").setAttribute(
      "content",
      seo.description
    )
    getOrCreateMetaTag("name", "robots").setAttribute(
      "content",
      seo.robots ?? "index, follow"
    )
    getOrCreateMetaTag("property", "og:title").setAttribute("content", seo.title)
    getOrCreateMetaTag("property", "og:description").setAttribute(
      "content",
      seo.description
    )
    getOrCreateMetaTag("property", "og:type").setAttribute("content", "website")
    getOrCreateMetaTag("property", "og:site_name").setAttribute(
      "content",
      SITE_NAME
    )
    getOrCreateMetaTag("property", "og:url").setAttribute("content", canonicalUrl)
    getOrCreateMetaTag("property", "og:image").setAttribute(
      "content",
      DEFAULT_OG_IMAGE
    )
    getOrCreateMetaTag("name", "twitter:card").setAttribute(
      "content",
      "summary_large_image"
    )
    getOrCreateMetaTag("name", "twitter:title").setAttribute(
      "content",
      seo.title
    )
    getOrCreateMetaTag("name", "twitter:description").setAttribute(
      "content",
      seo.description
    )
    getOrCreateMetaTag("name", "twitter:image").setAttribute(
      "content",
      DEFAULT_OG_IMAGE
    )

    getOrCreateCanonicalLink().setAttribute("href", canonicalUrl)
  }, [canonicalUrl, seo.description, seo.robots, seo.title])

  return null
}

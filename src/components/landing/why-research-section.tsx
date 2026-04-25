import { FC, ReactNode } from "react"
import { BookOpen, Orbit, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { StaggerText } from "@/components/ui/stagger-text"
import "./why-research-section.css"

interface ReasonWhyResearch {
  eyebrow: string
  title: string
  description: string
  icon: ReactNode
}

const iconShellClassName =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:h-14 sm:w-14 sm:rounded-2xl"

const ImpactIcon = () => (
  <motion.div
    animate={{ rotate: [0, 14, 0], scale: [1, 1.08, 1], y: [0, -2, 0] }}
    className={iconShellClassName}
    transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
  >
    <Orbit className="h-6 w-6 text-red-300 sm:h-8 sm:w-8" strokeWidth={2} />
  </motion.div>
)

const SkillsIcon = () => (
  <motion.div
    animate={{ y: [0, -4, 0], rotate: [0, -4, 0], scale: [1, 1.05, 1] }}
    className={iconShellClassName}
    transition={{ duration: 2.3, ease: "easeInOut", repeat: Infinity }}
  >
    <BookOpen className="h-6 w-6 text-red-300 sm:h-8 sm:w-8" strokeWidth={2} />
  </motion.div>
)

const CareerIcon = () => (
  <motion.div
    animate={{ y: [0, -3, 0], x: [0, 2, 0], scale: [1, 1.06, 1] }}
    className={iconShellClassName}
    transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
  >
    <TrendingUp
      className="h-6 w-6 text-red-300 sm:h-8 sm:w-8"
      strokeWidth={2.2}
    />
  </motion.div>
)

const reasonsWhyResearch: ReasonWhyResearch[] = [
  {
    eyebrow: "Real-world value",
    title: "Make an impact on the world",
    description:
      "Work on ideas that matter and turn your curiosity into something meaningful.",
    icon: <ImpactIcon />,
  },
  {
    eyebrow: "Personal growth",
    title: "Develop crucial skills",
    description:
      "Build critical thinking, analysis, writing, and problem-solving skills that last.",
    icon: <SkillsIcon />,
  },
  {
    eyebrow: "Future advantage",
    title: "Get a head start on your career",
    description:
      "Stand out in applications and interviews with a project that shows what you can do.",
    icon: <CareerIcon />,
  },
]

export const WhyResearchSection: FC = () => (
  <section
    className="section-with-fixed-bg relative overflow-hidden bg-cover bg-center bg-no-repeat
               px-5 py-24 text-white sm:px-10 lg:px-8 xl:px-6"
  >
    <div className="absolute inset-0 bg-black/60" />

    <div className="relative z-10 mx-auto max-w-[1600px]">
      <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-14">
        <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          <StaggerText className="font-serif" text="Why do research?" />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80 sm:text-2xl">
          Research is not just an academic exercise. It helps students build
          judgment, contribute meaningful work, and create a stronger path into
          university and future opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
        {reasonsWhyResearch.map((item, index) => (
          <article
            className="relative flex h-full flex-col overflow-hidden rounded-[28px]
                       border border-white/15 bg-white/10 px-6 pb-5 pt-6
                       shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl
                       transition duration-300 hover:bg-white/14 sm:px-7 sm:pb-6 sm:pt-7
                       lg:px-6 lg:pb-5 lg:pt-6"
            key={`research-reason-${index}`}
          >
            <div
              className="mb-6 flex min-h-14 items-center border-b border-white/10 pb-4"
            >
              {item.icon}
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-red-300/90">
              {item.eyebrow}
            </p>
            <h3
              className="max-w-[14rem] text-xl font-semibold leading-tight sm:text-2xl"
            >
              {item.title}
            </h3>
            <p className="mt-1 max-w-md flex-1 text-base leading-7 text-white/82 sm:text-lg">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

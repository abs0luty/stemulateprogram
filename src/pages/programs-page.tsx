import { FC } from "react"
import { StandartLayout } from "@/layout/standard-layout"
import { CheckCircle2Icon, StarsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const ProgramsPageContent: FC = () => {
  const programs = [
    {
      name: "Research Writing Bootcamp",
      phase: "Step 1",
      description:
        "An intensive foundation phase where students learn how strong research is framed, structured, and defended.",
      features: [
        "Interactive workshops & lectures",
        "Introduction to diverse research methodologies",
        "Training on academic writing conventions",
        "Plagiarism awareness & ethical research practices",
        "Group exercises & peer feedback",
      ],
      outcome: `Students will gain a robust theoretical and practical foundation in research principles, preparing them for independent research endeavors.`,
    },
    {
      name: "Individual Research Mentorship Program",
      phase: "Step 2",
      description:
        "A high-touch mentorship phase focused on taking a student's idea through refinement, execution, and final presentation.",
      features: [
        "Personalized research topic development",
        "Regular one-on-one feedback sessions",
        "Guidance on data collection & analysis",
        "Assistance with paper structuring & refinement",
        "Support for publication or presentation preparation",
      ],
      outcome: `Each student will complete a high-quality, original research paper under expert guidance, with potential opportunities for publication in academic journals or presentation at conferences.`,
    },
  ]

  return (
    <main className="min-h-screen bg-white px-4 py-20 text-black md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="space-y-3">
          <div className="space-y-4">
            <div className="space-y-3">
              <h1 className="max-w-lg text-4xl font-semibold leading-tight md:text-5xl">
                Our <span className="font-serif">Programs</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-gray-600">
                We guide students through a clear two-phase pathway: first,
                they build the research fundamentals; then, they turn that
                foundation into an original project with close mentorship.
              </p>
            </div>
          </div>
        </section>

        <section className="relative pl-10 md:pl-12">
          <div
            aria-hidden="true"
            className="absolute left-3 top-2 h-[calc(100%-0.5rem)] w-px bg-neutral-200 md:left-4"
          />
          <div className="space-y-8">
            {programs.map((program) => (
              <article
                key={program.name}
                className="relative grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              >
                <div className="absolute -left-10 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 bg-white md:-left-12">
                  <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-gray-500">
                      {program.phase}
                    </span>
                    <h2 className="max-w-sm text-2xl font-semibold leading-tight md:text-3xl">
                      <span className="font-serif">{program.name}</span>
                    </h2>
                    <p className="max-w-xl text-base leading-7 text-gray-600">
                      {program.description}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-5 md:p-6">
                  <ul className="mt-4 space-y-3">
                    {program.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-gray-700 md:text-base"
                      >
                        <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-neutral-200 pt-5 text-sm leading-6 text-gray-600 md:text-base">
                    {program.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-2xl font-semibold leading-tight">
                Interested in joining STEMulate?
              </p>
              <p className="text-base leading-7 text-gray-600">
                Learn more about the application process and what to expect.
              </p>
            </div>
            <Link
              to="/apply"
              className="w-fit"
            >
              <Button
                className="flex items-center rounded-xl bg-red-600 px-5 py-6 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-red-700 sm:text-base"
              >
                <StarsIcon className="h-5 w-5" />
                Apply now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export const ProgramsPage: FC = () => (
  <StandartLayout>
    <ProgramsPageContent />
  </StandartLayout>
)

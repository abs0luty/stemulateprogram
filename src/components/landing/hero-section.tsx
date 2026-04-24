import { Link } from "react-router-dom"
import { WorldMapSimple } from "./world-map"
import { StaggerText } from "@/components/ui/stagger-text"
import { StarsIcon } from "lucide-react"
import { DeadlineCountdown } from "./deadline-countdown"
import { Button } from "@/components/ui/button"
import { FC } from "react"

const highlightedCountries = [
  "United States",
  "China",
  "France",
  "United Kingdom",
  "Kazakhstan",
  "Austria",
  "Armenia",
  "Azerbaijan",
  "Brazil",
  "Uzbekistan",
  "Kyrgyzstan",
  "Nepal",
  "Italy",
  "Belarus",
  "Russia",
  "Philippines",
  "Vietnam",
  "Thailand",
  "India",
  "Indonesia",
  "Ukraine",
  "Peru",
]

export const HeroSection: FC = () => {
  return (
    <section className="text-white bg-neutral-900 text-center pt-12 px-5 pb-8 md:px-14 md:pb-12">
      <p className="font-semibold text-4xl md:text-5xl mb-4">
        <StaggerText className="font-serif" text="Develop your research" />
      </p>
      <p className="sm:text-xl md:text-2xl mb-6">
        Join students from over 20 countries in a world-class research program.
      </p>

      <div className="flex justify-center">
        <Link to="apply">
          <Button
            className="text-sm sm:text-base bg-red-600
    hover:bg-red-700 text-white
    py-6 px-5 rounded-xl items-center flex space-x-1
    transition duration-300 ease-in-out"
          >
            <StarsIcon className="w-5 h-5" />
            <p>Apply For Program</p>
          </Button>
        </Link>
      </div>
      <div className="mx-auto mt-10 mb-8 w-full md:max-w-4xl lg:max-w-5xl">
        <WorldMapSimple highlightedCountries={highlightedCountries} />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 md:flex-row md:items-start md:gap-8 lg:gap-12">
        <div className="w-full md:flex-1">
          <DeadlineCountdown
            aboutDeadline="Priority Application Deadline"
            targetDateString="May 20, 2026 at 11:59 PM (UTC-5)"
            targetDate={new Date(Date.UTC(2026, 4, 21, 4, 59, 0))}
            deadlineDescription="Applications submitted by this date will be given priority review."
            deadlinePassedHeader="Priority Application Deadline Passed"
            deadlinePassedBrief="The priority deadline for submitting applications was May 20th at 11:59
            PM. Please contact the program coordinator for any inquiries."
          />
        </div>
        <div className="w-full md:flex-1">
          <DeadlineCountdown
            aboutDeadline="Final Application Deadline"
            targetDateString="May 31, 2026 at 11:59 PM (UTC-5)"
            targetDate={new Date(Date.UTC(2026, 5, 1, 4, 59, 0))}
            deadlineDescription="Applications submitted by this date will be considered for review."
            deadlinePassedHeader="Final Application Deadline Passed"
            deadlinePassedBrief="The final deadline for submitting applications was May 31st at 11:59
            PM. Please contact the program coordinator for any inquiries."
          />
        </div>
      </div>
    </section>
  )
}

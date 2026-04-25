import { StaggerText } from "@/components/ui/stagger-text"
import { FC } from "react"

export const WorkWithExpertsSection: FC = () => (
  <section className="text-black relative px-5 md:px-14 bg-white py-20">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 ">
      <StaggerText
        className="font-serif"
        text="Learn From World-Class Researchers"
      />
    </h2>
    <p className="sm:text-xl md:text-2xl mb-6">
      Work one-on-one with carefully selected PhD researchers and graduate
      mentors from leading universities who help you turn strong ideas into
      real research, sharp analysis, and confident academic writing.
    </p>
    <img
      src="universities.png"
      alt="Universities"
      className="w-full max-w-5xl mx-auto mt-8"
    />
  </section>
)

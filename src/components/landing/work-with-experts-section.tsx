import { StaggerText } from "@/components/ui/stagger-text"
import { FC } from "react"

export const WorkWithExpertsSection: FC = () => (
  <section className="text-black relative px-5 md:px-14 bg-white py-20">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 ">
      <StaggerText
        className="font-serif"
        text="Work With International Experts"
      />
    </h2>
    <p className="sm:text-xl md:text-2xl mb-6">
      Our mentors are PhD holders and current graduate students from prestigious
      universities. Each mentor is carefully selected to ensure they can provide
      high-quality guidance and mentorship. Our mentors work closely with
      students, helping them navigate the complexities of academic research,
      data analysis, and scientific writing.
    </p>
    <img
      src="universities.png"
      alt="Universities"
      className="w-full max-w-5xl mx-auto mt-8"
    />
  </section>
)

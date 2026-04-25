import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"

export const InfoTabSection = ({
  onStart,
  isLoading = false,
}: {
  onStart: () => void
  isLoading?: boolean
}) => (
  <TabsContent value="info" className="space-y-6">
    <div className="space-y-2">
      <div>
        <div className="space-y-6">
          <div>
            <h2 className="mb-6 mt-6 text-2xl font-semibold sm:text-3xl">
              Program Overview:
            </h2>
            <p>
              This bootcamp is designed for motivated high school students who
              want to strengthen their understanding of academic research,
              academic writing, and the foundations of scholarly work. Over the
              course of one month, students will explore how research is
              structured, how academic arguments are developed, and how
              evidence is used in academic contexts.
            </p>
          </div>

          <div>
            <p>
              The program includes a series of workshops focused on essential
              academic skills, such as idea generation and refinement,
              introduction to research methodologies, source evaluation,
              principles of academic integrity, argument development, and
              academic writing techniques. The course also includes guidance on
              structuring written work, critically analyzing information, and
              presenting ideas in a clear and coherent academic format.
            </p>
          </div>

          <div>
            <p>
              In addition, participants will receive guidance from mentors who
              will support their learning process, provide feedback, and help
              strengthen their analytical and writing abilities.
            </p>
          </div>

          <div>
            <p>
              The primary goal of the program is to equip students with a
              strong foundation in academic thinking and research practices,
              preparing them for future academic projects, competitions, and
              university-level studies.
            </p>
          </div>

          <div className="pt-6">
            <h2 className="font-bold text-xl mb-2">Program details:</h2>
            <p>
              <b>Language</b>: English.
            </p>
            <p>
              <b>Format</b>: Online (Zoom).
            </p>
            <p>
              <b>Price</b>: $400.
            </p>
            <p>
              <b>Early registration fee</b>: $370 for students who complete
              payment before May 20th.
            </p>
            <p>
              <i>
                Limited discounts may also be available for the most
                competitive students in the bootcamp.
              </i>
            </p>
          </div>

          <div>
            <p>
              <b>Priority Application Deadline</b>: May 20th at 11:59 PM
              (UTC-5).
            </p>
            <p>
              <b>Final Application Deadline</b>: May 31st at 11:59 PM (UTC-5).
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-20 flex justify-end">
      <Button
        type="button"
        onClick={onStart}
        className="w-full bg-neutral-900 hover:bg-neutral-800 sm:w-auto"
        disabled={isLoading}
      >
        Start Application
      </Button>
    </div>
  </TabsContent>
)

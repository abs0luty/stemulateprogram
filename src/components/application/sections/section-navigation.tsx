import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { NavigationProps } from "./section-types"

const PreviousButton = ({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) => (
  <Button
    type="button"
    variant="outline"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-normal text-center sm:whitespace-nowrap"
    onClick={onClick}
  >
    <ArrowLeft className="h-4 w-4 shrink-0" />
    <span>{label}</span>
  </Button>
)

const NextButton = ({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) => (
  <Button
    type="button"
    className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 inline-flex items-center justify-center gap-2 whitespace-normal text-center sm:whitespace-nowrap"
    onClick={onClick}
  >
    <span>{label}</span>
    <ArrowRight className="h-4 w-4 shrink-0" />
  </Button>
)

export const SectionNavigation = ({
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
}: NavigationProps) => (
  <div className="mt-20 flex flex-col sm:flex-row gap-2 justify-between">
    <div>
      {previousLabel && onPrevious ? (
        <PreviousButton label={previousLabel} onClick={onPrevious} />
      ) : null}
    </div>
    <div>
      {nextLabel && onNext ? (
        <NextButton label={nextLabel} onClick={onNext} />
      ) : null}
    </div>
  </div>
)

import { ArrowLeft, ArrowRight } from "lucide-react"
import { NavigationProps } from "./section-types"

const PreviousButton = ({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
}) => (
  <button
    type="button"
    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 underline-offset-4 transition hover:text-neutral-950 hover:underline disabled:pointer-events-none disabled:opacity-40"
    onClick={onClick}
    disabled={disabled}
  >
    <ArrowLeft className="h-4 w-4 shrink-0" />
    <span>{label}</span>
  </button>
)

const NextButton = ({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
}) => (
  <button
    type="button"
    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 underline-offset-4 transition hover:text-neutral-950 hover:underline disabled:pointer-events-none disabled:opacity-40"
    onClick={onClick}
    disabled={disabled}
  >
    <span>{label}</span>
    <ArrowRight className="h-4 w-4 shrink-0" />
  </button>
)

export const SectionNavigation = ({
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  disabled,
}: NavigationProps & { disabled?: boolean }) => (
  <div className="mt-20 flex flex-col gap-3 sm:flex-row sm:justify-between">
    <div>
      {previousLabel && onPrevious ? (
        <PreviousButton
          label={previousLabel}
          onClick={onPrevious}
          disabled={disabled}
        />
      ) : null}
    </div>
    <div>
      {nextLabel && onNext ? (
        <NextButton label={nextLabel} onClick={onNext} disabled={disabled} />
      ) : null}
    </div>
  </div>
)

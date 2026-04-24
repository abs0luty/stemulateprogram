import { cn } from "@/components/lib/utils"

type LoadingStage = "session" | "application"
type LoadingVariant = "inline" | "modal"

const stageLabel: Record<LoadingStage, string> = {
  session: "Checking your session",
  application: "Checking your application",
}

const stageDescription: Record<LoadingStage, string> = {
  session: "We are restoring your access and preparing the form.",
  application: "We are loading your application status and saved progress.",
}

export const ApplicationLoadingState = ({
  stage,
  variant = "inline",
}: {
  stage: LoadingStage
  variant?: LoadingVariant
}) => {
  const isModal = variant === "modal"

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        isModal ? "w-full" : "min-h-[180px] px-6 py-10"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center text-center",
          isModal ? "w-full max-w-md px-8 py-8" : "gap-4"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2",
            isModal && "mb-5"
          )}
        >
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={cn(
                "rounded-full bg-neutral-900/80",
                isModal ? "h-3 w-3" : "h-2.5 w-2.5",
                index === 0 && "animate-[pulse_0.9s_ease-in-out_infinite]",
                index === 1 && "animate-[pulse_0.9s_ease-in-out_0.15s_infinite]",
                index === 2 && "animate-[pulse_0.9s_ease-in-out_0.3s_infinite]"
              )}
            />
          ))}
        </div>

        <div className={cn("space-y-2", !isModal && "text-center")}>
          <p
            className={cn(
              isModal
                ? "text-xl font-semibold tracking-tight text-neutral-950"
                : "text-sm text-slate-500"
            )}
          >
            {stageLabel[stage]}
          </p>
          {isModal ? (
            <p className="text-sm leading-6 text-neutral-500">
              {stageDescription[stage]}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

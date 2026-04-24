import { FC, useEffect, useState } from "react"
import { Clock, CheckCircle } from "lucide-react"

interface TimeUnitProps {
  // The numeric value for the time unit
  value: number
}

const TimeUnit: FC<TimeUnitProps> = (props: TimeUnitProps) => {
  return (
    <div className="relative flex min-w-[3.3rem] items-center justify-center rounded-lg border border-white/10 bg-black/40 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_rgba(255,255,255,0.04)] backdrop-blur-sm sm:min-w-[3.8rem] sm:px-4 sm:py-3">
      <div className="pointer-events-none absolute inset-[3px] rounded-md border border-white/5" />
      <span className="invisible text-2xl font-bold tracking-[0.12em] sm:text-3xl">
        88
      </span>
      <span className="absolute inset-0 flex items-center justify-center pl-[0.12em] text-center font-bold tracking-[0.12em] text-[#f5f7fb] drop-shadow-[0_0_10px_rgba(255,255,255,0.18)] sm:text-3xl text-2xl">
        {props.value < 10 ? `0${props.value}` : props.value}
      </span>
    </div>
  )
}

const TimeLabel: FC<{ label: string }> = ({ label }) => {
  return (
    <span
      className={`mt-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/65 sm:text-xs ${
        label === "Days"
          ? "translate-x-[5px]"
          : label === "Seconds"
            ? "-translate-x-[5px]"
            : ""
      }`}
    >
      {label}
    </span>
  )
}

const TimeSeparator: FC = () => {
  return (
    <div className="flex h-[3.1rem] items-center justify-center px-1 text-xl leading-none text-white/70 sm:h-[3.5rem] sm:px-1.5 sm:text-2xl">
      <span className="relative -mt-[0.08em] font-bold leading-none text-[#f5f7fb]">
        :
      </span>
    </div>
  )
}

const timeUnits = (timeLeft: TimeLeft) => [
  { value: timeLeft.days, label: "Days" },
  { value: timeLeft.hours, label: "Hours" },
  { value: timeLeft.minutes, label: "Minutes" },
  { value: timeLeft.seconds, label: "Seconds" },
]

const TimeCountdown: FC<{ timeLeft: TimeLeft }> = ({ timeLeft }) => {
  const units = timeUnits(timeLeft)

  return (
    <div className="mb-6 flex flex-col items-center">
      <div className="rounded-2xl bg-black/20 px-3 py-2 sm:px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {units.map((unit, index) => (
            <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
              <TimeUnit value={unit.value} />
              {index < units.length - 1 ? <TimeSeparator /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex items-start justify-center gap-5 sm:gap-10">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex w-[4.5rem] flex-col items-center sm:w-[5.75rem]"
          >
            <TimeLabel label={unit.label} />
          </div>
        ))}
      </div>
    </div>
  )
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

interface DeadlineCountdownProps {
  targetDate: Date
  targetDateString: string
  aboutDeadline: string
  deadlinePassedHeader: string
  deadlinePassedBrief: string
  deadlineDescription: string
}

export const DeadlineCountdown: FC<DeadlineCountdownProps> = (
  props: DeadlineCountdownProps
) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(props.targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center pb-4">
      <div className="w-full max-w-3xl">
        {timeLeft.days == 0 && timeLeft.hours == 0 && timeLeft.minutes == 0 ? (
          <div className="flex flex-col items-center space-y-4 p-6 text-center">
            <CheckCircle className="h-9 w-9 text-red-600 mb-2" />
            <h3 className="md:text-2xl text-xl font-bold text-red-600 font-serif">
              {props.deadlinePassedHeader}
            </h3>
            <p className="text-gray-200 text-sm">{props.deadlinePassedBrief}</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-white font-serif">
              {props.aboutDeadline}
            </h3>
            <TimeCountdown timeLeft={timeLeft} />
            <div className="px-6 pt-4">
              <div className="mx-auto flex max-w-xl items-start gap-4 text-left">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-gray-300" />
                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {props.targetDateString}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/72">
                    {props.deadlineDescription}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

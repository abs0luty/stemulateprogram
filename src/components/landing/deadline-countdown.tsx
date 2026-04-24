import { FC, useEffect, useState } from "react"
import { Clock, CheckCircle } from "lucide-react"

interface TimeUnitProps {
  // The numeric value for the time unit
  value: number
}

const TimeUnit: FC<TimeUnitProps> = (props: TimeUnitProps) => {
  return (
    <div className="relative flex min-w-[2.85rem] items-center justify-center rounded-lg border border-white/10 bg-black/40 px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_20px_rgba(255,255,255,0.04)] backdrop-blur-sm sm:min-w-[3.3rem] sm:px-3 sm:py-2.5 lg:min-w-[3.8rem] lg:px-4 lg:py-3">
      <div className="pointer-events-none absolute inset-[3px] rounded-md border border-white/5" />
      <span className="invisible text-xl font-bold tracking-[0.08em] sm:text-2xl lg:text-3xl">
        88
      </span>
      <span className="absolute inset-0 flex items-center justify-center pl-[0.08em] text-center text-xl font-bold tracking-[0.08em] text-[#f5f7fb] drop-shadow-[0_0_10px_rgba(255,255,255,0.18)] sm:text-2xl lg:text-3xl">
        {props.value < 10 ? `0${props.value}` : props.value}
      </span>
    </div>
  )
}

const TimeLabel: FC<{ label: string }> = ({ label }) => {
  return (
    <span
      className={`mt-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 sm:text-[11px] lg:text-xs ${
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
    <div className="flex h-[2.9rem] items-center justify-center px-0.5 text-lg leading-none text-white/70 sm:h-[3.1rem] sm:px-1 sm:text-xl lg:h-[3.5rem] lg:px-1.5 lg:text-2xl">
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
      <div className="rounded-2xl bg-black/20 px-2 py-2 sm:px-3 lg:px-4">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-4">
          {units.map((unit, index) => (
            <div key={unit.label} className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
              <TimeUnit value={unit.value} />
              {index < units.length - 1 ? <TimeSeparator /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex items-start justify-center gap-3 sm:gap-5 lg:gap-10">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex w-[3.5rem] flex-col items-center sm:w-[4.5rem] lg:w-[5.75rem]"
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
            <h3 className="text-lg font-bold text-red-600 font-serif sm:text-xl md:text-2xl">
              {props.deadlinePassedHeader}
            </h3>
            <p className="text-gray-200 text-sm">{props.deadlinePassedBrief}</p>
          </div>
        ) : (
          <>
            <h3 className="mb-6 text-lg font-bold text-center text-white font-serif sm:text-xl md:text-2xl">
              {props.aboutDeadline}
            </h3>
            <TimeCountdown timeLeft={timeLeft} />
            <div className="px-4 pt-4 sm:px-6">
              <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center md:flex-row md:items-start md:gap-4 md:text-left">
                <Clock className="h-5 w-5 flex-shrink-0 text-gray-300 md:mt-1" />
                <div className="max-w-md">
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

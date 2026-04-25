import { useEffect, useRef, useState } from "react"
import { cn } from "@/components/lib/utils"

interface SiteLoaderProps {
  active?: boolean
  className?: string
  compact?: boolean
  onComplete?: () => void
  theme?: "light" | "dark"
}

interface SiteLoaderOverlayProps {
  active: boolean
  className?: string
  minVisibleMs?: number
  theme?: "light" | "dark"
}

export const SiteLoader = ({
  active = true,
  className,
  compact = false,
  onComplete,
  theme = "dark",
}: SiteLoaderProps) => {
  const [progress, setProgress] = useState(1)
  const startedAtRef = useRef(Date.now())
  const completionSentRef = useRef(false)
  const previousActiveRef = useRef(active)

  useEffect(() => {
    if (active && !previousActiveRef.current) {
      startedAtRef.current = Date.now()
      completionSentRef.current = false
      setProgress(1)
    }

    previousActiveRef.current = active
  }, [active])

  useEffect(() => {
    if (!active) {
      const finishTimer = window.setInterval(() => {
        setProgress((current) => {
          if (current >= 100) {
            window.clearInterval(finishTimer)
            return 100
          }

          const nextValue =
            current < 99
              ? Math.min(99, current + Math.max(4, (99 - current) * 0.28))
              : 100

          if (nextValue >= 100 && !completionSentRef.current) {
            completionSentRef.current = true
            onComplete?.()
            window.clearInterval(finishTimer)
          }

          return nextValue
        })
      }, 24)

      return () => {
        window.clearInterval(finishTimer)
      }
    }

    if (progress === 1) {
      startedAtRef.current = Date.now()
    }

    completionSentRef.current = false

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current
      const nextValue = 18 + 81 * (1 - Math.exp(-elapsed / 620))

      setProgress((current) => Math.max(current, Math.min(99, nextValue)))
    }, 72)

    return () => {
      window.clearInterval(timer)
    }
  }, [active, progress, onComplete])

  return (
    <div
      className={cn(
        "loading-shell",
        compact && "w-[min(320px,calc(100vw-64px))]",
        className
      )}
    >
      <div
        className={cn(
          "loading-progress-counter",
          theme === "light" && "loading-progress-counter-light"
        )}
        aria-live="polite"
      >
        {Math.round(progress)}%
      </div>
    </div>
  )
}

export const SiteLoaderOverlay = ({
  active,
  className,
  minVisibleMs = 500,
  theme = "dark",
}: SiteLoaderOverlayProps) => {
  const [isMounted, setIsMounted] = useState(active)
  const [isVisible, setIsVisible] = useState(active)
  const [minDelayPassed, setMinDelayPassed] = useState(!active)
  const [loaderCompleted, setLoaderCompleted] = useState(!active)
  const activatedAtRef = useRef<number | null>(active ? Date.now() : null)
  const hideTimerRef = useRef<number | null>(null)
  const unmountTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
    if (unmountTimerRef.current) {
      window.clearTimeout(unmountTimerRef.current)
      unmountTimerRef.current = null
    }

    if (active) {
      activatedAtRef.current = Date.now()
      setMinDelayPassed(false)
      setLoaderCompleted(false)
      setIsMounted(true)
      setIsVisible(true)
      return
    }

    if (!isMounted) {
      return
    }

    const elapsed = activatedAtRef.current
      ? Date.now() - activatedAtRef.current
      : minVisibleMs
    const remaining = Math.max(0, minVisibleMs - elapsed)

    hideTimerRef.current = window.setTimeout(() => {
      setMinDelayPassed(true)
    }, remaining)

    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current)
      }
      if (unmountTimerRef.current) {
        window.clearTimeout(unmountTimerRef.current)
      }
    }
  }, [active, isMounted, minVisibleMs])

  useEffect(() => {
    if (active || !isMounted || !minDelayPassed || !loaderCompleted) {
      return
    }

    setIsVisible(false)
    unmountTimerRef.current = window.setTimeout(() => {
      setIsMounted(false)
    }, 740)
  }, [active, isMounted, loaderCompleted, minDelayPassed])

  if (!isMounted) {
    return null
  }

  return (
    <div
      aria-hidden={!active}
      className={cn(
        "site-loader-overlay",
        theme === "light" ? "site-loader-overlay-light" : "site-loader-overlay-dark",
        isVisible ? "opacity-100" : "site-loader-overlay-exit pointer-events-none",
        className
      )}
    >
      <div
        className={cn(
          "loading-shell-transition",
          !isVisible && "loading-shell-transition-exit"
        )}
      >
        <SiteLoader
          active={active}
          onComplete={() => setLoaderCompleted(true)}
          theme={theme}
        />
      </div>
    </div>
  )
}

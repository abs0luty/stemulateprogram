import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { SiteLoaderOverlay } from "./site-loader"
import { ROUTE_TRANSITION_START_EVENT } from "./transition-link"

export const RouteTransition = () => {
  const location = useLocation()
  const previousPathRef = useRef<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const failSafeTimerRef = useRef<number | null>(null)
  const finishTimerRef = useRef<number | null>(null)
  const isPortalRoute = location.pathname === "/apply"

  const clearTimers = () => {
    if (failSafeTimerRef.current) {
      window.clearTimeout(failSafeTimerRef.current)
      failSafeTimerRef.current = null
    }

    if (finishTimerRef.current) {
      window.clearTimeout(finishTimerRef.current)
      finishTimerRef.current = null
    }
  }

  const startTransition = () => {
    clearTimers()
    setIsTransitioning(true)

    // Failsafe: never let the route overlay hang forever
    failSafeTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false)
      failSafeTimerRef.current = null
    }, 1600)
  }

  useEffect(() => {
    const handleTransitionStart = () => {
      startTransition()
    }

    const handlePopState = () => {
      startTransition()
    }

    window.addEventListener(ROUTE_TRANSITION_START_EVENT, handleTransitionStart)
    window.addEventListener("popstate", handlePopState)

    return () => {
      clearTimers()
      window.removeEventListener(
        ROUTE_TRANSITION_START_EVENT,
        handleTransitionStart
      )
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  useEffect(() => {
    const nextPath = `${location.pathname}${location.search}`

    if (previousPathRef.current === null) {
      previousPathRef.current = nextPath
      return
    }

    if (previousPathRef.current === nextPath) {
      return
    }

    previousPathRef.current = nextPath
    clearTimers()
    finishTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false)
      finishTimerRef.current = null
    }, 80)
  }, [location.pathname, location.search])

  return (
    <SiteLoaderOverlay
      active={isTransitioning}
      theme={isPortalRoute ? "light" : "dark"}
    />
  )
}

import { MouseEvent, PointerEvent } from "react"
import { Link, LinkProps, To, createPath } from "react-router-dom"

export const ROUTE_TRANSITION_START_EVENT = "app:route-transition-start"

const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

const getTargetPath = (to: To) => {
  const rawPath = typeof to === "string" ? to : createPath(to)
  const resolvedUrl = new URL(rawPath, window.location.href)

  return `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`
}

export const startRouteTransition = (to?: string) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_TRANSITION_START_EVENT, {
      detail: { to },
    })
  )
}

export const TransitionLink = ({
  onClick,
  onPointerDown,
  target,
  to,
  reloadDocument,
  ...props
}: LinkProps) => {
  const maybeStartTransition = () => {
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
    const nextPath = getTargetPath(to)
    const currentBasePath = `${window.location.pathname}${window.location.search}`

    if (nextPath === currentPath || nextPath.startsWith(`${currentBasePath}#`)) {
      return
    }

    startRouteTransition(nextPath)
  }

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerDown?.(event)

    if (
      event.defaultPrevented ||
      event.pointerType === "mouse" && event.button !== 0 ||
      target === "_blank"
    ) {
      return
    }

    maybeStartTransition()
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      reloadDocument ||
      target === "_blank" ||
      isModifiedEvent(event)
    ) {
      return
    }

    maybeStartTransition()
  }

  return (
    <Link
      {...props}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      reloadDocument={reloadDocument}
      target={target}
      to={to}
    />
  )
}

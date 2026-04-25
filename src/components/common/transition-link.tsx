import { MouseEvent, PointerEvent } from "react"
import { Link, LinkProps, To, createPath } from "react-router-dom"

export const ROUTE_TRANSITION_START_EVENT = "app:route-transition-start"

const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

const getTargetPath = (to: To) =>
  typeof to === "string" ? to : createPath(to)

export const startRouteTransition = () => {
  window.dispatchEvent(new Event(ROUTE_TRANSITION_START_EVENT))
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

    startRouteTransition()
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

import { FC } from "react"
import { TransitionLink } from "@/components/common/transition-link"

export const NotFoundPage: FC = () => (
  <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
    <div className="w-full space-y-6 text-center">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">
          404
        </h1>
        <p className="text-gray-500">
          It looks like you've dared to dive into an unknown digital reality.
        </p>
      </div>
      <TransitionLink
        to="/"
        className="inline-flex h-10 items-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      >
        Return to the home page
      </TransitionLink>
    </div>
  </div>
)

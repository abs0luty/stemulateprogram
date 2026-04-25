import { ApplicationForm } from "@/components/application/application-form"
import { ArrowRight } from "lucide-react"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"

const ApplicationFormPageContent: FC = () => {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-white px-3 pb-8 pt-6 md:px-4 md:py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-11 items-center pl-1 sm:pl-0">
            <img
              src="/logo2.svg"
              alt="STEMulate logo"
              className="h-6 w-auto sm:h-6 md:h-7"
            />
          </div>
          <Link
            to="/"
            onClick={(event) => {
              if (window.history.length > 1) {
                event.preventDefault()
                navigate(-1)
              }
            }}
            className="inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-base font-medium text-neutral-950 transition hover:border-current hover:text-neutral-950"
          >
            Return
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
        </div>
        <div className="space-y-8">
          <ApplicationForm />
        </div>
      </div>
    </main>
  )
}

export const ApplicationFormPage: FC = () => <ApplicationFormPageContent />

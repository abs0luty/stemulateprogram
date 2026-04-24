import { ApplicationForm } from "@/components/application/application-form"
import { StandartLayout } from "@/layout/standard-layout"
import { FC } from "react"

const ApplicationFormPageContent: FC = () => {
  return (
    <>
      <main className="min-h-screen bg-white px-3 py-8 md:px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <ApplicationForm />
        </div>
      </main>
    </>
  )
}

export const ApplicationFormPage: FC = () => (
  <StandartLayout>
    <ApplicationFormPageContent />
  </StandartLayout>
)

import { UseFormReturn } from "react-hook-form"
import { ApplicationFormValues } from "../application-form-config"

export type SectionProps = {
  form: UseFormReturn<ApplicationFormValues>
}

export type NavigationProps = {
  nextLabel?: string
  previousLabel?: string
  onNext?: () => void
  onPrevious?: () => void
}

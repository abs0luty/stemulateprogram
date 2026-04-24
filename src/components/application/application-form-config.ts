import { z } from "zod"

export const fieldsOfInterest = [
  "Biology",
  "Business",
  "Chemistry",
  "Computer Science",
  "Ecology",
  "Economics",
  "Education",
  "Engineering",
  "Gender Studies",
  "History",
  "Mathematics",
  "Media Studies",
  "Neuroscience",
  "Physics",
  "Political Science",
  "Psychology",
  "Sociology",
] as const

export const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  city: z.string().min(2, { message: "City is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  ieltsScore: z.string(),
  satScore: z.string(),
  schoolName: z.string().min(2, { message: "School name is required" }),
  grade: z.string().min(1, { message: "Grade is required" }),
  gpa: z.string().min(1, { message: "GPA is required" }),
  parentFirstName: z
    .string()
    .min(1, { message: "Parent's first name is required" }),
  parentLastName: z
    .string()
    .min(1, { message: "Parent's last name is required" }),
  parentEmail: z.string().email({ message: "Valid parent email is required" }),
  parentPhone: z
    .string()
    .min(10, { message: "Valid parent phone number is required" }),
  fieldsOfInterest: z
    .array(z.string())
    .min(1, { message: "Select at least one field of interest" })
    .max(3, { message: "You can select up to 3 fields of interest" }),
  researchInterest: z
    .string()
    .min(50, { message: "Should be at least 50 characters" })
    .max(150, { message: "Should not exceed 150 characters" }),
  promoCode: z.string().optional(),
})

export type ApplicationFormValues = z.infer<typeof formSchema>

export const RESEARCH_MAX_CHARS = 150

export const tabOrder = [
  "info",
  "personal",
  "academic",
  "parent",
  "research",
  "additional",
] as const

export type ApplicationTab = (typeof tabOrder)[number]

export const tabLabels: Record<ApplicationTab, string> = {
  info: "Information",
  personal: "Personal",
  academic: "Academic",
  parent: "Parent",
  research: "Research",
  additional: "Additional",
}

export const defaultFormValues: ApplicationFormValues = {
  firstName: "",
  lastName: "",
  city: "",
  country: "",
  phone: "",
  ieltsScore: "",
  satScore: "",
  schoolName: "",
  grade: "",
  gpa: "",
  parentFirstName: "",
  parentLastName: "",
  parentEmail: "",
  parentPhone: "",
  fieldsOfInterest: [],
  researchInterest: "",
  promoCode: "",
}

export const getNextTab = (
  activeTab: ApplicationTab
): ApplicationTab | undefined => {
  const currentIndex = tabOrder.indexOf(activeTab)

  if (currentIndex === -1 || currentIndex === tabOrder.length - 1) {
    return undefined
  }

  return tabOrder[currentIndex + 1]
}

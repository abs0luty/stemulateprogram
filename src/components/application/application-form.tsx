import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@/components/ui/tabs"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  LogOutIcon,
  UserIcon,
  AlertCircle,
  OctagonAlert,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { AuthSection } from "./auth/auth-section"
import { Spinner } from "./spinner"
import { supabaseClient } from "@/supabase"
import confetti from "canvas-confetti"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  ApplicationFormValues,
  ApplicationTab,
  defaultFormValues,
  formSchema,
  getNextTab,
  tabLabels,
  tabOrder,
} from "./application-form-config"
import {
  AcademicTabSection,
  AdditionalTabSection,
  InfoTabSection,
  ParentTabSection,
  PersonalTabSection,
  ResearchTabSection,
} from "./sections"

export const ApplicationForm = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [applicationExists, setApplicationExists] = useState(false)
  const [activeTab, setActiveTab] = useState<ApplicationTab>("info")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [showValidationDialog, setShowValidationDialog] = useState(false)

  const tabsRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    localStorage.removeItem("supabase.auth.token")
    setUser(null)
  }

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user)
        setIsAuthChecked(true)

        if (data.session.user.id) {
          checkApplicationExistence(data.session.user.id)
        }
      }
    })

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setUser(session.user)
          if (session.user.id) {
            checkApplicationExistence(session.user.id)
          }
        } else {
          setUser(null)
        }

        setIsAuthChecked(true)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const checkApplicationExistence = async (userId: string) => {
    setLoading(true)

    try {
      const { data: applications, error } = await supabaseClient
        .from("applications")
        .select("id")
        .eq("createdBy", userId)

      if (error) {
        setLoading(false)
        return
      }

      setApplicationExists(applications && applications.length == 1)
      setLoading(false)
    } catch (err) {
      console.error("Unexpected error checking application existence:", err)
      setLoading(false)
    }
  }

  const scrollToTab = (index: number) => {
    if (!tabsRef.current) {
      return
    }

    const tabElements = tabsRef.current.querySelectorAll('[role="tab"]')

    if (!tabElements[index]) {
      return
    }

    const tabElement = tabElements[index] as HTMLElement

    if (index === 0) {
      tabsRef.current.scrollLeft = 0
      return
    }

    tabsRef.current.scrollLeft = Math.max(0, tabElement.offsetLeft - 20)
  }

  useEffect(() => {
    const tabIndex = tabOrder.indexOf(activeTab)

    if (tabIndex !== -1) {
      setTimeout(() => scrollToTab(tabIndex), 100)
    }
  }, [activeTab])

  useEffect(() => {
    if (tabsRef.current) {
      tabsRef.current.scrollLeft = 0
    }
  }, [])

  const savedFormData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("applicationFormData") || "null")
      : null

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: savedFormData || defaultFormValues,
    mode: "onBlur",
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      try {
        localStorage.setItem("applicationFormData", JSON.stringify(value))
      } catch (error) {
        console.error("Failed to save form data to localStorage:", error)
      }
    })

    return () => subscription.unsubscribe()
  }, [form])

  const errors = form.formState.errors

  const hasErrorsInTab = (tab: ApplicationTab): boolean => {
    switch (tab) {
      case "info":
        return false
      case "personal":
        return !!(
          errors.firstName ||
          errors.lastName ||
          errors.city ||
          errors.country ||
          errors.phone
        )
      case "academic":
        return !!(
          errors.ieltsScore ||
          errors.satScore ||
          errors.schoolName ||
          errors.grade ||
          errors.gpa
        )
      case "parent":
        return !!(
          errors.parentFirstName ||
          errors.parentLastName ||
          errors.parentEmail ||
          errors.parentPhone
        )
      case "research":
        return !!(errors.fieldsOfInterest || errors.researchInterest)
      case "additional":
        return false
      default:
        return false
    }
  }

  const onSubmit = async (values: ApplicationFormValues) => {
    setIsSubmitting(true)

    try {
      const { error: insertError } = await supabaseClient
        .from("applications")
        .insert([values])

      if (insertError) {
        toast({
          title: "Application Submission Failed",
          description:
            "Your research program application could not be submitted due to some technical issues.",
        })
        setIsSubmitting(false)
        return
      }

      confetti({
        particleCount: 150,
        spread: 60,
        origin: { y: 0.6 },
      })
      setApplicationExists(true)
    } catch (error: any) {
      console.error("Error inserting form data:", error)
      toast({
        title: "Submission Error",
        description: error.message,
      })
    }

    setIsSubmitting(false)
  }

  const handleSubmitAttempt = async () => {
    const isValid = await form.trigger()

    if (!isValid) {
      setShowValidationDialog(true)
      return
    }

    setShowConfirmationDialog(true)
  }

  const nextTab = (tab: ApplicationTab) => {
    const next = getNextTab(tab)

    if (next) {
      setActiveTab(next)
    }
  }

  if (!isAuthChecked) {
    return <Spinner />
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-3">
        <AuthSection />
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-end mt-12 space-x-2">
        <Button className="bg-neutral-900 hover:bg-neutral-800 border-b-0 rounded-b-none">
          <UserIcon />
          <p className="text-xs">
            {user.email.substring(0, 18)}
            {user.email.length > 17 && <>...</>}
          </p>
        </Button>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-b-0 text-xs rounded-b-none"
        >
          <LogOutIcon />
          Logout
        </Button>
      </div>

      <Card className="rounded-t-none">
        {loading ? (
          <Spinner />
        ) : applicationExists ? (
          <CardContent className="flex flex-col items-center justify-center h-[60vh] space-y-6">
            <h1 className="text-3xl font-semibold">Application Submitted</h1>
            <p className="text-center text-muted-foreground max-w-md">
              Thank you for submitting your application! If you have any
              questions or need to update your information, please contact us.
            </p>
          </CardContent>
        ) : (
          <CardContent className="pt-6 px-3 sm:px-6">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as ApplicationTab)}
            >
              <div className="relative mb-8">
                <TabsList
                  ref={tabsRef}
                  className="bg-white flex w-full overflow-x-auto snap-x scrollbar-none py-1 justify-start"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {tabOrder.map((tab, index) => {
                    const isErrorTab = hasErrorsInTab(tab)

                    return (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={`data-[state=active]:shadow-none text-sm whitespace-nowrap px-3 snap-start ${
                          activeTab === tab ? "active-tab" : ""
                        }`}
                        onClick={() => scrollToTab(index)}
                      >
                        {tabLabels[tab]}
                        {isErrorTab && (
                          <AlertCircle className="inline-block ml-1 text-red-500 h-4 w-4" />
                        )}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <InfoTabSection onStart={() => setActiveTab("personal")} />
                  <PersonalTabSection
                    form={form}
                    onNext={() => nextTab("personal")}
                  />
                  <AcademicTabSection
                    form={form}
                    onPrevious={() => setActiveTab("personal")}
                    onNext={() => nextTab("academic")}
                  />
                  <ParentTabSection
                    form={form}
                    onPrevious={() => setActiveTab("academic")}
                    onNext={() => nextTab("parent")}
                  />
                  <ResearchTabSection
                    form={form}
                    onPrevious={() => setActiveTab("parent")}
                    onNext={() => nextTab("research")}
                  />
                  <AdditionalTabSection
                    form={form}
                    onPrevious={() => setActiveTab("research")}
                    onSubmitAttempt={handleSubmitAttempt}
                    isSubmitting={isSubmitting}
                  />
                </form>
              </Form>
            </Tabs>
          </CardContent>
        )}
      </Card>

      <AlertDialog
        open={showValidationDialog}
        onOpenChange={setShowValidationDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <OctagonAlert className="h-7 w-7" />
            </div>
            <AlertDialogTitle className="text-3xl font-serif">
              Application Has Errors
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-sm text-muted-foreground">
            You cannot submit the application while there are validation
            errors. Please review the highlighted fields and fix them before
            submitting.
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-neutral-900 hover:bg-neutral-800"
              onClick={() => setShowValidationDialog(false)}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-serif">
              Are you sure?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-sm text-muted-foreground">
            Please make sure you reviewed all information carefully. You won't
            be able to edit the application after submission.
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-neutral-900 hover:bg-neutral-800"
              onClick={() => {
                form.handleSubmit(onSubmit)()
                setShowConfirmationDialog(false)
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

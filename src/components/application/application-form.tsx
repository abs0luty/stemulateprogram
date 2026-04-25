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
import { supabaseClient } from "@/supabase"
import confetti from "canvas-confetti"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import { SiteLoader, SiteLoaderOverlay } from "@/components/common/site-loader"

export const ApplicationForm = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [applicationExists, setApplicationExists] = useState(false)
  const [activeTab, setActiveTab] = useState<ApplicationTab>("info")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [showValidationDialog, setShowValidationDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [promoCodeStatus, setPromoCodeStatus] = useState<
    "idle" | "checking" | "valid" | "invalid" | "error"
  >("idle")
  const [isCheckingPromoCode, setIsCheckingPromoCode] = useState(false)

  const tabsRef = useRef<HTMLDivElement>(null)
  const currentUserIdRef = useRef<string | null>(null)
  const promoCodeCheckIdRef = useRef(0)
  const skipPromoCodeResetRef = useRef(false)

  const normalizePromoCode = (value?: string | null) =>
    value?.trim().toUpperCase() ?? ""

  const handleLogout = async () => {
    localStorage.removeItem("supabase.auth.token")
    setUser(null)
  }

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setIsAuthChecked(true)

      if (data?.session?.user) {
        setUser(data.session.user)
        currentUserIdRef.current = data.session.user.id

        if (data.session.user.id) {
          checkApplicationExistence(data.session.user.id)
        }

        return
      }

      setLoading(false)
    })

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setUser(session.user)
          setIsAuthChecked(true)

          if (
            session.user.id &&
            currentUserIdRef.current !== session.user.id
          ) {
            currentUserIdRef.current = session.user.id
            checkApplicationExistence(session.user.id)
          }
        } else {
          currentUserIdRef.current = null
          setUser(null)
          setApplicationExists(false)
          setLoading(false)
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

  useEffect(() => {
    const subscription = form.watch((_, { name }) => {
      if (name === "promoCode") {
        if (skipPromoCodeResetRef.current) {
          skipPromoCodeResetRef.current = false
          return
        }

        setPromoCodeStatus("idle")
        form.clearErrors("promoCode")
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

  const verifyPromoCode = async (
    rawPromoCode?: string,
    options?: { silent?: boolean }
  ) => {
    const normalizedPromoCode = normalizePromoCode(
      rawPromoCode ?? form.getValues("promoCode")
    )

    if (!normalizedPromoCode) {
      setPromoCodeStatus("idle")
      form.clearErrors("promoCode")
      return true
    }

    const checkId = promoCodeCheckIdRef.current + 1
    promoCodeCheckIdRef.current = checkId
    setIsCheckingPromoCode(true)
    setPromoCodeStatus("checking")

    try {
      const { data, error } = await supabaseClient.rpc("check_promo_code", {
        candidate: normalizedPromoCode,
      })

      if (checkId !== promoCodeCheckIdRef.current) {
        return false
      }

      if (error) {
        throw error
      }

      if (!data) {
        setPromoCodeStatus("invalid")
        form.setError("promoCode", {
          type: "manual",
          message: "Promo code is invalid or expired",
        })
        return false
      }

      form.clearErrors("promoCode")
      skipPromoCodeResetRef.current = true
      form.setValue("promoCode", normalizedPromoCode, {
        shouldDirty: true,
        shouldTouch: true,
      })
      setPromoCodeStatus("valid")
      return true
    } catch (error) {
      console.error("Error verifying promo code:", error)

      if (checkId !== promoCodeCheckIdRef.current) {
        return false
      }

      setPromoCodeStatus("error")

      if (!options?.silent) {
        toast({
          title: "Promo Code Check Failed",
          description:
            "We could not verify your promo code right now. Please try again.",
        })
      }

      return false
    } finally {
      if (checkId === promoCodeCheckIdRef.current) {
        setIsCheckingPromoCode(false)
      }
    }
  }

  const onSubmit = async (values: ApplicationFormValues) => {
    setIsSubmitting(true)

    try {
      const normalizedPromoCode = normalizePromoCode(values.promoCode)
      const isPromoCodeValid = await verifyPromoCode(normalizedPromoCode, {
        silent: true,
      })

      if (!isPromoCodeValid) {
        setActiveTab("additional")
        setIsSubmitting(false)
        return
      }

      const { error: insertError } = await supabaseClient
        .from("applications")
        .insert([
          {
            ...values,
            promoCode: normalizedPromoCode || null,
          },
        ])

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <SiteLoader compact theme="light" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-[60vh] w-full max-w-5xl flex-col justify-center space-y-3">
        <AuthSection />
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        className={loading ? "pointer-events-none select-none opacity-35" : ""}
      >
        {!applicationExists ? (
          <div className="mb-6 border-b border-neutral-200 pb-4 space-y-2">
            <h1 className="text-2xl font-semibold text-neutral-950">
              Application Portal
            </h1>
            <p className="text-sm text-neutral-600">
              For any questions please contact us at:{" "}
              <a
                href="mailto:admissions@stemulateprogram.com"
                className="font-medium text-neutral-900 underline underline-offset-4"
              >
                admissions@stemulateprogram.com
              </a>
            </p>
          </div>
        ) : null}
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
            onClick={() => setShowLogoutDialog(true)}
            className="border-b-0 text-xs rounded-b-none"
          >
            <LogOutIcon />
            Logout
          </Button>
        </div>

        <Card className="rounded-t-none">
          {applicationExists && !loading ? (
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
                value={loading ? "info" : activeTab}
                onValueChange={(value) =>
                  !loading && setActiveTab(value as ApplicationTab)
                }
              >
                <div className="relative mb-8">
                  <TabsList
                    ref={tabsRef}
                    className="flex w-full justify-start gap-2 overflow-x-auto overflow-y-hidden border-b border-neutral-200 bg-white snap-x scrollbar-none"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {tabOrder.map((tab, index) => {
                      const isErrorTab = hasErrorsInTab(tab)

                      return (
                        <TabsTrigger
                          key={tab}
                          value={tab}
                          disabled={loading}
                          className="snap-start whitespace-nowrap rounded-none border-b-[3px] border-transparent bg-white px-2 py-2.5 text-sm font-medium text-neutral-500 shadow-none outline-none transition hover:text-neutral-950 focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:border-red-600 data-[state=active]:font-semibold data-[state=active]:text-neutral-950 data-[state=active]:shadow-none"
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
                    <InfoTabSection
                      onStart={() => setActiveTab("personal")}
                      isLoading={loading}
                    />
                    {!loading ? (
                      <>
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
                          onVerifyPromoCode={() => verifyPromoCode()}
                          isCheckingPromoCode={isCheckingPromoCode}
                          promoCodeStatus={promoCodeStatus}
                        />
                      </>
                    ) : null}
                  </form>
                </Form>
              </Tabs>
            </CardContent>
          )}
        </Card>
      </div>

      <SiteLoaderOverlay active={loading} className="z-[70]" theme="light" />

      <AlertDialog
        open={showValidationDialog}
        onOpenChange={setShowValidationDialog}
      >
        <AlertDialogContent className="max-w-[34rem] gap-5 rounded-3xl border-neutral-200 p-8">
          <AlertDialogHeader className="space-y-4 text-left">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(254,243,199,0.95),_rgba(255,255,255,0)_68%)]" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-[24px] border border-neutral-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)]">
                <div className="relative h-11 w-11 rounded-full bg-gradient-to-b from-neutral-100 to-white">
                  <span className="absolute left-[11px] top-[15px] h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <span className="absolute right-[11px] top-[15px] h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <span className="absolute left-1/2 top-[24px] h-[7px] w-[18px] -translate-x-1/2 rounded-full border-b-2 border-neutral-700" />
                </div>
              </div>
              <div className="absolute -right-1 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-600 shadow-sm">
                <OctagonAlert className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
            </div>
            <AlertDialogTitle className="max-w-md text-3xl font-serif leading-tight text-neutral-950">
              We found mistakes in your applications
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="max-w-xl text-base leading-7 text-slate-600">
            You cannot submit the application while there are validation
            errors. Please review the highlighted fields and fix them before
            submitting.
          </AlertDialogDescription>
          <AlertDialogFooter className="justify-start">
            <AlertDialogAction
              className="min-w-24 rounded-2xl bg-neutral-900 px-5 hover:bg-neutral-800"
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

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="max-w-[34rem] gap-5 rounded-3xl border-neutral-200 p-8">
          <AlertDialogHeader className="space-y-4 text-left">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(254,243,199,0.95),_rgba(255,255,255,0)_68%)]" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-[24px] border border-neutral-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)]">
                <div className="relative h-11 w-11 rounded-full bg-gradient-to-b from-neutral-100 to-white">
                  <span className="absolute left-[11px] top-[15px] h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <span className="absolute right-[11px] top-[15px] h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <span className="absolute left-1/2 top-[24px] h-[7px] w-[18px] -translate-x-1/2 rounded-full border-b-2 border-neutral-700" />
                </div>
              </div>
              <div className="absolute -right-1 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-600 shadow-sm">
                <LogOutIcon className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
            </div>
            <AlertDialogTitle className="text-3xl font-serif">
              Log out?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="max-w-xl text-base leading-7 text-slate-600">
            You will be signed out of the application portal and returned to
            the login screen.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-neutral-900 hover:bg-neutral-800"
              onClick={() => {
                handleLogout()
                setShowLogoutDialog(false)
              }}
            >
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

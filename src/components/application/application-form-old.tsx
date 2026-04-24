import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Loader2,
  X,
  Plus,
  LogOutIcon,
  UserIcon,
  AlertCircle,
  EditIcon,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { AuthSection } from "./auth/auth-section"
import { Spinner } from "./spinner"
import { supabaseClient } from "@/supabase"
import confetti from "canvas-confetti"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PhoneInput } from "@/components/ui/phone-number-input"
import { CountryInput } from "@/components/ui/country-input"

const fieldsOfInterest = [
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
]

// Extracurricular item schema
const extracurricularItemSchema = z.object({
  position: z
    .string()
    .min(1, "Position/Leadership is required")
    .max(50, "Position/Leadership description must be at most 50 characters"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters"),
  description: z
    .string()
    .max(150, "Description must be at most 150 characters"),
})

// Main form schema
const formSchema = z.object({
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
  parentPhone: z
    .string()
    .min(10, { message: "Valid parent phone number is required" }),

  fieldsOfInterest: z
    .array(z.string())
    .min(1, { message: "Select at least one field of interest" })
    .max(3, { message: "You can select up to 3 fields of interest" }),

  // 2) ADD MAX CHARACTER VALIDATION & SHOW COUNTER
  researchInterest: z
    .string()
    .min(50, { message: "Should be at least 50 characters" })
    .max(500, { message: "Should not exceed 500 characters" }),

  motivation: z
    .string()
    .min(50, {
      message: "Motivation statement should be at least 50 characters",
    })
    .max(500, { message: "Should not exceed 500 characters" }),

  additionalInfo: z.string().optional(),
  financialAid: z.boolean().default(false),
  noFinancialAidMoney: z.string().optional(),

  // 3) EXTRACURRICULAR ACTIVITIES AS ARRAY OF OBJECTS
  extracurriculars: z
    .array(extracurricularItemSchema)
    .max(5, { message: "You can list up to 5 activities" })
    .optional(),
})

// -------------------------------------
// COMPONENT
// -------------------------------------
export const ApplicationForm = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [applicationExists, setApplicationExists] = useState(false)
  const [activeTab, setActiveTab] = useState("info")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const [activityErrors, setActivityErrors] = useState({
    position: "",
    name: "",
    description: "",
  })

  // For extracurricular items
  const [showAddActivityModal, setShowAddActivityModal] = useState(false)
  const [newActivity, setNewActivity] = useState({
    position: "",
    name: "",
    description: "",
  })
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

  const tabsRef = useRef<HTMLDivElement>(null)
  const tabLabels: Record<string, string> = {
    info: "Information",
    personal: "Personal",
    academic: "Academic",
    parent: "Parent",
    research: "Research",
    extracurricular: "Activities",
    additional: "Additional",
  }

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
    if (tabsRef.current) {
      const tabElements = tabsRef.current.querySelectorAll('[role="tab"]')
      if (tabElements[index]) {
        const tabElement = tabElements[index] as HTMLElement
        if (index === 0) {
          tabsRef.current.scrollLeft = 0
          return
        }
        const scrollLeft = Math.max(0, tabElement.offsetLeft - 20)
        tabsRef.current.scrollLeft = scrollLeft
      }
    }
  }

  // Auto-scroll to active tab when it changes
  useEffect(() => {
    const tabIndex = [
      "personal",
      "academic",
      "parent",
      "research",
      "extracurricular",
      "additional",
    ].indexOf(activeTab)
    if (tabIndex !== -1) {
      setTimeout(() => scrollToTab(tabIndex), 100)
    }
  }, [activeTab])

  // Ensure the first tab is visible on initial load
  useEffect(() => {
    if (tabsRef.current) {
      tabsRef.current.scrollLeft = 0
    }
  }, [])

  const savedFormData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("applicationFormData") || "null")
      : null

  // 4) SETUP REACT HOOK FORM
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: savedFormData || {
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
      parentFullName: "",
      parentPhone: "",
      fieldsOfInterest: [],
      researchInterest: "",
      motivation: "",
      additionalInfo: "",
      noFinancialAidMoney: "",
      financialAid: false,
      extracurriculars: [],
    },
    mode: "onBlur", // or "onChange", depending on your preference
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

  // 5) DETECT ERRORS FOR TABS & SHOW ICON
  const errors = form.formState.errors

  const hasErrorsInTab = (tab: string): boolean => {
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
          errors.parentPhone
        )
      case "research":
        return !!(errors.fieldsOfInterest || errors.researchInterest)
      case "extracurricular":
        return !!errors.extracurriculars
      case "additional":
        return !!errors.motivation
      default:
        return false
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.financialAid) {
      values.noFinancialAidMoney = undefined
    }

    const applicationObject: any = values
    applicationObject.extracurriculars = values.extracurriculars
      ?.map(
        (activity) =>
          `${activity.position} - ${activity.name}\n${activity.description}`
      )
      .join("\n\n")

    setIsSubmitting(true)
    try {
      const { error: insertError } = await supabaseClient
        .from("applications")
        .insert([applicationObject])

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

  const handleRemoveExtracurricular = (index: number) => {
    const currentActivities = form.getValues("extracurriculars") || []
    currentActivities.splice(index, 1)
    form.setValue("extracurriculars", currentActivities)
  }

  const handleSaveExtracurricular = () => {
    const errors = {
      position: newActivity.position.trim() ? "" : "Position is required",
      name: newActivity.name.trim() ? "" : "Name is required",
      description: newActivity.description.trim()
        ? ""
        : "Description is required",
    }

    setActivityErrors(errors)

    const hasErrors = Object.values(errors).some((err) => err !== "")
    if (hasErrors) {
      return
    }

    const currentActivities = form.getValues("extracurriculars") || []

    if (editIndex !== null) {
      // Editing existing
      const updatedActivities = [...currentActivities]
      updatedActivities[editIndex] = newActivity
      form.setValue("extracurriculars", updatedActivities)
    } else {
      // Adding new
      if (currentActivities.length >= 5) {
        toast({
          title: "Maximum Activities Reached",
          description: "You can only add up to 5 extracurricular activities.",
        })
        return
      }
      form.setValue("extracurriculars", [...currentActivities, newActivity])
    }

    // Clear modal state
    setNewActivity({ position: "", name: "", description: "" })
    setActivityErrors({ position: "", name: "", description: "" })
    setEditIndex(null)
    setShowAddActivityModal(false)
  }

  // 7) WORD/CHAR COUNTERS FOR TEXTAREAS
  // Using "character" counters here, but you can adapt to word-based if you prefer
  const researchInterestValue = form.watch("researchInterest") || ""
  const motivationValue = form.watch("motivation") || ""
  const researchChars = researchInterestValue.length
  const motivationChars = motivationValue.length
  const MAX_CHARS = 500 // from schema

  // Next tab function (unchanged logic, but calls trigger to validate)
  const nextTab = (tab: string) => {
    if (tab === "personal") {
      form
        .trigger(["firstName", "lastName", "city", "country", "phone"])
        .then((valid) => {
          if (valid) setActiveTab("academic")
        })
    } else if (tab === "academic") {
      form
        .trigger(["ieltsScore", "satScore", "schoolName", "grade", "gpa"])
        .then((valid) => {
          if (valid) setActiveTab("parent")
        })
    } else if (tab === "parent") {
      form
        .trigger(["parentFirstName", "parentLastName", "parentPhone"])
        .then((valid) => {
          if (valid) setActiveTab("research")
        })
    } else if (tab === "research") {
      form.trigger(["fieldsOfInterest", "researchInterest"]).then((valid) => {
        if (valid) setActiveTab("extracurricular")
      })
    } else if (tab === "extracurricular") {
      // extracurriculars is optional, but let's move on
      setActiveTab("additional")
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="relative mb-8">
                <TabsList
                  ref={tabsRef}
                  className="bg-white flex w-full overflow-x-auto snap-x scrollbar-none py-1 justify-start"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {[
                    "info",
                    "personal",
                    "academic",
                    "parent",
                    "research",
                    "extracurricular",
                    "additional",
                  ].map((tab, index) => {
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
                  <TabsContent value="info" className="space-y-6">
                    <div className="space-y-2">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-3xl font-semibold mb-6 mt-6">
                            Program Overview:
                          </h2>
                          <p>
                            During the program, you will learn the basics of
                            brainstorming and developing ideas, formulating
                            hypotheses, collecting and analyzing data, and
                            writing a research paper. This program is designed
                            for motivated high school students to develop their
                            research skills; however, anyone is welcome to
                            apply. Although a completed research paper is not
                            guaranteed as an outcome of the program it is likely
                            that students will be able to write a 15-page paper.
                          </p>
                        </div>

                        <div>
                          <p>
                            At the beginning of the program, students will have
                            group workshops on research basics and
                            methodologies, topic exploration and idea
                            brainstorming, ethical guidelines and plagiarism,
                            and topic selection and proposal writing. Parallel
                            to the group workshops, students will start
                            individual work with their mentors. The program will
                            conclude with a symposium on research papers, in
                            which students will present their work.
                          </p>
                        </div>

                        <div>
                          <p>
                            The mentors of the program have backgrounds in STEM
                            and social sciences. Students can conduct research
                            and write a paper under the guidance of an
                            experienced mentor in any of the following fields:
                          </p>
                          <div className="mt-4 flex space-x-8 md:space-x-16">
                            <ul className="mt-2 space-y-1">
                              <li>- Biology</li>
                              <li>- Business</li>
                              <li>- Chemistry</li>
                              <li>- Computer Science</li>
                              <li>- Ecology</li>
                              <li>- Economics</li>
                              <li>- Education</li>
                              <li>- Engineering</li>
                            </ul>
                            <ul className="mt-2 space-y-1">
                              <li>- Gender Studies</li>
                              <li>- History</li>
                              <li>- Mathematics</li>
                              <li>- Media Studies</li>
                              <li>- Neuroscience</li>
                              <li>- Physics</li>
                              <li>- Political Science</li>
                              <li>- Psychology</li>
                              <li>- Sociology</li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <p>
                            Note: You will conduct research in one field only.
                            By selecting up to 3 fields, you indicate the areas
                            you are interested in. This will help us match you
                            to your best-fit mentor.
                          </p>
                        </div>

                        <div>
                          <h2 className="font-bold text-xl mb-2">
                            Program details:
                          </h2>
                          <p>
                            <b>Language</b>: English.
                          </p>
                          <p>
                            <b>Format</b>: Online (Zoom).
                          </p>
                          <p>
                            <b>Price</b>: $1500.
                          </p>
                          <p>
                            <b>
                              Financial aid may be available to the most
                              competitive students in the program.
                            </b>
                          </p>
                        </div>

                        <div>
                          <p>
                            <b>Priority Application Deadline</b>: June 16th at
                            11:59 PM (UTC-5).
                          </p>
                          <p>
                            <b>Final Application Deadline</b>: June 23th at
                            11:59 PM (UTC-5).
                          </p>
                        </div>

                        <div>
                          <p>
                            For any questions please contact us at:
                            <br />
                            <i>admissions@stemulateprogram.com</i>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("personal")}
                      >
                        Start Application
                      </Button>
                    </div>
                  </TabsContent>
                  {/* -------------------- PERSONAL TAB -------------------- */}
                  <TabsContent value="personal" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold">
                        Personal Information
                      </h2>
                      <p className="text-muted-foreground">
                        Please provide your contact details.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Johnson" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <CountryInput {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <PhoneInput {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800"
                        onClick={() => nextTab("personal")}
                      >
                        Next: Academic Background
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- ACADEMIC TAB -------------------- */}
                  <TabsContent value="academic" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold">
                        Academic Background
                      </h2>
                      <p className="text-muted-foreground">
                        Please provide details about your education and test
                        scores.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Central High School"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="grade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Grade</FormLabel>
                            <FormControl>
                              <Input placeholder="12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gpa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GPA</FormLabel>
                            <FormControl>
                              <Input placeholder="3.8/4.0" {...field} />
                            </FormControl>
                            <FormDescription>
                              Please include the scale (e.g., 3.8/4.0)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="ieltsScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IELTS Score (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Do not include practice tests!"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="satScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SAT Score (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Do not include practice tests!"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("personal")}
                      >
                        Previous: Personal Information
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800"
                        onClick={() => nextTab("academic")}
                      >
                        Next: Parent Information
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- PARENT TAB -------------------- */}
                  <TabsContent value="parent" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold">
                        Parent Information
                      </h2>
                      <p className="text-muted-foreground">
                        Please provide your parent or guardian's contact
                        information.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="parentFirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="parentLastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Johnson" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="parentPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent/Guardian Phone Number</FormLabel>
                          <FormControl>
                            <PhoneInput {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("academic")}
                      >
                        Previous: Academic Background
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800"
                        onClick={() => nextTab("parent")}
                      >
                        Next: Research Interests
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- RESEARCH TAB -------------------- */}
                  <TabsContent value="research" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold">
                        Research Interests
                      </h2>
                      <p className="text-muted-foreground">
                        Please select up to 3 fields of interest and describe
                        your research interests.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="fieldsOfInterest"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              Fields of Interest (Choose up to 3)
                            </FormLabel>
                            <FormDescription>
                              Select up to three fields that you are most
                              interested in.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {fieldsOfInterest.map((field) => (
                              <FormField
                                key={field}
                                control={form.control}
                                name="fieldsOfInterest"
                                render={({ field: { onChange, value } }) => {
                                  const checked = value?.includes(field)
                                  return (
                                    <FormItem
                                      key={field}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={checked}
                                          onCheckedChange={(isChecked) => {
                                            const currentValues = [
                                              ...(value || []),
                                            ]
                                            if (
                                              isChecked &&
                                              currentValues.length < 3
                                            ) {
                                              onChange([
                                                ...currentValues,
                                                field,
                                              ])
                                            } else if (
                                              isChecked &&
                                              currentValues.length >= 3
                                            ) {
                                              toast({
                                                title:
                                                  "Maximum Selection Reached",
                                                description:
                                                  "You can only select up to 3 fields of interest.",
                                              })
                                            } else {
                                              onChange(
                                                currentValues.filter(
                                                  (val) => val !== field
                                                )
                                              )
                                            }
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {field}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="researchInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Research Interest</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your research interests and any specific topics you would like to explore..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          {/* SHOW CHARACTER COUNTER */}
                          <div className="text-xs text-muted-foreground mt-1">
                            {researchChars}/{MAX_CHARS} characters
                          </div>
                          <FormDescription>
                            Explain why you are interested in these fields and
                            what specific questions or problems you hope to
                            address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("parent")}
                      >
                        Previous: Parent Information
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800"
                        onClick={() => nextTab("research")}
                      >
                        Next: Extracurricular Activities
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- EXTRACURRICULAR TAB -------------------- */}
                  <TabsContent value="extracurricular" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold">
                        Extracurricular Activities
                      </h2>
                      <p className="text-muted-foreground">
                        Please list up to 5 extracurricular activities you
                        participate in.
                      </p>
                    </div>

                    {/* Button to open modal */}
                    <Button
                      type="button"
                      variant="default"
                      className="bg-neutral-900 hover:bg-neutral-800"
                      onClick={() => setShowAddActivityModal(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Activity
                    </Button>

                    {/* Show existing activities */}
                    <div className="space-y-4 mt-4">
                      <Label>Your Activities</Label>
                      {form.watch("extracurriculars")?.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-2">
                          No activities added yet. Add up to 5 activities.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {form
                            .watch("extracurriculars")
                            ?.map((activity, index) => (
                              <div
                                key={index}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-md gap-2"
                              >
                                <div className="text-sm space-y-1 w-full">
                                  <div className="flex justify-between items-center w-full">
                                    <p className="font-semibold truncate">
                                      {activity.position} – {activity.name}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <EditIcon
                                            className="w-4 h-4 cursor-pointer"
                                            onClick={() => {
                                              const currentActivities =
                                                form.getValues(
                                                  "extracurriculars"
                                                ) || []
                                              const activityToEdit =
                                                currentActivities[index]
                                              setNewActivity(activityToEdit)
                                              setEditIndex(index)
                                              setShowAddActivityModal(true)
                                            }}
                                          />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-neutral-900">
                                          Edit activity
                                        </TooltipContent>
                                      </Tooltip>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <X
                                            className="w-4 h-4 cursor-pointer"
                                            onClick={() =>
                                              handleRemoveExtracurricular(index)
                                            }
                                          />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-neutral-900">
                                          Remove activity
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                  </div>
                                  <p className="break-words">
                                    {activity.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("research")}
                      >
                        Previous: Research Interests
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800"
                        onClick={() => nextTab("extracurricular")}
                      >
                        Next: Additional Information
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- ADDITIONAL TAB -------------------- */}
                  <TabsContent value="additional" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-semibold">
                        Additional Information
                      </h2>
                      <p className="text-muted-foreground">
                        Please provide any additional information to support
                        your application.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivation Statement</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Explain your motivation for applying to this research program..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          {/* SHOW CHARACTER COUNTER */}
                          <div className="text-xs text-muted-foreground mt-1">
                            {motivationChars}/{MAX_CHARS} characters
                          </div>
                          <FormDescription>
                            Describe why you want to participate in this program
                            and what you hope to achieve.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Additional Information (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any other information you would like to share..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include any additional information that may be
                            relevant to your application.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="financialAid"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-2xl font-bold">
                            Financial Aid
                          </FormLabel>
                          <FormControl>
                            <>
                              <p>
                                <b>Program price</b>: $1500.
                              </p>
                              <div className="flex items-center space-x-2">
                                <br />
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="financial-aid"
                                />
                                <label
                                  htmlFor="financial-aid"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  I am applying for financial aid
                                </label>
                              </div>
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("financialAid") && (
                      <Alert>
                        <AlertDescription>
                          <p className="mb-4">
                            You have selected that you are applying for
                            financial aid. Additional documents and an interview
                            will be required as part of the financial aid
                            application process.
                          </p>
                          <FormField
                            control={form.control}
                            name="noFinancialAidMoney"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="">
                                  How much are you able to pay on your own
                                  (without aid)?
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="mt-2"
                                    placeholder="Amount, preferably in USD."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("extracurricular")}
                      >
                        Previous: Extracurricular Activities
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShowConfirmationDialog(true)}
                        className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        )}
      </Card>

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

      {/* ------------------------------------------------
          EXTRACURRICULAR ADD MODAL
          ------------------------------------------------ */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-4">
              Add Extracurricular Activity
            </h3>
            <div className="space-y-4">
              {/* Position */}
              <div>
                <Label htmlFor="position">
                  Position/Leadership (max 50 chars)
                </Label>
                <Input
                  id="position"
                  placeholder="Captain, President, Member, etc."
                  value={newActivity.position}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  maxLength={50}
                />
                {activityErrors.position && (
                  <p className="text-sm text-red-500 mt-1">
                    {activityErrors.position}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name">Name (max 100 chars)</Label>
                <Input
                  id="name"
                  placeholder="Debate Club, Volunteer Group, etc."
                  value={newActivity.name}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  maxLength={100}
                />
                {activityErrors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {activityErrors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description (max 150 chars)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your role, accomplishments, recognition..."
                  value={newActivity.description}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  maxLength={150}
                  className="resize-none"
                />
                {activityErrors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {activityErrors.description}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAddActivityModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-neutral-900 hover:bg-neutral-800"
                onClick={handleSaveExtracurricular}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { TabsContent } from "@/components/ui/tabs"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SectionNavigation } from "./section-navigation"
import { SectionProps } from "./section-types"

export const AcademicTabSection = ({
  form,
  onNext,
  onPrevious,
}: SectionProps & { onNext: () => void; onPrevious: () => void }) => (
  <TabsContent value="academic" className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold sm:text-3xl">
        Academic Background
      </h2>
      <p className="text-muted-foreground">
        Please provide details about your education and test scores.
      </p>
    </div>

    <FormField
      control={form.control}
      name="schoolName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>School Name</FormLabel>
          <FormControl>
            <Input placeholder="Central High School" {...field} />
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
              <Input
                placeholder="Please include the scale (e.g., 3.8/4.0)"
                {...field}
              />
            </FormControl>
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
              <Input placeholder="Do not include practice tests!" {...field} />
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
              <Input placeholder="Do not include practice tests!" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <SectionNavigation
      previousLabel="Personal Information"
      onPrevious={onPrevious}
      nextLabel="Parent Information"
      onNext={onNext}
    />
  </TabsContent>
)

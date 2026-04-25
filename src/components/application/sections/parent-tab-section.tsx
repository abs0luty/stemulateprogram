import { TabsContent } from "@/components/ui/tabs"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-number-input"
import { SectionNavigation } from "./section-navigation"
import { SectionProps } from "./section-types"

export const ParentTabSection = ({
  form,
  onNext,
  onPrevious,
}: SectionProps & { onNext: () => void; onPrevious: () => void }) => (
  <TabsContent value="parent" className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold sm:text-3xl">
        Parent Information
      </h2>
      <p className="text-muted-foreground">
        Please provide your parent or guardian&apos;s contact information.
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
      name="parentEmail"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Parent/Guardian Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="parent@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

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

    <div>
      <SectionNavigation
        previousLabel="Academic Background"
        onPrevious={onPrevious}
        nextLabel="Research Interests"
        onNext={onNext}
      />
    </div>
  </TabsContent>
)

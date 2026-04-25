import { TabsContent } from "@/components/ui/tabs"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CountryInput } from "@/components/ui/country-input"
import { PhoneInput } from "@/components/ui/phone-number-input"
import { SectionNavigation } from "./section-navigation"
import { SectionProps } from "./section-types"

export const PersonalTabSection = ({
  form,
  onNext,
}: SectionProps & { onNext: () => void }) => (
  <TabsContent value="personal" className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold sm:text-3xl">
        Personal Information
      </h2>
      <p className="text-muted-foreground">Please provide your contact details.</p>
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

    <SectionNavigation nextLabel="Academic Background" onNext={onNext} />
  </TabsContent>
)

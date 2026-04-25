import { TabsContent } from "@/components/ui/tabs"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import {
  RESEARCH_MAX_CHARS,
  fieldsOfInterest,
} from "../application-form-config"
import { SectionNavigation } from "./section-navigation"
import { SectionProps } from "./section-types"

export const ResearchTabSection = ({
  form,
  onNext,
  onPrevious,
}: SectionProps & { onNext: () => void; onPrevious: () => void }) => {
  const researchChars = form.watch("researchInterest")?.length ?? 0

  return (
    <TabsContent value="research" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Research Interests
        </h2>
        <p className="text-muted-foreground">
          Please select up to 3 fields of interest and describe your research
          interests.
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
                Select up to three fields that you are most interested in.
              </FormDescription>
            </div>
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {fieldsOfInterest.map((interest) => (
                  <FormField
                    key={interest}
                    control={form.control}
                    name="fieldsOfInterest"
                    render={({ field: { value } }) => {
                      const checked = value?.includes(interest)

                      return (
                        <FormItem
                          key={interest}
                          className="flex flex-row items-start space-x-3 space-y-0 pb-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(isChecked) => {
                                const currentValues = [...(value || [])]

                                if (isChecked && currentValues.length < 3) {
                                  form.setValue(
                                    "fieldsOfInterest",
                                    [...currentValues, interest],
                                    {
                                      shouldDirty: true,
                                      shouldTouch: true,
                                      shouldValidate: true,
                                    }
                                  )
                                  return
                                }

                                if (isChecked && currentValues.length >= 3) {
                                  toast({
                                    title: "Maximum Selection Reached",
                                    description:
                                      "You can only select up to 3 fields of interest.",
                                  })
                                  return
                                }

                                form.setValue(
                                  "fieldsOfInterest",
                                  currentValues.filter(
                                    (currentValue) => currentValue !== interest
                                  ),
                                  {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                  }
                                )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{interest}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage className="absolute left-0 top-full mt-2 w-fit max-w-full" />
            </div>
          </FormItem>
        )}
      />

      <div className="pt-8">
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
              <div className="text-xs text-muted-foreground mt-1">
                {researchChars}/{RESEARCH_MAX_CHARS} characters
              </div>
              <FormDescription>
                Explain why you are interested in these fields and what specific
                questions or problems you hope to address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <SectionNavigation
        previousLabel="Parent Information"
        onPrevious={onPrevious}
        nextLabel="Additional Information"
        onNext={onNext}
      />
    </TabsContent>
  )
}

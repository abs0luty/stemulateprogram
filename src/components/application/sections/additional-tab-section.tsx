import { TabsContent } from "@/components/ui/tabs"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { SectionProps } from "./section-types"

export const AdditionalTabSection = ({
  form,
  onPrevious,
  onSubmitAttempt,
  isSubmitting,
}: SectionProps & {
  onPrevious: () => void
  onSubmitAttempt: () => void
  isSubmitting: boolean
}) => (
  <TabsContent value="additional" className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-3xl font-semibold">Promo Code</h2>
      <p className="text-muted-foreground">
        If your code is valid, it applies a $50 discount to the program fee
        and marks your application for priority consideration during review.
      </p>
    </div>

    <FormField
      control={form.control}
      name="promoCode"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Leave blank if you do not have one."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="flex flex-col sm:flex-row gap-2 justify-between">
      <Button
        type="button"
        variant="outline"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-normal text-center sm:whitespace-nowrap"
        onClick={onPrevious}
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        <span>Previous: Research Interests</span>
      </Button>
      <Button
        type="button"
        onClick={onSubmitAttempt}
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
)

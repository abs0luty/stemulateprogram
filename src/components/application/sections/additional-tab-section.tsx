import { TabsContent } from "@/components/ui/tabs"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BadgeCheck, Loader2, OctagonAlert } from "lucide-react"
import { SectionProps } from "./section-types"

export const AdditionalTabSection = ({
  form,
  onPrevious,
  onSubmitAttempt,
  isSubmitting,
  onVerifyPromoCode,
  isCheckingPromoCode,
  promoCodeStatus,
}: SectionProps & {
  onPrevious: () => void
  onSubmitAttempt: () => void
  isSubmitting: boolean
  onVerifyPromoCode: () => void
  isCheckingPromoCode: boolean
  promoCodeStatus: "idle" | "checking" | "valid" | "invalid" | "error"
}) => (
  <TabsContent value="additional" className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold sm:text-3xl">Promo Code</h2>
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
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Leave blank if you do not have one."
                {...field}
                onBlur={() => {
                  field.onBlur()
                  void onVerifyPromoCode()
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={onVerifyPromoCode}
                disabled={
                  isCheckingPromoCode || !form.getValues("promoCode")?.trim()
                }
                className="sm:w-auto"
              >
                {isCheckingPromoCode ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Check Code"
                )}
              </Button>
            </div>
          </FormControl>
          {promoCodeStatus === "valid" ? (
            <p className="flex items-center gap-2 text-sm text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              Promo code is valid. The discount will be applied after review.
            </p>
          ) : null}
          {promoCodeStatus === "error" ? (
            <p className="flex items-center gap-2 text-sm text-amber-700">
              <OctagonAlert className="h-4 w-4" />
              We could not verify the promo code right now. Try again.
            </p>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="flex flex-col sm:flex-row gap-2 justify-between">
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 underline-offset-4 transition hover:text-neutral-950 hover:underline"
        onClick={onPrevious}
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        <span>Research Interests</span>
      </button>
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

import { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Fingerprint, StepBackIcon } from "lucide-react"

interface OtpInputFormProps {
  email: string
  code: string
  setCode: (code: string) => void
  onVerifyCode: () => void
  verifyingOtp: boolean
  verifyCodeError: string
  onGoBackToStart: () => void
}

export const OtpInputForm: FC<OtpInputFormProps> = ({
  email,
  code,
  setCode,
  onVerifyCode,
  verifyingOtp,
  verifyCodeError,
  onGoBackToStart,
}) => (
  <>
    <div className="space-y-5 pt-14 md:pt-20">
      <div className="mx-auto flex h-[140px] w-full max-w-[200px] items-center justify-center overflow-hidden">
        <img
          src="/email.svg"
          alt="Open email inbox with a verification message"
          className="max-h-[130px] w-auto max-w-full object-contain"
        />
      </div>

      <div className="w-full space-y-4">
        <div className="space-y-2">
          <p className="text-3xl md:text-4xl font-semibold">
            Enter Verification Code
          </p>
          <p className="text-muted-foreground">
            This may take a while for our system to send an email with
            verification code.
          </p>
        </div>

        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p>Enter the 6-digit code sent to {email}</p>

        {verifyCodeError && (
          <p className="text-red-500 text-sm">{verifyCodeError}</p>
        )}

        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code? Check your spam folder. If you still
          can&apos;t find it, go back and request a new code.
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Button
            className="w-full md:w-auto bg-neutral-800 px-5 hover:bg-neutral-700 py-2 md:py-2.5"
            onClick={onVerifyCode}
            disabled={verifyingOtp || code.length !== 6}
          >
            <div className="flex items-center justify-center gap-2">
              <Fingerprint className="h-4 w-4 md:h-5 md:w-5" />
              <span>{verifyingOtp ? "Signing in..." : "Sign in"}</span>
            </div>
          </Button>

          <Button
            onClick={onGoBackToStart}
            variant="outline"
            className="w-full md:w-auto py-2 md:py-2.5"
          >
            <div className="flex items-center justify-center gap-2">
              <StepBackIcon className="h-4 w-4 md:h-5 md:w-5" />
              <span>Go back</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  </>
)

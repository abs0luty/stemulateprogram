import { FC } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailCheckIcon, StepBackIcon } from "lucide-react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { HCAPTCHA_SITE_KEY } from "@/globals"

interface EmailInputFormProps {
  email: string
  setEmail: (email: string) => void
  onSendOtp: (signUp: boolean) => void
  sendingOtp: boolean
  sendCodeError: string
  captchaToken: string | null
  setCaptchaToken: (token: string) => void
  onGoBack: () => void
  isSignUp: boolean
}

export const EmailInputForm: FC<EmailInputFormProps> = ({
  email,
  setEmail,
  onSendOtp,
  sendingOtp,
  sendCodeError,
  captchaToken,
  setCaptchaToken,
  onGoBack,
  isSignUp,
}) => (
  <>
    <div className="flex flex-col gap-5 pt-6 md:flex-row md:items-center md:gap-8 md:pt-0">
      <div className="mx-auto flex h-[180px] w-full max-w-[220px] shrink-0 items-center justify-center overflow-hidden md:mx-0">
        <img
          src="/login.svg"
          alt="Student logging into the application portal"
          className="max-h-[170px] w-auto max-w-full object-contain"
        />
      </div>

      <div className="w-full space-y-4">
        <p className="text-3xl md:text-4xl font-semibold font-serif">
          {isSignUp ? "Create an account" : "Log into your account"}
        </p>
        <p className="md:text-lg">
          We&apos;ll send you a code to{" "}
          {isSignUp ? "confirm your email and access" : "access"} your
          application form.
        </p>
        <Input
          className="md:text-base"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {sendCodeError && <p className="text-red-500 text-sm">{sendCodeError}</p>}

        <div className="flex min-h-[78px] items-start justify-center md:justify-start">
          <HCaptcha sitekey={HCAPTCHA_SITE_KEY} onVerify={setCaptchaToken} />
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <Button
            onClick={() => onSendOtp(isSignUp)}
            disabled={sendingOtp || !email || !captchaToken}
            variant="outline"
          >
            <MailCheckIcon className="mr-2" />
            {sendingOtp ? "Sending code..." : "Send Verification Code"}
          </Button>
          <Button onClick={onGoBack} variant="outline">
            {" "}
            <StepBackIcon className="mr-2" /> Go back
          </Button>
        </div>
      </div>
    </div>
  </>
)

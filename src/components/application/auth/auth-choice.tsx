import { FC } from "react"
import { Button } from "@/components/ui/button"
import { LogInIcon, UserIcon } from "lucide-react"

interface AuthChoiceProps {
  onSignIn: () => void
  onSignUp: () => void
}

export const AuthChoice: FC<AuthChoiceProps> = ({ onSignIn, onSignUp }) => (
  <>
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
      <div className="mx-auto w-full max-w-[220px] shrink-0 md:mx-0 md:max-w-[260px]">
        <img
          src="/portal.svg"
          alt="Student entering the application portal"
          className="h-auto w-full"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-3xl font-semibold font-serif md:text-4xl">
            Welcome to the application portal.
          </p>
          <p className="text-sm leading-6 text-muted-foreground md:text-base">
            Use this space to start a new application or return to one you
            already began. If you have any questions, please email us at{" "}
            <a
              href="mailto:admissions@stemulateprogram.com"
              className="underline underline-offset-4"
            >
              admissions@stemulateprogram.com
            </a>.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={onSignIn} variant="outline" className="p-4">
            <LogInIcon className="mr-2" />
            Login
          </Button>
          <Button onClick={onSignUp} variant="outline" className="p-4">
            <UserIcon className="mr-2" />
            Sign up
          </Button>
        </div>
      </div>
    </div>
  </>
)

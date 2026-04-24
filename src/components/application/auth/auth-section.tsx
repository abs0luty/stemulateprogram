import { useAuthFlow } from "./use-auth-flow"
import { AuthChoice } from "./auth-choice"
import { EmailInputForm } from "./email-input-form"
import { OtpInputForm } from "./otp-input-form"

export function AuthSection() {
  const {
    email,
    setEmail,
    code,
    setCode,
    sendCodeError,
    verifyCodeError,
    signInOrSignUp,
    setSignInOrSignUp,
    isCodeSent,
    sendingOtp,
    verifyingOtp,
    captchaToken,
    setCaptchaToken,
    handleSendOtp,
    handleVerifyCode,
    resetAuthFlow,
  } = useAuthFlow()

  return (
    <div className="mt-2 w-full max-w-5xl space-y-3">
      {!isCodeSent ? (
        !signInOrSignUp ? (
          <AuthChoice
            onSignIn={() => setSignInOrSignUp("signIn")}
            onSignUp={() => setSignInOrSignUp("signUp")}
          />
        ) : (
          <EmailInputForm
            email={email}
            setEmail={setEmail}
            onSendOtp={handleSendOtp}
            sendingOtp={sendingOtp}
            sendCodeError={sendCodeError}
            captchaToken={captchaToken}
            setCaptchaToken={setCaptchaToken}
            onGoBack={resetAuthFlow}
            isSignUp={signInOrSignUp === "signUp"}
          />
        )
      ) : (
        <OtpInputForm
          email={email}
          code={code}
          setCode={setCode}
          onVerifyCode={handleVerifyCode}
          verifyingOtp={verifyingOtp}
          verifyCodeError={verifyCodeError}
          onGoBackToStart={resetAuthFlow} // Resets to initial state
        />
      )}
    </div>
  )
}

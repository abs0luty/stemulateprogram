import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useAuthFlow } from "./use-auth-flow"
import { AuthChoice } from "./auth-choice"
import { EmailInputForm } from "./email-input-form"
import { OtpInputForm } from "./otp-input-form"
import { SiteLoader } from "@/components/common/site-loader"

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

  const authStep = isCodeSent
    ? "otp"
    : signInOrSignUp
      ? "email"
      : "choice"

  const stepAsset = useMemo(
    () => ({
      choice: "/portal.svg",
      email: "/login.svg",
      otp: "/email.svg",
    }),
    []
  )
  const [loadedAssets, setLoadedAssets] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const asset = stepAsset[authStep]

    if (loadedAssets[asset]) {
      return
    }

    const image = new Image()
    image.src = asset

    const markLoaded = () => {
      setLoadedAssets((current) => ({ ...current, [asset]: true }))
    }

    if (image.complete) {
      markLoaded()
      return
    }

    image.onload = markLoaded
    image.onerror = markLoaded

    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [authStep, loadedAssets, stepAsset])

  const isAssetReady = loadedAssets[stepAsset[authStep]]

  if (!isAssetReady) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <SiteLoader compact theme="light" />
      </div>
    )
  }

  return (
    <div className="mt-2 w-full max-w-5xl space-y-3">
      {authStep === "choice" ? (
        <AuthChoice
          onSignIn={() => setSignInOrSignUp("signIn")}
          onSignUp={() => setSignInOrSignUp("signUp")}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={authStep}
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {isCodeSent ? (
              <OtpInputForm
                email={email}
                code={code}
                setCode={setCode}
                onVerifyCode={handleVerifyCode}
                verifyingOtp={verifyingOtp}
                verifyCodeError={verifyCodeError}
                onGoBackToStart={resetAuthFlow}
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
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

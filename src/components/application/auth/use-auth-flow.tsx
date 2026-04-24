import { useState } from "react"
import { supabaseClient } from "@/supabase" // Ensure this path is correct

export const useAuthFlow = () => {
  const [email, setEmail] = useState<string>("")
  const [code, setCode] = useState("")
  const [sendCodeError, setSendCodeError] = useState("")
  const [verifyCodeError, setVerifyCodeError] = useState("")
  const [signInOrSignUp, setSignInOrSignUp] = useState<
    "signIn" | "signUp" | null
  >(null)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")

  const handleSendOtp = async (signUp: boolean) => {
    setSendCodeError("") // Clear previous errors
    setVerifyCodeError("") // Clear previous errors (in case of resend)

    if (!email) {
      setSendCodeError("Email address is required.")
      return
    }
    if (!captchaToken) {
      setSendCodeError("Please complete the captcha verification.")
      return
    }

    setSendingOtp(true)
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://stemulateprogram.com/apply",
          shouldCreateUser: signUp,
          captchaToken,
        },
      })

      if (error) {
        let errorMessage = "Something went wrong, please try again."
        switch (error.code) {
          case "validation_failed":
            errorMessage = "Invalid email address."
            break
          case "over_email_send_rate_limit":
            errorMessage = "Too many login attempts, try again later."
            break
          case "otp_disabled":
            // This error code might indicate no user or other issues,
            // depending on Supabase setup, we need to be careful with specific messages.
            errorMessage =
              signInOrSignUp === "signIn"
                ? "Account with such email doesn't exist."
                : "OTP disabled for this email."
            break
          default:
            errorMessage = "Something went wrong, please try again."
        }
        // Assign error to the appropriate state based on current flow
        if (!isCodeSent) {
          setSendCodeError(errorMessage)
        } else {
          setVerifyCodeError(errorMessage) // For resend attempts
        }
      } else {
        setIsCodeSent(true)
        setCode("")
      }
    } catch (err: any) {
      console.error("Error sending OTP:", err)
      setSendCodeError("An unexpected error occurred. Please try again.")
    } finally {
      // Supabase captcha tokens are single-use for auth requests, so force a
      // fresh challenge before any resend.
      setCaptchaToken("")
      setSendingOtp(false)
    }
  }

  const handleVerifyCode = async () => {
    setVerifyCodeError("") // Clear previous errors

    if (code.length !== 6) {
      setVerifyCodeError("Please enter a 6-digit code.")
      return
    }

    setVerifyingOtp(true)
    try {
      const { error } = await supabaseClient.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      })

      if (error) {
        let errorMessage = "Something went wrong, please try again."
        switch (error.code) {
          case "otp_expired":
          case "invalid_token": // Supabase might return invalid_token for incorrect code
            errorMessage =
              "The code is invalid or has expired. Please request a new one."
            break
          default:
            errorMessage = "Something went wrong, please try again."
        }
        setVerifyCodeError(errorMessage)
      }
      // If no error, the user is likely signed in/up, and Supabase client will handle redirection/session.
    } catch (err: any) {
      console.error("Error verifying OTP:", err)
      setVerifyCodeError("An unexpected error occurred during verification.")
    } finally {
      setVerifyingOtp(false)
    }
  }

  const resetAuthFlow = () => {
    setEmail("")
    setCode("")
    setSendCodeError("")
    setVerifyCodeError("")
    setSignInOrSignUp(null)
    setIsCodeSent(false)
    setSendingOtp(false)
    setVerifyingOtp(false)
    setCaptchaToken("")
  }

  return {
    email,
    setEmail,
    code,
    setCode,
    sendCodeError,
    verifyCodeError,
    signInOrSignUp,
    setSignInOrSignUp,
    isCodeSent,
    setIsCodeSent,
    sendingOtp,
    setSendingOtp,
    verifyingOtp,
    setVerifyingOtp,
    captchaToken,
    setCaptchaToken,
    handleSendOtp,
    handleVerifyCode,
    resetAuthFlow,
  }
}

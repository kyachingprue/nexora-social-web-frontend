import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

import useAuth from '../../hooks/useAuth'

const RESEND_COOLDOWN = 60
const CODE_LENGTH = 6

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { verifyEmail, resendVerificationEmail } = useAuth()

  // Email sent from Register page
  const email = location.state?.email || ''

  // Store each digit separately
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''))

  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const [countdown, setCountdown] = useState(RESEND_COOLDOWN)

  // Input references
  const inputRefs = useRef([])

  // --------------------------------------------------
  // Resend countdown
  // --------------------------------------------------

  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown(previous => previous - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  // --------------------------------------------------
  // Focus first input
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // --------------------------------------------------
  // Verify Email
  // --------------------------------------------------

  const handleVerify = async (verificationCode = code.join('')) => {
    if (verificationCode.length !== CODE_LENGTH) {
      setServerError('Please enter the complete 6-digit verification code.')
      return
    }

    if (!email) {
      setServerError(
        'Email address is missing. Please return to registration and try again.'
      )
      return
    }

    try {
      setIsVerifying(true)
      setServerError('')
      setSuccessMessage('')

      await verifyEmail({
        email,
        code: verificationCode
      })

      setSuccessMessage(
        'Your email has been verified successfully!'
      )

      // Redirect to login after success
      setTimeout(() => {
        navigate('/login', {
          replace: true,
          state: {
            message:
              'Email verified successfully. You can now sign in.'
          }
        })
      }, 1200)
    } catch (error) {
      console.error('Email verification failed:', error)

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Invalid or expired verification code.'

      setServerError(message)
    } finally {
      setIsVerifying(false)
    }
  }

  // --------------------------------------------------
  // Handle individual input
  // --------------------------------------------------

  const handleCodeChange = (value, index) => {
    // Only allow numbers
    const digit = value.replace(/\D/g, '').slice(-1)

    const newCode = [...code]
    newCode[index] = digit

    setCode(newCode)
    setServerError('')

    // Move to next input
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Automatically verify after 6 digits
    const completeCode = newCode.join('')

    if (
      completeCode.length === CODE_LENGTH &&
      newCode.every(Boolean)
    ) {
      handleVerify(completeCode)
    }
  }

  // --------------------------------------------------
  // Handle keyboard
  // --------------------------------------------------

  const handleKeyDown = (event, index) => {
    // Backspace
    if (
      event.key === 'Backspace' &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus()
    }

    // Arrow left
    if (
      event.key === 'ArrowLeft' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus()
    }

    // Arrow right
    if (
      event.key === 'ArrowRight' &&
      index < CODE_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // --------------------------------------------------
  // Handle paste
  // --------------------------------------------------

  const handlePaste = event => {
    event.preventDefault()

    const pastedValue = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, CODE_LENGTH)

    if (!pastedValue) return

    const newCode = Array(CODE_LENGTH).fill('')

    pastedValue.split('').forEach((digit, index) => {
      newCode[index] = digit
    })

    setCode(newCode)
    setServerError('')

    // Focus next empty input
    const nextIndex = Math.min(
      pastedValue.length,
      CODE_LENGTH - 1
    )

    inputRefs.current[nextIndex]?.focus()

    // Automatically verify if complete
    if (pastedValue.length === CODE_LENGTH) {
      handleVerify(pastedValue)
    }
  }

  // --------------------------------------------------
  // Resend Verification Code
  // --------------------------------------------------

  const handleResend = async () => {
    if (!email || countdown > 0 || isResending) {
      return
    }

    try {
      setIsResending(true)
      setServerError('')
      setSuccessMessage('')

      await resendVerificationEmail(email)

      setCode(Array(CODE_LENGTH).fill(''))
      setCountdown(RESEND_COOLDOWN)

      setSuccessMessage(
        'A new verification code has been sent to your email.'
      )

      setTimeout(() => {
        inputRefs.current[0]?.focus()
      }, 100)
    } catch (error) {
      console.error(
        'Resend verification code failed:',
        error
      )

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Unable to resend the verification code.'

      setServerError(message)
    } finally {
      setIsResending(false)
    }
  }

  // --------------------------------------------------
  // Mask Email
  // --------------------------------------------------

  const getMaskedEmail = () => {
    if (!email) return 'your email address'

    const [username, domain] = email.split('@')

    if (!username || !domain) return email

    if (username.length <= 2) {
      return `${username[0] || '*'}***@${domain}`
    }

    return `${username.slice(0, 2)}${'*'.repeat(
      Math.min(username.length - 2, 5)
    )}@${domain}`
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-[#080b12] dark:text-white sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 dark:border-white/10 dark:bg-[#0d111a] dark:shadow-black/40 lg:grid-cols-2">

          {/* ==================================================
              LEFT BRANDING
          ================================================== */}

          <section className="relative hidden min-h-170 overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            {/* Background decoration */}

            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

            {/* Logo */}

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/20 backdrop-blur-md">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  Nexora
                </h1>

                <p className="text-xs text-white/70">
                  Connect. Share. Discover.
                </p>
              </div>
            </div>

            {/* Main Content */}

            <div className="relative z-10 max-w-md">

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/20 backdrop-blur-md">
                <Mail size={38} />
              </div>

              <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">
                Verify your
                <span className="block text-white/70">
                  email address.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-white/75">
                One quick step before you enter the
                Nexora community. Verify your email to
                keep your account secure.
              </p>

              {/* Security Card */}

              <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="font-semibold">
                      Why verify your email?
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white/65">
                      It helps protect your account and
                      ensures you can recover your Nexora
                      account when needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}

            <div className="relative z-10 flex items-center gap-2 text-sm text-white/60">
              <ShieldCheck size={16} />
              Secure verification powered by Nexora
            </div>
          </section>

          {/* ==================================================
              RIGHT VERIFICATION CARD
          ================================================== */}

          <section className="flex min-h-170 items-center justify-center p-6 sm:p-10 lg:p-16">
            <div className="w-full max-w-md">

              {/* Mobile Logo */}

              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h1 className="text-xl font-bold">
                    Nexora
                  </h1>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Connect. Share. Discover.
                  </p>
                </div>
              </div>

              {/* Header Icon */}

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {successMessage ? (
                  <CheckCircle2 size={30} />
                ) : (
                  <Mail size={30} />
                )}
              </div>

              {/* Heading */}

              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Almost there ✨
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Verify your email
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  We've sent a 6-digit verification code
                  to
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {getMaskedEmail()}
                </p>
              </div>

              {/* Error */}

              {serverError && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                >
                  {serverError}
                </div>
              )}

              {/* Success */}

              {successMessage && (
                <div
                  role="status"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{successMessage}</span>
                </div>
              )}

              {/* ==================================================
                  NORMAL OTP INPUTS
              ================================================== */}

              <div className="mb-7">
                <label className="mb-4 block text-sm font-semibold">
                  Verification code
                </label>

                <div
                  className="flex justify-between gap-2 sm:gap-3"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={element => {
                        inputRefs.current[index] = element
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={
                        index === 0
                          ? 'one-time-code'
                          : 'off'
                      }
                      maxLength={1}
                      value={digit}
                      disabled={
                        isVerifying || isResending
                      }
                      onChange={event =>
                        handleCodeChange(
                          event.target.value,
                          index
                        )
                      }
                      onKeyDown={event =>
                        handleKeyDown(event, index)
                      }
                      className="
                        h-14
                        w-11
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        text-center
                        text-xl
                        font-bold
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-300
                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-indigo-500/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:border-white/10
                        dark:bg-white/40
                        dark:text-white
                        dark:placeholder:text-white/20
                        dark:focus:border-indigo-400
                        dark:focus:bg-white/10
                        sm:h-16
                        sm:w-14
                      "
                      aria-label={`Verification digit ${index + 1}`}
                    />
                  ))}
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Enter the 6-digit code from your email.
                </p>
              </div>

              {/* ==================================================
                  VERIFY BUTTON
              ================================================== */}

              <button
                type="button"
                onClick={() => handleVerify()}
                disabled={
                  code.join('').length !== CODE_LENGTH ||
                  isVerifying ||
                  isResending
                }
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-indigo-500/20
                  transition
                  hover:bg-indigo-700
                  hover:shadow-indigo-500/30
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isVerifying ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Verifying email...
                  </>
                ) : (
                  <>
                    Verify email

                    <CheckCircle2
                      size={18}
                      className="transition-transform group-hover:scale-110"
                    />
                  </>
                )}
              </button>

              {/* ==================================================
                  RESEND
              ================================================== */}

              <div className="mt-7 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Didn't receive the code?
                </p>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={
                    countdown > 0 ||
                    isResending ||
                    isVerifying ||
                    !email
                  }
                  className="
                    mt-2
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-indigo-600
                    transition
                    hover:text-indigo-500
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    dark:text-indigo-400
                  "
                >
                  {isResending ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Sending code...
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <RefreshCw size={16} />
                      Resend code in {countdown}s
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      Resend verification code
                    </>
                  )}
                </button>
              </div>

              {/* ==================================================
                  BACK TO LOGIN
              ================================================== */}

              <div className="mt-8 border-t border-slate-200 pt-6 text-center dark:border-white/10">
                <Link
                  to="/login"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-slate-500
                    transition
                    hover:text-indigo-600
                    dark:text-slate-400
                    dark:hover:text-indigo-400
                  "
                >
                  <ArrowLeft size={16} />
                  Back to sign in
                </Link>
              </div>

              {/* Security */}

              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} />
                Your verification code is private and secure.
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default VerifyEmail


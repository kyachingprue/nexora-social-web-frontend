import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

import useAuth from '../../hooks/useAuth'

const CODE_LENGTH = 6

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { resetPassword } = useAuth()

  // Email passed from ForgotPassword page
  const initialEmail = location.state?.email || ''

  const [email, setEmail] = useState(initialEmail)

  const [code, setCode] = useState(
    Array(CODE_LENGTH).fill('')
  )

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const inputRefs = useRef([])

  // --------------------------------------------------
  // Focus first code input
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // --------------------------------------------------
  // Password strength
  // --------------------------------------------------

  const getPasswordStrength = () => {
    if (!password) {
      return {
        label: '',
        width: '0%',
        level: 0
      }
    }

    let score = 0

    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) {
      return {
        label: 'Weak',
        width: '35%',
        level: 1
      }
    }

    if (score <= 3) {
      return {
        label: 'Medium',
        width: '65%',
        level: 2
      }
    }

    return {
      label: 'Strong',
      width: '100%',
      level: 3
    }
  }

  const passwordStrength = getPasswordStrength()

  // --------------------------------------------------
  // Code input change
  // --------------------------------------------------

  const handleCodeChange = (value, index) => {
    const digit = value
      .replace(/\D/g, '')
      .slice(-1)

    const newCode = [...code]
    newCode[index] = digit

    setCode(newCode)
    setServerError('')
  }

  // --------------------------------------------------
  // Keyboard navigation
  // --------------------------------------------------

  const handleCodeKeyDown = (event, index) => {
    if (
      event.key === 'Backspace' &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus()
    }

    if (
      event.key === 'ArrowLeft' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus()
    }

    if (
      event.key === 'ArrowRight' &&
      index < CODE_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // --------------------------------------------------
  // Paste verification code
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

    const nextIndex = Math.min(
      pastedValue.length,
      CODE_LENGTH - 1
    )

    inputRefs.current[nextIndex]?.focus()
  }

  // --------------------------------------------------
  // Submit Reset Password
  // --------------------------------------------------

  const handleSubmit = async event => {
    event.preventDefault()

    const normalizedEmail = email
      .trim()
      .toLowerCase()

    const verificationCode = code.join('')

    setServerError('')
    setSuccessMessage('')

    // Email validation
    if (!normalizedEmail) {
      setServerError(
        'Please enter your email address.'
      )
      return
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizedEmail
      )
    ) {
      setServerError(
        'Please enter a valid email address.'
      )
      return
    }

    // Code validation
    if (verificationCode.length !== CODE_LENGTH) {
      setServerError(
        'Please enter the complete 6-digit reset code.'
      )
      return
    }

    // Password validation
    if (!password) {
      setServerError(
        'Please enter your new password.'
      )
      return
    }

    if (password.length < 8) {
      setServerError(
        'Password must be at least 8 characters long.'
      )
      return
    }

    // Confirm password
    if (!confirmPassword) {
      setServerError(
        'Please confirm your new password.'
      )
      return
    }

    if (password !== confirmPassword) {
      setServerError(
        'Passwords do not match.'
      )
      return
    }

    try {
      setIsLoading(true)

      await resetPassword({
        email: normalizedEmail,
        code: verificationCode,
        newPassword: password
      })

      setSuccessMessage('Your password has been reset successfully!')

      setTimeout(() => {
        navigate('/login', {
          replace: true,
          state: {
            message:
              'Password reset successfully. You can now sign in with your new password.'
          }
        })
      }, 1500)
    } catch (error) {
      console.error('Reset password failed:', error)

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Unable to reset your password. The code may be invalid or expired.'

      setServerError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-[#080b12] dark:text-white sm:py-12">

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 dark:border-white/10 dark:bg-[#0d111a] dark:shadow-black/40 lg:grid-cols-2">

          {/* ==================================================
              LEFT BRANDING
          ================================================== */}

          <section className="relative hidden min-h-190 overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            {/* Background decorations */}

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

            {/* Main content */}

            <div className="relative z-10 max-w-md">

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/20 backdrop-blur-md">
                <LockKeyhole size={38} />
              </div>

              <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">
                Create a new
                <span className="block text-white/70">
                  secure password.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-white/75">
                You're almost back into your Nexora
                account. Enter the verification code
                and choose a strong new password.
              </p>

              {/* Security card */}

              <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="font-semibold">
                      Keep your account secure
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white/65">
                      Use a strong password that you
                      don't use on other websites.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Footer */}

            <div className="relative z-10 flex items-center gap-2 text-sm text-white/60">
              <ShieldCheck size={16} />
              Secure password recovery powered by Nexora
            </div>

          </section>

          {/* ==================================================
              RIGHT CONTENT
          ================================================== */}

          <section className="flex min-h-190 items-center justify-center p-6 sm:p-10 lg:p-14">

            <div className="w-full max-w-md">

              {/* Mobile logo */}

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

              {/* Header icon */}

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                {successMessage ? (
                  <CheckCircle2 size={30} />
                ) : (
                  <KeyRound size={30} />
                )}

              </div>

              {/* Heading */}

              <div className="mb-8">

                <p className="mb-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Account recovery 🔐
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Reset password
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter the 6-digit code sent to your
                  email and create a new password.
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
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                noValidate
              >

                {/* Email */}

                <div className="mb-6">

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={event => {
                        setEmail(event.target.value)
                        setServerError('')
                      }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={isLoading}
                      className="
                        h-13
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        pl-11
                        pr-4
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-indigo-500/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:border-white/10
                        dark:bg-white/40
                        dark:text-white
                        dark:placeholder:text-slate-500
                        dark:focus:border-indigo-400
                        dark:focus:bg-white/10
                      "
                    />

                  </div>

                </div>

                {/* ==================================================
                    VERIFICATION CODE
                ================================================== */}

                <div className="mb-6">

                  <label className="mb-3 block text-sm font-semibold">
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
                          inputRefs.current[index] =
                            element
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        disabled={isLoading}
                        onChange={event => {
                          handleCodeChange(
                            event.target.value,
                            index
                          )

                          if (
                            event.target.value &&
                            index <
                              CODE_LENGTH - 1
                          ) {
                            inputRefs.current[
                              index + 1
                            ]?.focus()
                          }
                        }}
                        onKeyDown={event =>
                          handleCodeKeyDown(
                            event,
                            index
                          )
                        }
                        className="
                          h-13
                          w-10
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          text-center
                          text-lg
                          font-bold
                          text-slate-900
                          outline-none
                          transition-all
                          focus:border-indigo-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-indigo-500/10
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                          dark:border-white/10
                          dark:bg-white/40
                          dark:text-white
                          dark:focus:border-indigo-400
                          dark:focus:bg-white/10
                          sm:h-14
                          sm:w-12
                        "
                        aria-label={`Reset code digit ${
                          index + 1
                        }`}
                      />
                    ))}

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Enter the 6-digit code from your email.
                  </p>

                </div>

                {/* ==================================================
                    NEW PASSWORD
                ================================================== */}

                <div className="mb-5">

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold"
                  >
                    New password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      value={password}
                      onChange={event => {
                        setPassword(
                          event.target.value
                        )
                        setServerError('')
                      }}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="
                        h-13
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        pl-11
                        pr-12
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-indigo-500/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:border-white/10
                        dark:bg-white/40
                        dark:text-white
                        dark:placeholder:text-slate-500
                        dark:focus:border-indigo-400
                        dark:focus:bg-white/10
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          previous => !previous
                        )
                      }
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:text-slate-700 dark:text-slate-500 dark:hover:text-white"
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  {/* Password strength */}

                  {password && (
                    <div className="mt-3">

                      <div className="mb-1.5 flex items-center justify-between">

                        <span className="text-xs text-slate-400">
                          Password strength
                        </span>

                        <span
                          className={`text-xs font-semibold ${
                            passwordStrength.level ===
                            1
                              ? 'text-red-500'
                              : passwordStrength.level ===
                                  2
                                ? 'text-amber-500'
                                : 'text-emerald-500'
                          }`}
                        >
                          {passwordStrength.label}
                        </span>

                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">

                        <div
                          className={`h-full rounded-full transition-all ${
                            passwordStrength.level ===
                            1
                              ? 'w-[35%] bg-red-500'
                              : passwordStrength.level ===
                                  2
                                ? 'w-[65%] bg-amber-500'
                                : 'w-full bg-emerald-500'
                          }`}
                        />

                      </div>

                    </div>
                  )}

                </div>

                {/* ==================================================
                    CONFIRM PASSWORD
                ================================================== */}

                <div className="mb-6">

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Confirm new password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                    />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? 'text'
                          : 'password'
                      }
                      value={confirmPassword}
                      onChange={event => {
                        setConfirmPassword(
                          event.target.value
                        )
                        setServerError('')
                      }}
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="
                        h-13
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        pl-11
                        pr-12
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-indigo-500/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:border-white/10
                        dark:bg-white/40
                        dark:text-white
                        dark:placeholder:text-slate-500
                        dark:focus:border-indigo-400
                        dark:focus:bg-white/10
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          previous => !previous
                        )
                      }
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:text-slate-700 dark:text-slate-500 dark:hover:text-white"
                      aria-label={
                        showConfirmPassword
                          ? 'Hide confirm password'
                          : 'Show confirm password'
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  {/* Password match */}

                  {confirmPassword && (
                    <div
                      className={`mt-2 text-xs font-medium ${
                        password ===
                        confirmPassword
                          ? 'text-emerald-500'
                          : 'text-red-500'
                      }`}
                    >
                      {password ===
                      confirmPassword
                        ? '✓ Passwords match'
                        : 'Passwords do not match'}
                    </div>
                  )}

                </div>

                {/* ==================================================
                    RESET BUTTON
                ================================================== */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    group
                    flex
                    h-13
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-indigo-600
                    px-5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-indigo-500/20
                    transition-all
                    hover:bg-indigo-700
                    hover:shadow-indigo-500/30
                    active:scale-[0.99]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  {isLoading ? (
                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />

                      Resetting password...
                    </>
                  ) : (
                    <>
                      Reset password

                      <CheckCircle2
                        size={18}
                        className="transition-transform group-hover:scale-110"
                      />
                    </>
                  )}

                </button>

              </form>

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
                Your password is private and secure.
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  )
}

export default ResetPassword


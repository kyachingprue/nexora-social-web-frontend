import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

import useAuth from '../../hooks/useAuth'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const { forgotPassword } = useAuth()

  const [email, setEmail] = useState('')

  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  // --------------------------------------------------
  // Submit Forgot Password
  // --------------------------------------------------

  const handleSubmit = async event => {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    // Basic validation
    if (!normalizedEmail) {
      setServerError('Please enter your email address.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setServerError('Please enter a valid email address.')
      return
    }

    try {
      setIsLoading(true)
      setServerError('')
      setSuccessMessage('')

      await forgotPassword(normalizedEmail)

      setSuccessMessage(
        'Password reset instructions have been sent to your email.'
      )

      // Optional redirect after success
      setTimeout(() => {
        navigate('/reset-password', {
          state: {
            email: normalizedEmail
          }
        })
      }, 1500)
    } catch (error) {
      console.error('Forgot password failed:', error)

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Unable to send password reset instructions. Please try again.'

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

          <section className="relative hidden min-h-170 overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">

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
                <Mail size={38} />
              </div>

              <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">
                Reset your
                <span className="block text-white/70">
                  password securely.
                </span>
              </h2>

              <p className="mt-6 text-base leading-7 text-white/75">
                Forgot your password? Don't worry.
                Enter your email address and we'll help
                you get back into your Nexora account.
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
                      Your account stays protected
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white/65">
                      We'll send password reset instructions
                      only to the email associated with your
                      Nexora account.
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

          <section className="flex min-h-170 items-center justify-center p-6 sm:p-10 lg:p-16">

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
                  <Mail size={30} />
                )}
              </div>

              {/* Heading */}

              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Account recovery 🔐
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Forgot password?
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter the email address associated with
                  your account and we'll send you
                  instructions to reset your password.
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

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        dark:text-slate-500
                      "
                    />

                    <input
                      id="email"
                      name="email"
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

                {/* Submit */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    group
                    mt-6
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

                      Sending reset instructions...
                    </>
                  ) : (
                    <>
                      Send reset instructions

                      <Mail
                        size={18}
                        className="transition-transform group-hover:translate-x-0.5"
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
                Your information is private and secure.
              </div>

            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword


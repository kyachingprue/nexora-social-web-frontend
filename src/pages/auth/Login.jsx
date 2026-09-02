import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

import { FaGoogle } from 'react-icons/fa6'

import useAuth from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate()
  const { login, googleLogin } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  })

  // --------------------------------------------------
  // Email / Password Login
  // --------------------------------------------------

  const onSubmit = async data => {
    try {
      setServerError('')

      await login({
        email: data.email,
        password: data.password
      })

      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Invalid email or password. Please try again.'

      setServerError(message)
    }
  }

  // --------------------------------------------------
  // Google Login
  // --------------------------------------------------

  const handleGoogleLogin = async () => {
    try {
      setServerError('')
      setGoogleLoading(true)

      await googleLogin()

      navigate('/')
    } catch (error) {
      console.error('Google login failed:', error)

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Google login failed. Please try again.'

      setServerError(message)
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-[#080b12] dark:text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-white/10 dark:bg-[#0d111a] dark:shadow-black/30 lg:grid-cols-2">
        {/* ==================================================
            LEFT - Nexora Branding
        ================================================== */}

        <section className="relative hidden min-h-175 overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
          <div className="absolute right-20 top-1/2 h-32 w-32 rounded-full bg-indigo-300/20 blur-2xl" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur-md ring-1 ring-white/20">
              <Sparkles size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">Nexora</h1>

              <p className="text-xs text-white/70">Connect. Share. Discover.</p>
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 max-w-md">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Your social world starts here
            </div>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
              Welcome back to your
              <span className="block text-white/80">social universe.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-white/75">
              Reconnect with your friends, discover new communities, share your
              moments, and stay close to the people who matter most.
            </p>

            {/* Feature cards */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-2xl font-bold">10K+</p>
                <p className="mt-1 text-sm text-white/65">Active creators</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-2xl font-bold">50K+</p>
                <p className="mt-1 text-sm text-white/65">Daily connections</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center gap-2 text-sm text-white/60">
            <ShieldCheck size={16} />
            <span>Your account is protected with secure authentication.</span>
          </div>
        </section>

        {/* ==================================================
            RIGHT - Login Form
        ================================================== */}

        <section className="flex min-h-175 items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold">Nexora</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Connect. Share. Discover.
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Welcome back 👋
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in to Nexora
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Enter your account details to continue to your social world.
              </p>
            </div>

            {/* Server error */}
            {serverError && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
              >
                {serverError}
              </div>
            )}

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading || isSubmitting}
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/3 dark:text-slate-200 dark:hover:bg-white/6"
            >
              {googleLoading ? (
                <Loader2 size={19} className="animate-spin" />
              ) : (
                <FaGoogle
                  size={19}
                  className="transition-transform group-hover:scale-110"
                />
              )}

              {googleLoading
                ? 'Connecting to Google...'
                : 'Continue with Google'}
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />

              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                or continue with email
              </span>

              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 dark:bg-white/3 ${
                      errors.email
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10'
                    }`}
                    {...register('email', {
                      required: 'Email address is required.',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address.'
                      }
                    })}
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 dark:bg-white/3 ${
                      errors.password
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10'
                    }`}
                    {...register('password', {
                      required: 'Password is required.',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters.'
                      }
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(previous => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-200"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="mb-7 flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
                  {...register('remember')}
                />

                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Remember me
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || googleLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
              >
                Create account
              </Link>
            </p>

            {/* Security note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={14} />
              <span>Secure authentication powered by Nexora</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  ShieldCheck,
  User,
  UserRound,
  Loader2,
  TrendingUp,
  Image as ImageIcon,
  Globe2,
  UserPlus,
  Heart,
  MessageCircle,
  Users
} from 'lucide-react'

import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const { register: registerUser, googleLogin } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const password = watch('password')
  // --------------------------------------------------
  // Register with email & password
  // --------------------------------------------------


const onSubmit = async data => {
  try {
    setServerError('')

    const email = data.email.trim().toLowerCase()

    const response = await registerUser({
      name: data.name.trim(),
      username: data.username.trim().toLowerCase(),
      email,
      password: data.password,
      confirmPassword: data.confirmPassword
    })

    console.log('Registration successful:', response)
    toast.success('Account created successfully! 🎉')

    // Registration successful হলে সরাসরি
    // email verification page-এ পাঠাবে।
    navigate('/verify-email', {
      replace: true,
      state: {
        email
      }
    })
  } catch (error) {
    console.error('Registration failed:', error)

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Registration failed. Please try again.'

    setServerError(message)
  }
}



  // --------------------------------------------------
  // Google signup
  // --------------------------------------------------

  const handleGoogleSignup = async () => {
    try {
      setServerError('')
      setGoogleLoading(true)

      await googleLogin()
      toast.success('Account created successfully! 🎉')
      navigate('/')
    } catch (error) {
      console.error('Google signup failed:', error)

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Google signup failed. Please try again.'

      setServerError(message)
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-[#080b12] dark:text-white sm:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-white/10 dark:bg-[#0d111a] dark:shadow-black/30 lg:grid-cols-2">
        {/* ==================================================
            LEFT SIDE
        ================================================== */}

        <section className="relative hidden min-h-190 overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          {/* ================= Decorative Background ================= */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-32 w-32 rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="absolute right-10 top-32 h-20 w-20 rounded-full border border-white/10 bg-white/5 blur-sm" />
          <div className="absolute bottom-40 right-24 h-12 w-12 rounded-full bg-white/10 blur-xl" />

          {/* ================= Logo ================= */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/20 backdrop-blur-md">
                <Sparkles size={23} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">Nexora</h1>

                <p className="text-xs text-white/70">
                  Connect. Share. Discover.
                </p>
              </div>
            </div>

            {/* Online Community */}
            <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs backdrop-blur-md xl:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              24.8K people online
            </div>
          </div>

          {/* ================= Main Content ================= */}
          <div className="relative z-10 mt-10 max-w-xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm shadow-lg backdrop-blur-md">
              <Sparkles size={15} />
              Join the Nexora community
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-mono font-extrabold leading-tight tracking-tight xl:text-5xl">
              Your world.
              <span className="block text-white/80">Your people.</span>
              <span className="block">Your universe.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
              Connect with amazing people, share your moments, discover
              communities, follow your interests, and build meaningful
              relationships—all in one social universe.
            </p>

            {/* ================= Social Features ================= */}
            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">
              {/* Feature 1 */}
              <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white/15">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Users size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Communities</p>
                  <p className="text-[11px] text-white/60">Find your people</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white/15">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <MessageCircle size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Messaging</p>
                  <p className="text-[11px] text-white/60">Chat in real-time</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white/15">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <ImageIcon size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Stories & Posts</p>
                  <p className="text-[11px] text-white/60">
                    Share your moments
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white/15">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <TrendingUp size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Trending</p>
                  <p className="text-[11px] text-white/60">
                    Discover what's hot
                  </p>
                </div>
              </div>
            </div>

            {/* ================= Benefits ================= */}
            <div className="mt-8 space-y-3">
              {[
                {
                  icon: Heart,
                  text: 'React, comment, and engage with content you love'
                },
                {
                  icon: UserPlus,
                  text: 'Follow creators, friends, and people you admire'
                },
                {
                  icon: Globe2,
                  text: 'Explore conversations from around the world'
                }
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Icon size={14} />
                  </div>

                  <span className="text-sm text-white/75">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= Community Stats ================= */}
          <div className="relative z-10 mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-xl font-bold">250K+</p>
              <p className="text-[11px] text-white/55">Members</p>
            </div>

            <div className="h-8 w-px bg-white/15" />

            <div>
              <p className="text-xl font-bold">1.2M+</p>
              <p className="text-[11px] text-white/55">Posts shared</p>
            </div>

            <div className="h-8 w-px bg-white/15" />

            <div>
              <p className="text-xl font-bold">85K+</p>
              <p className="text-[11px] text-white/55">Communities</p>
            </div>
          </div>

          {/* ================= Security ================= */}
          <div className="relative z-10 mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ShieldCheck size={16} />
              Secure & private social experience
            </div>

            <div className="hidden items-center gap-1.5 text-xs text-white/50 xl:flex">
              <Check size={13} />
              Built for everyone
            </div>
          </div>
        </section>

        {/* ==================================================
            RIGHT SIDE
        ================================================== */}

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
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
            <div className="mb-7">
              <p className="mb-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Start your journey 🚀
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Join Nexora and start connecting with your community.
              </p>
            </div>

            {/* Server error */}
            {serverError && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
              >
                {serverError}
              </div>
            )}

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={googleLoading || isSubmitting}
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/30 dark:text-slate-200 dark:hover:bg-white/60"
            >
              {googleLoading ? (
                <Loader2 size={19} className="animate-spin" />
              ) : (
                <img
                  src="https://i.ibb.co.com/JFqzJkGp/google-removebg-preview-1.png"
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  alt=""
                />
              )}

              {googleLoading
                ? 'Creating your account...'
                : 'Continue with Google'}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />

              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                or use email
              </span>

              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 dark:bg-white/30 ${
                      errors.name
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10'
                    }`}
                    {...register('name', {
                      required: 'Full name is required.',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters.'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Name cannot exceed 50 characters.'
                      }
                    })}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold"
                >
                  Username
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="choose_username"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 dark:bg-white/30 ${
                      errors.username
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10'
                    }`}
                    {...register('username', {
                      required: 'Username is required.',
                      minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters.'
                      },
                      maxLength: {
                        value: 30,
                        message: 'Username cannot exceed 30 characters.'
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message:
                          'Username can only contain letters, numbers, and underscores.'
                      }
                    })}
                  />
                </div>

                {errors.username && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

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
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 dark:bg-white/30 ${
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
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 dark:bg-white/30 ${
                      errors.password
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10'
                    }`}
                    {...register('password', {
                      required: 'Password is required.',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters.'
                      },
                      validate: {
                        hasLetter: value =>
                          /[A-Za-z]/.test(value) ||
                          'Password must contain a letter.',
                        hasNumber: value =>
                          /\d/.test(value) || 'Password must contain a number.'
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
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 dark:bg-white/30 ${
                      errors.confirmPassword
                        ? 'border-red-400 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10'
                    }`}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password.',
                      validate: value =>
                        value === password || 'Passwords do not match.'
                    })}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(previous => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-200"
                    aria-label={
                      showConfirmPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-indigo-600"
                  {...register('terms', {
                    required: 'You must agree to the terms and privacy policy.'
                  })}
                />

                <span className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  I agree to Nexora's{' '}
                  <Link
                    to="/terms"
                    className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy"
                    className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {errors.terms && (
                <p className="-mt-2 text-xs font-medium text-red-500">
                  {errors.terms.message}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || googleLoading}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
              >
                Sign in
              </Link>
            </p>

            {/* Security */}
            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={14} />
              Your information is protected securely.
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Register

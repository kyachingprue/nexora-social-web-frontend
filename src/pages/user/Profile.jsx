import { useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Link as LinkIcon, MapPin, Settings } from "lucide-react";
import { posts } from '../../data/fakeData'
import useAuth from '../../hooks/useAuth'
import { VerifiedBadge } from "../../ui/verified-badge";
import { Button } from "../../ui/button";


export default function Profile() {
  const [tab, setTab] = useState("posts");
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        Loading profile...
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col gap-5">
      {/* COVER + PROFILE HEADER */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="relative h-44 overflow-hidden rounded-xl bg-linear-to-br from-violet-600 via-purple-600 to-indigo-600 sm:h-60 lg:h-80">
          <img
            src={
              user?.coverImage ||
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80'
            }
            alt={`${user?.name} cover`}
            className="h-full w-full object-cover"
          />

          {/* Cover overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10" />
        </div>

        {/* PROFILE INFO */}
        <div className="relative z-10 -mt-14 flex flex-col gap-4 px-4 sm:-mt-10 sm:flex-row sm:items-end sm:justify-between">
          {/* Avatar + User Info */}
          <div className="flex flex-col items-start gap-3  sm:flex-row sm:items-end">
            {/* Profile Photo */}
            <div className="relative shrink-0">
              {/* Profile image with gradient border in dark mode */}
              <div className="h-28 w-28 rounded-full border border-white bg-white p-0.75 shadow-lg dark:border dark:bg-linear-to-br dark:from-cyan-300 dark:via-blue-300 dark:to-fuchsia-300">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name
                    )}&background=0ea5e9&color=fff&size=256`
                  }
                  alt={user?.name}
                  loading="lazy"
                  className="h-full w-full rounded-full object-cover dark:bg-gray-950"
                />
              </div>

              {/* Online indicator */}
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-950" />
            </div>

            {/* User Details */}
            <div className="pb-1 pl-1 sm:pl-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h1>

                <VerifiedBadge size={22} className="pt-2" />
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{user?.email}
              </p>
            </div>
          </div>

          {/* Edit Profile */}
          <Button
            variant="outline"
            className="w-fit gap-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700
          dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800
          dark:hover:text-white"
          >
            <Settings size={16} />
            Edit profile
          </Button>
        </div>
      </div>

      {/* BIO + DETAILS */}
      <div className="flex flex-col gap-3 px-1">
        <p className="text-[15px] text-gray-700 dark:text-gray-300">
          {user?.bio}
        </p>

        {/* User Details */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {user?.location || 'San Francisco, CA'}
          </span>

          <span className="flex items-center gap-1.5">
            <LinkIcon size={14} />
            {user?.website || 'pulse.app/you.here'}
          </span>

          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            Joined March 2023
          </span>
        </div>
      </div>

      {/* PROFILE TABS */}
      <div className="flex gap-1 border-b px-1 border-gray-200 dark:border-gray-800">
        {['posts', 'media', 'likes'].map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`relative px-4 py-3 text-sm font-medium capitalize transition-all duration-200 focus:outline-none
              ${
                tab === t
                  ? `
                text-violet-600
                dark:text-violet-400
              `
                  : `
                text-gray-500
                hover:text-gray-900
                dark:text-gray-400
                dark:hover:text-white
              `
              }
        `}
          >
            {t}

            {tab === t && (
              <motion.span
                layoutId="profile-tab-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-violet-600 dark:bg-violet-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* POSTS GRID */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
        {posts.map((p, i) => (
          <motion.img
            key={p.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: (i % 6) * 0.04
            }}
            src={p.image}
            alt=""
            loading="lazy"
            className="aspect-square w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        ))}
      </div>
    </div>
  )
}

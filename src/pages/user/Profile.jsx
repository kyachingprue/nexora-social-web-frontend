import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BriefcaseBusiness, Cake, CalendarDays, GraduationCap, Link as LinkIcon, MapPin, Settings, VenusAndMars } from "lucide-react";
import { posts } from '../../data/fakeData'
import useAuth from '../../hooks/useAuth'
import { VerifiedBadge } from "../../ui/verified-badge";
import { Button } from "../../ui/button";
import EditProfileModal from '../../components/profile/EditProfileModel';


export default function Profile() {
  const [tab, setTab] = useState("posts");
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const { user, loading } = useAuth()
  const [profileUser, setProfileUser] = useState(user)

  console.log('user information', user)
  useEffect(() => {
    if (user) {
      setProfileUser(user)
    }
  }, [user])

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
              profileUser?.coverImage ||
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80'
            }
            alt={`${profileUser?.name} cover`}
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
                    profileUser?.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profileUser?.name || ''
                    )}&background=0ea5e9&color=fff&size=256`
                  }
                  alt={profileUser?.name}
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
                @{profileUser?.username}
              </p>
            </div>
          </div>

          {/* Edit Profile */}
          <Button
            variant="outline"
            onClick={() => setEditProfileOpen(true)}
            className="w-fit gap-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <Settings size={16} />
            Edit profile
          </Button>
        </div>
      </div>

      {/* BIO + DETAILS */}
      <div className="flex flex-col gap-4 px-1">
        {/* Bio */}
        <p className="text-[15px] leading-6 text-gray-700 bg-gray-200 dark:bg-gray-800 rounded-xl p-2 dark:text-gray-300">
          {profileUser?.bio || 'No bio added yet.'}
        </p>

        {/* User Details */}
        <div className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
          {/* Location */}
          {profileUser?.location && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <MapPin
                size={15}
                className="shrink-0 text-gray-400 dark:text-gray-500"
              />
              <span className="truncate">{profileUser?.location}</span>
            </div>
          )}

          {/* Website */}
          {profileUser?.website && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <LinkIcon
                size={15}
                className="shrink-0 text-gray-400 dark:text-gray-500"
              />
              <a
                href={profileUser?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate transition-colors hover:text-blue-500"
              >
                {profileUser?.website}
              </a>
            </div>
          )}

          {/* Company */}
          {profileUser?.company && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <BriefcaseBusiness
                size={15}
                className="shrink-0 text-gray-400 dark:text-gray-500"
              />
              <span className="truncate">Works at {profileUser?.company}</span>
            </div>
          )}

          {/* Education */}
          {profileUser?.education && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <GraduationCap
                size={15}
                className="shrink-0 text-gray-400 dark:text-gray-500"
              />
              <span className="truncate">
                Studied at {profileUser?.education}
              </span>
            </div>
          )}

          {/* Birthday */}
          {profileUser?.birthday && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Cake
                size={15}
                className="shrink-0 text-gray-400 dark:text-gray-500"
              />
              <span>
                Born{' '}
                {new Date(profileUser.birthday).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}

          {/* Gender */}
          {profileUser?.gender && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <VenusAndMars
                size={15}
                className="shrink-0 text-gray-400 dark:text-gray-500"
              />
              <span>{profileUser?.gender}</span>
            </div>
          )}

          {/* Joined Date */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <CalendarDays
              size={15}
              className="shrink-0 text-gray-400 dark:text-gray-500"
            />
            <span>Joined March 2023</span>
          </div>
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
      <EditProfileModal
        user={profileUser}
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        onUpdated={updatedUser => {
          setProfileUser(updatedUser)
        }}
      />
    </div>
  )
}

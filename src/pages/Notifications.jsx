import { motion } from "motion/react";
import { notifications } from "../data/fakeData";
import { cn, timeAgo } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerifiedBadge } from "../ui/verified-badge";


export default function Notifications() {
  return (
    <div className="flex flex-col gap-4">
      {/* Page Title */}
      <h1 className=" font-display text-2xl font-bold text-gray-900 dark:text-white">
        Notifications
      </h1>

      {/* Notifications List */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm border-gray-200 dark:border-gray-800 dark:bg-gray-950">
        {notifications.map((n, i) => {
          return (
            <motion.div
              key={n.id}
              initial={{
                opacity: 0,
                x: -10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: i * 0.04
              }}
              className={cn(
                `flex items-center gap-3.5 border-b p-4 border-gray-200 transition-all duration-200 last:border-none hover:bg-gray-200 dark:border-gray-800 dark:hover:bg-gray-800`,
                !n.read && ` bg-violet-100/60 dark:bg-violet-950/30`
              )}
            >
              {/* Avatar + Notification Icon */}
              <div className="relative shrink-0">
                <Avatar className="h-11 w-11 ring-1 ring-gray-200 dark:ring-gray-700">
                  <AvatarImage src={n.user.avatar} alt={n.user.name} />
                  <AvatarFallback className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    {n.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Notification Text */}
              <p className="min-w-0 flex-1 text-sm text-gray-900 dark:text-gray-100">
                <div className="flex items-center">
                  <span className="font-semibold">{n.user.name}</span>
                  {n.user.verified && (
                    <VerifiedBadge
                      size={16}
                      className="mx-1 inline"
                    />
                  )}{' '}
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  {n.text}
                </span>
                <span className="ml-1.5 text-gray-500 dark:text-gray-400">
                  {timeAgo(n.createdAt)} ago
                </span>
              </p>

              {/* Unread Indicator */}
              {!n.read && (
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-violet-600 dark:bg-violet-400" />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

import { motion } from "motion/react";
import { Heart, UserPlus, MessageCircle, AtSign, Share2 } from "lucide-react";
import { notifications } from "../data/fakeData";
import { cn, timeAgo } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerifiedBadge } from "../ui/verified-badge";


const iconByType = {
  like: { icon: Heart, class: "text-accent bg-accent/10" },
  follow: { icon: UserPlus, class: "text-primary bg-primary/10" },
  comment: { icon: MessageCircle, class: "text-sky-500 bg-sky-500/10" },
  mention: { icon: AtSign, class: "text-amber-500 bg-amber-500/10" },
  share: { icon: Share2, class: "text-emerald-500 bg-emerald-500/10" },
};

export default function Notifications() {
  return (
    <div className="flex flex-col gap-4">
      {/* Page Title */}
      <h1
        className="
      font-display
      text-2xl
      font-bold

      text-gray-900

      dark:text-white
    "
      >
        Notifications
      </h1>

      {/* Notifications List */}
      <div
        className="
      overflow-hidden
      rounded-xl
      border
      bg-white
      shadow-sm

      border-gray-200

      dark:border-gray-800
      dark:bg-gray-950
    "
      >
        {notifications.map((n, i) => {
          const { icon: Icon, class: iconClass } = iconByType[n.type]

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
                `
              flex
              items-center
              gap-3.5
              border-b
              p-4

              border-gray-200

              transition-all
              duration-200

              last:border-none

              hover:bg-gray-100

              dark:border-gray-800
              dark:hover:bg-gray-800
            `,
                !n.read &&
                  `
                bg-violet-50/70

                dark:bg-violet-950/30
              `
              )}
            >
              {/* Avatar + Notification Icon */}
              <div className="relative shrink-0">
                <Avatar
                  className="
                h-11
                w-11

                ring-1
                ring-gray-200

                dark:ring-gray-700
              "
                >
                  <AvatarImage src={n.user.avatar} alt={n.user.name} />

                  <AvatarFallback
                    className="
                  bg-gray-100
                  text-gray-700

                  dark:bg-gray-800
                  dark:text-gray-200
                "
                  >
                    {n.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <span
                  className={cn(
                    `
                  absolute
                  -bottom-1
                  -right-1
                  grid
                  h-5
                  w-5
                  place-items-center
                  rounded-full

                  ring-2
                  ring-white

                  dark:ring-gray-950
                `,
                    iconClass
                  )}
                >
                  <Icon size={11} className="fill-current" />
                </span>
              </div>

              {/* Notification Text */}
              <p
                className="
              min-w-0
              flex-1
              text-sm
              text-gray-900

              dark:text-gray-100
            "
              >
                <span className="font-semibold">{n.user.name}</span>
                {n.user.verified && (
                  <VerifiedBadge
                    size={12}
                    className="
                  mx-1
                  inline
                  text-violet-600

                  dark:text-violet-400
                "
                  />
                )}{' '}
                <span
                  className="
                text-gray-700

                dark:text-gray-300
              "
                >
                  {n.text}
                </span>
                <span
                  className="
                ml-1.5
                text-gray-500

                dark:text-gray-400
              "
                >
                  {timeAgo(n.createdAt)} ago
                </span>
              </p>

              {/* Unread Indicator */}
              {!n.read && (
                <span
                  className="
                h-2.5
                w-2.5
                shrink-0
                rounded-full

                bg-violet-600

                dark:bg-violet-400
              "
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

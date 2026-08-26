import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { suggestions, trending } from "../data/fakeData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerifiedBadge } from "../ui/verified-badge";
import { formatCount } from "../lib/utils";
import { Button } from "../ui/button";


export default function RightSidebar() {
  const [followed, setFollowed] = useState({});

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-full max-w-76 flex-col gap-5 overflow-y-auto pb-8 xl:flex">
      {/* SUGGESTED FOR YOU */}
      <Card className="border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
            Suggested for you
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-1">
          {suggestions.map(u => (
            <div
              key={u.id}
              className="flex items-center gap-3">
              {/* Avatar */}
              <Avatar className="h-11 w-11 shrink-0 ring-1 ring-gray-200 text-blue-600 dark:ring-gray-700">
                <AvatarImage src={u.avatar} alt={u.name} />

                <AvatarFallback className="bg-gray-100 text-sm font-semibold
                text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                  {u.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {/* User information */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {u.name}
                  </p>

                  {u.verified && (
                    <VerifiedBadge
                      size={16}
                      className="pt-1"/>
                  )}
                </div>

                <p className="truncate text-xs text-gray-500 dark:text-gray-400"
                >
                  {formatCount(u.followers)} followers
                </p>
              </div>

              {/* Follow button */}
              <Button
                size="sm"
                variant={followed[u.id] ? 'secondary' : 'outline'}
                onClick={() =>
                  setFollowed(f => ({
                    ...f,
                    [u.id]: !f[u.id]
                  }))
                }
                className={
                  followed[u.id]
                    ? `
                  border-gray-200
                  bg-gray-100
                  text-gray-700
                  hover:bg-gray-200

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-200
                  dark:hover:bg-gray-700
                `
                    : `
                  border-gray-300
                  bg-transparent
                  text-gray-700
                  hover:bg-gray-100

                  dark:border-gray-700
                  dark:text-gray-300
                  dark:hover:bg-gray-800
                `
                }
              >
                {followed[u.id] ? 'Following' : 'Follow'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* TRENDING NOW */}
      <Card className="border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <TrendingUp
              size={17}
              className="text-violet-600 dark:text-violet-400"/>
            Trending now
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col pt-1">
          {trending.map((t, i) => (
            <motion.a
              href="#"
              key={t.id}
              whileHover={{ x: 4 }}
              className="-mx-2 flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {i + 1} · Trending
                </p>

                <p className="text-sm font-semibold text-violet-600 dark:text-violet-400"
                >
                  {t.tag}
                </p>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatCount(t.posts)} posts
              </p>
            </motion.a>
          ))}
        </CardContent>
      </Card>

      {/* FOOTER */}
      <p className="px-2 text-xs text-gray-500 dark:text-gray-400">
        © 2026 Pulse · Demo frontend for portfolio use
      </p>
    </aside>
  )
}

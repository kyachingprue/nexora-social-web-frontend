import { useState } from "react";
import { motion } from "motion/react";
import { Heart, MessageCircle } from "lucide-react";
import { posts, trending } from "../data/fakeData";
import { formatCount } from "../lib/utils";

export default function Explore() {
  const [active, setActive] = useState("all");
  const tabs = ["all", ...trending.map((t) => t.tag)];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
          Explore
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discover posts trending across Pulse right now.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {tabs.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
           ${
            active === tab
              ? `
                border-transparent
                bg-linear-to-r
                from-violet-600
                to-indigo-600
                text-white
                shadow-lg

                dark:from-violet-500
                dark:to-indigo-500
              `
              : `
                border-gray-200
                text-gray-500

                hover:bg-gray-100
                hover:text-gray-900

                dark:border-gray-800
                dark:text-gray-400

                dark:hover:bg-gray-800
                dark:hover:text-white
              `
          }
        `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
        {[...posts, ...posts].map((post, i) => (
          <motion.div
            key={`${post.id}-${i}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{
              once: true,
              margin: '-40px'
            }}
            transition={{
              duration: 0.3,
              delay: (i % 9) * 0.03
            }}
            className={`group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 ${i % 7 === 0 ? 'row-span-2' : ''}`}>
            {/* Post Image */}
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110
              ${i % 7 === 0 ? 'aspect-3/4' : 'aspect-square'}`}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-5 bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Heart size={18} className="fill-white" />

                {formatCount(post.likes)}
              </span>

              <span className="flex items-center gap-1.5 font-semibold text-white"
              >
                <MessageCircle size={18} className="fill-white" />

                {formatCount(post.comments)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

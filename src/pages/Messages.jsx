import { useState } from "react";
import { Send, Phone, Video, Info } from "lucide-react";
import { currentUser, users } from "../data/fakeData";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerifiedBadge } from "../ui/verified-badge";


const threads = users.slice(0, 6).map((u, i) => ({
  user: u,
  lastMessage: [
    "Sounds great, see you then!",
    "Just sent over the files",
    "Haha that's amazing 😂",
    "Can you resend that link?",
    "Thanks for the feedback!",
    "Let's catch up this weekend",
  ][i],
  unread: i < 2,
  time: ["2m", "1h", "3h", "1d", "2d", "4d"][i],
}));

const sampleThread = [
  { fromMe: false, text: "Hey! Did you see the new mockups?" },
  { fromMe: true, text: "Just opened them now, the nav looks so clean" },
  { fromMe: false, text: "Right?? The team really nailed the spacing this time" },
  { fromMe: true, text: "Sounds great, see you then!" },
];

export default function Messages() {
  const [active, setActive] = useState(threads[0]);
  const [draft, setDraft] = useState("");

  return (
    <div className="grid h-[calc(100vh-8.5rem)] grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 md:grid-cols-[20rem_1fr]">

      {/* THREAD LIST */}
      <div className="hidden flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-800 md:flex">
        <div className="p-4 pb-2">
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
            Messages
          </h2>
        </div>

        {threads.map(t => (
          <button
            key={t.user.id}
            type="button"
            onClick={() => setActive(t)}
            className={cn(`flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500`,
              active.user.id === t.user.id &&
                `
              bg-violet-50 dark:bg-violet-950/40
            `
            )}
          >
            {/* Avatar */}
            <Avatar className="h-11 w-11 shrink-0 ring-1 ring-gray-200 dark:ring-gray-700">
              <AvatarImage src={t.user.avatar} alt={t.user.name} />

              <AvatarFallback className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                {t.user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className=" truncate text-sm font-semibold text-gray-900 dark:text-white"
                >
                  {t.user.name}
                </span>

                <span
                  className="
                shrink-0
                text-[11px]
                text-gray-500

                dark:text-gray-400
              "
                >
                  {t.time}
                </span>
              </div>

              <p
                className={cn(
                  'truncate text-xs',
                  t.unread
                    ? `
                  font-semibold
                  text-gray-900

                  dark:text-white
                `
                    : `
                  text-gray-500

                  dark:text-gray-400
                `
                )}
              >
                {t.lastMessage}
              </p>
            </div>

            {/* Unread indicator */}
            {t.unread && (
              <span
                className="
              h-2
              w-2
              shrink-0
              rounded-full

              bg-violet-600

              dark:bg-violet-400
            "
              />
            )}
          </button>
        ))}
      </div>

      {/* ACTIVE CHAT */}
      <div
        className="
      flex
      min-w-0
      flex-col
      bg-white

      dark:bg-gray-950
    "
      >
        {/* Chat Header */}
        <div
          className="
        flex
        items-center
        gap-3
        border-b
        p-4

        border-gray-200

        dark:border-gray-800
      "
        >
          <Avatar
            className="
          h-10
          w-10
          ring-1
          ring-gray-200

          dark:ring-gray-700
        "
          >
            <AvatarImage src={active.user.avatar} alt={active.user.name} />

            <AvatarFallback
              className="
            bg-gray-100
            text-gray-700

            dark:bg-gray-800
            dark:text-gray-200
          "
            >
              {active.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p
                className="
              truncate
              text-sm
              font-semibold
              text-gray-900

              dark:text-white
            "
              >
                {active.user.name}
              </p>

              {active.user.verified && (
                <VerifiedBadge
                  size={12}
                  className="
                text-violet-600

                dark:text-violet-400
              "
                />
              )}
            </div>

            <p
              className="
            text-xs
            text-emerald-600

            dark:text-emerald-400
          "
            >
              Active now
            </p>
          </div>

          {/* Chat Actions */}
          <div
            className="
          flex
          items-center
          gap-1

          text-gray-500

          dark:text-gray-400
        "
          >
            <button
              type="button"
              className="
            grid
            h-9
            w-9
            place-items-center
            rounded-full
            transition-all

            hover:bg-gray-100
            hover:text-gray-900

            dark:hover:bg-gray-800
            dark:hover:text-white
          "
              aria-label="Call"
            >
              <Phone size={17} />
            </button>

            <button
              type="button"
              className="
            grid
            h-9
            w-9
            place-items-center
            rounded-full
            transition-all

            hover:bg-gray-100
            hover:text-gray-900

            dark:hover:bg-gray-800
            dark:hover:text-white
          "
              aria-label="Video call"
            >
              <Video size={17} />
            </button>

            <button
              type="button"
              className="
            grid
            h-9
            w-9
            place-items-center
            rounded-full
            transition-all

            hover:bg-gray-100
            hover:text-gray-900

            dark:hover:bg-gray-800
            dark:hover:text-white
          "
              aria-label="Information"
            >
              <Info size={17} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="
        flex-1
        space-y-3
        overflow-y-auto
        bg-white
        p-4

        dark:bg-gray-950
      "
        >
          {sampleThread.map((m, i) => (
            <div
              key={i}
              className={cn('flex', m.fromMe ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  `
                max-w-[75%]
                rounded-2xl
                px-4
                py-2.5
                text-sm
              `,
                  m.fromMe
                    ? `
                  bg-linear-to-r
                  from-violet-600
                  to-indigo-600
                  text-white

                  dark:from-violet-500
                  dark:to-indigo-500
                `
                    : `
                  bg-gray-100
                  text-gray-900

                  dark:bg-gray-800
                  dark:text-gray-100
                `
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div
          className="
        flex
        items-center
        gap-2
        border-t
        p-3

        border-gray-200
        bg-white

        dark:border-gray-800
        dark:bg-gray-950
      "
        >
          <Avatar
            className="
          h-8
          w-8
          shrink-0
        "
          >
            <AvatarImage src={currentUser.avatar} alt="you" />

            <AvatarFallback
              className="
            bg-gray-100
            text-xs
            font-semibold
            text-gray-700

            dark:bg-gray-800
            dark:text-gray-200
          "
            >
              YU
            </AvatarFallback>
          </Avatar>

          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder={`Message ${active.user.name.split(' ')[0]}...`}
            className="
          flex-1
          rounded-full
          border
          px-4
          py-2.5
          text-sm
          outline-none
          transition-all

          border-gray-200
          bg-gray-50
          text-gray-900

          placeholder:text-gray-400

          hover:border-gray-300

          focus:border-violet-500
          focus:bg-white
          focus:ring-2
          focus:ring-violet-500/10

          dark:border-gray-700
          dark:bg-gray-900
          dark:text-white

          dark:placeholder:text-gray-500

          dark:hover:border-gray-600

          dark:focus:border-violet-400
          dark:focus:bg-gray-900
          dark:focus:ring-violet-400/10
        "
          />

          <button
            type="button"
            disabled={!draft.trim()}
            onClick={() => setDraft('')}
            className="
          grid
          h-10
          w-10
          shrink-0
          place-items-center
          rounded-full

          bg-violet-600
          text-white

          transition-all
          duration-200

          hover:bg-violet-700
          hover:scale-105

          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-violet-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-white

          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:scale-100

          dark:bg-violet-500
          dark:hover:bg-violet-400
          dark:focus-visible:ring-offset-gray-950
        "
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

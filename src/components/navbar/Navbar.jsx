import { Link, useNavigate } from "react-router-dom";
import { Bell, MessageCircle, Search } from "lucide-react";
import socialIcon from "../../assets/social-media-logo.png";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { notifications } from "../../data/fakeData";
import useAuth from "../../hooks/useAuth";


export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("user data",user)
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/90 dark:rounded-lg">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4 lg:gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 transition-opacity"
        >
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-linear-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20">
            <img
              src={socialIcon}
              className="h-full w-full object-cover"
              alt="Nexora"
            />
          </span>

          <span className="hidden sm:block font-display text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Nexora
          </span>
        </Link>

        {/* Search */}
        <div className="relative hidden max-w-md flex-1 md:flex">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />

          <input
            type="text"
            placeholder="Search people, tags, posts..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:hover:border-gray-700 dark:focus:border-violet-400 dark:focus:bg-gray-900 dark:focus:ring-violet-400/10"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          {/* Messages */}
          <button
            type="button"
            onClick={() => navigate('/messages')}
            className="grid h-10 w-10 place-items-center rounded-full text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Messages"
          >
            <MessageCircle size={20} strokeWidth={1.8} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate('/notifications')}
            className="relative grid h-10 w-10 place-items-center rounded-full text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.8} />

            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-violet-500 ring-2 ring-white dark:bg-violet-400 dark:ring-gray-950" />
            )}
          </button>

          <ThemeToggle className="hidden sm:flex" />

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="rounded-full outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            aria-label="Open profile"
          >
            <Avatar className="h-9 w-9 ring-2 ring-gray-200 transition-all duration-200 hover:ring-violet-500 dark:ring-gray-700 dark:hover:ring-violet-400">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name
                  )}&background=0ea5e9&color=fff&size=256`
                }
                alt={user?.name}
                className="h-full w-full rounded-full object-cover dark:bg-gray-950"
              />

              <AvatarFallback className="bg-gray-100 text-gray-700 font-semibold dark:bg-gray-800 dark:text-gray-200">
                YU
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  )
}

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Flag,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Plus,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react'

/* =========================================================
   FAKE ADMIN DASHBOARD DATA
========================================================= */

const stats = [
  {
    title: 'Total Users',
    value: '48,392',
    change: '+12.8%',
    trend: 'up',
    icon: Users,
    description: 'vs last month'
  },
  {
    title: 'Active Users',
    value: '32,847',
    change: '+8.4%',
    trend: 'up',
    icon: UserCheck,
    description: 'vs last month'
  },
  {
    title: 'Total Posts',
    value: '126,584',
    change: '+18.2%',
    trend: 'up',
    icon: FileText,
    description: 'vs last month'
  },
  {
    title: 'Reports',
    value: '284',
    change: '-6.7%',
    trend: 'down',
    icon: Flag,
    description: 'vs last month'
  }
]

/* =========================================================
   USER GROWTH DATA
========================================================= */

const userGrowth = [
  { month: 'Jan', users: 18200 },
  { month: 'Feb', users: 21400 },
  { month: 'Mar', users: 23800 },
  { month: 'Apr', users: 27900 },
  { month: 'May', users: 31400 },
  { month: 'Jun', users: 34800 },
  { month: 'Jul', users: 39200 },
  { month: 'Aug', users: 44700 },
  { month: 'Sep', users: 48392 }
]

/* =========================================================
   ENGAGEMENT DATA
========================================================= */

const engagementData = [
  {
    label: 'Likes',
    value: '284.6K',
    percentage: 78,
    icon: Heart
  },
  {
    label: 'Comments',
    value: '84.2K',
    percentage: 58,
    icon: MessageCircle
  },
  {
    label: 'Shares',
    value: '42.8K',
    percentage: 42,
    icon: Activity
  },
  {
    label: 'Views',
    value: '1.24M',
    percentage: 91,
    icon: Eye
  }
]

/* =========================================================
   RECENT ACTIVITIES
========================================================= */

const recentActivities = [
  {
    id: 1,
    type: 'user',
    title: 'New user registered',
    description: 'Maya Wilson joined Nexora',
    time: '2 min ago',
    icon: UserPlus
  },
  {
    id: 2,
    type: 'post',
    title: 'New post published',
    description: 'Alex Morgan published a new post',
    time: '8 min ago',
    icon: FileText
  },
  {
    id: 3,
    type: 'report',
    title: 'Content reported',
    description: 'A post has been reported by users',
    time: '16 min ago',
    icon: Flag
  },
  {
    id: 4,
    type: 'user',
    title: 'User verified',
    description: 'Daniel Smith verified his email',
    time: '24 min ago',
    icon: CheckCircle2
  },
  {
    id: 5,
    type: 'comment',
    title: 'New comment',
    description: 'Sophia commented on a post',
    time: '31 min ago',
    icon: MessageCircle
  },
  {
    id: 6,
    type: 'security',
    title: 'Security alert',
    description: 'Multiple failed login attempts detected',
    time: '42 min ago',
    icon: ShieldAlert
  }
]

/* =========================================================
   NEW USERS
========================================================= */

const newUsers = [
  {
    id: 1,
    name: 'Maya Wilson',
    username: '@mayawilson',
    avatar: 'https://i.pravatar.cc/100?img=47',
    status: 'Active',
    joined: 'Today'
  },
  {
    id: 2,
    name: 'Daniel Smith',
    username: '@danielsmith',
    avatar: 'https://i.pravatar.cc/100?img=12',
    status: 'Active',
    joined: 'Today'
  },
  {
    id: 3,
    name: 'Sophia Carter',
    username: '@sophiacarter',
    avatar: 'https://i.pravatar.cc/100?img=32',
    status: 'Active',
    joined: 'Yesterday'
  },
  {
    id: 4,
    name: 'Ethan Miller',
    username: '@ethanmiller',
    avatar: 'https://i.pravatar.cc/100?img=11',
    status: 'Pending',
    joined: 'Yesterday'
  },
  {
    id: 5,
    name: 'Olivia Brown',
    username: '@oliviabrown',
    avatar: 'https://i.pravatar.cc/100?img=44',
    status: 'Active',
    joined: '2 days ago'
  }
]

/* =========================================================
   REPORTED POSTS
========================================================= */

const reportedPosts = [
  {
    id: 1,
    user: 'Chris Anderson',
    avatar: 'https://i.pravatar.cc/100?img=68',
    reason: 'Spam',
    reports: 18,
    time: '12 min ago'
  },
  {
    id: 2,
    user: 'Emma Johnson',
    avatar: 'https://i.pravatar.cc/100?img=49',
    reason: 'Harassment',
    reports: 12,
    time: '27 min ago'
  },
  {
    id: 3,
    user: 'James Wilson',
    avatar: 'https://i.pravatar.cc/100?img=53',
    reason: 'Misleading',
    reports: 9,
    time: '1 hour ago'
  }
]

/* =========================================================
   HELPERS
========================================================= */

const formatNumber = value => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }

  return value
}

/* =========================================================
   COMPONENT
========================================================= */

const AdminDashboard = () => {
  const maxUsers = Math.max(
    ...userGrowth.map(item => item.users)
  )

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#080b12] dark:text-white">

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 overflow-x-hidden">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-8">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles
                  size={17}
                  className="text-indigo-500"
                />

                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Nexora Administration
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Monitor your community, users and platform
                activity.
              </p>
            </div>

            {/* Header actions */}

            <div className="flex items-center gap-3">

              <button
                type="button"
                className="
                  hidden
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  shadow-sm
                  transition
                  hover:border-indigo-300
                  hover:text-indigo-600
                  dark:border-white/10
                  dark:bg-white/40
                  dark:hover:border-indigo-500/40
                  dark:hover:text-indigo-400
                  sm:flex
                "
              >
                <Clock3 size={17} />
                Last 30 days
              </button>

              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-indigo-500/20
                  transition
                  hover:bg-indigo-700
                "
              >
                <Plus size={17} />
                <span className="hidden sm:inline">
                  Create
                </span>
              </button>

              <button
                type="button"
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  transition
                  hover:text-indigo-600
                  dark:border-white/10
                  dark:bg-white/40
                  dark:text-slate-300
                  dark:hover:text-indigo-400
                "
              >
                <Bell size={18} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#080b12]" />
              </button>

            </div>

          </div>

        </header>

        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map(stat => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  dark:border-white/10
                  dark:bg-[#0d111a]
                  dark:hover:border-indigo-500/20
                "
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {stat.value}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:scale-105 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <Icon size={21} />
                  </div>

                </div>

                <div className="mt-5 flex items-center gap-2">

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      stat.trend === 'up'
                        ? 'text-emerald-500'
                        : 'text-red-500'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}

                    {stat.change}
                  </span>

                  <span className="text-xs text-slate-400">
                    {stat.description}
                  </span>

                </div>

              </div>
            )
          })}

        </section>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <section className="grid gap-6 xl:grid-cols-3">

          {/* ===================================================
              USER GROWTH
          =================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0d111a] xl:col-span-2">

            <div className="mb-7 flex items-start justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp
                    size={18}
                    className="text-indigo-500"
                  />

                  <h2 className="font-bold">
                    User Growth
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Total registered users over time
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
              >
                View report
                <ChevronRight size={14} />
              </button>

            </div>

            {/* Chart */}

            <div className="relative h-[280px]">

              {/* Grid lines */}

              <div className="absolute inset-0 flex flex-col justify-between">

                {[0, 1, 2, 3, 4].map(line => (
                  <div
                    key={line}
                    className="border-t border-dashed border-slate-200 dark:border-white/5"
                  />
                ))}

              </div>

              {/* Bars */}

              <div className="absolute inset-0 flex items-end justify-between gap-2 px-2 pt-5">

                {userGrowth.map(item => {
                  const height =
                    (item.users / maxUsers) * 100

                  return (
                    <div
                      key={item.month}
                      className="group flex h-full flex-1 flex-col items-center justify-end"
                    >

                      {/* Tooltip */}

                      <div className="mb-2 rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 dark:bg-white dark:text-slate-900">
                        {formatNumber(item.users)}
                      </div>

                      {/* Bar */}

                      <div
                        className="
                          relative
                          w-full
                          max-w-10
                          overflow-hidden
                          rounded-t-lg
                          bg-indigo-500
                          transition-all
                          duration-500
                          group-hover:bg-indigo-600
                          dark:bg-indigo-500/80
                          dark:group-hover:bg-indigo-400
                        "
                        style={{
                          height: `${height}%`
                        }}
                      >
                        <div className="absolute inset-x-0 top-0 h-8 bg-white/10" />
                      </div>

                      <span className="mt-3 text-[10px] font-medium text-slate-400">
                        {item.month}
                      </span>

                    </div>
                  )
                })}

              </div>

            </div>

            {/* Chart footer */}

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/5">

              <div>
                <p className="text-xs text-slate-400">
                  Current users
                </p>

                <p className="mt-1 text-lg font-bold">
                  48,392
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500">
                <ArrowUpRight size={15} />
                12.8% growth
              </div>

            </div>

          </div>

          {/* ===================================================
              ENGAGEMENT
          =================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0d111a]">

            <div className="mb-7">
              <div className="flex items-center gap-2">
                <BarChart3
                  size={18}
                  className="text-indigo-500"
                />

                <h2 className="font-bold">
                  Engagement
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Platform engagement overview
              </p>
            </div>

            <div className="space-y-6">

              {engagementData.map(item => {
                const Icon = item.icon

                return (
                  <div key={item.label}>

                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400">
                          <Icon size={15} />
                        </div>

                        <span className="text-sm font-medium">
                          {item.label}
                        </span>

                      </div>

                      <span className="text-sm font-bold">
                        {item.value}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">

                      <div
                        className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                        style={{
                          width: `${item.percentage}%`
                        }}
                      />

                    </div>

                  </div>
                )
              })}

            </div>

            <button
              type="button"
              className="mt-7 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-indigo-500/30 dark:hover:text-indigo-400"
            >
              View analytics
              <ChevronRight size={14} />
            </button>

          </div>

        </section>

        {/* =====================================================
            BOTTOM GRID
        ===================================================== */}

        <section className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">

          {/* ===================================================
              RECENT ACTIVITY
          =================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0d111a] xl:col-span-2">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <Activity
                    size={18}
                    className="text-indigo-500"
                  />

                  <h2 className="font-bold">
                    Recent Activity
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Latest activity across Nexora
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400"
              >
                View all
              </button>

            </div>

            <div className="space-y-1">

              {recentActivities.map(activity => {
                const Icon = activity.icon

                return (
                  <div
                    key={activity.id}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      p-3
                      transition
                      hover:bg-slate-50
                      dark:hover:bg-white/[0.03]
                    "
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-semibold">
                        {activity.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {activity.description}
                      </p>

                    </div>

                    <span className="shrink-0 text-[11px] text-slate-400">
                      {activity.time}
                    </span>

                    <button
                      type="button"
                      className="hidden text-slate-400 transition hover:text-slate-700 group-hover:block dark:hover:text-white"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                  </div>
                )
              })}

            </div>

          </div>

          {/* ===================================================
              NEW USERS
          =================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0d111a]">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <UserPlus
                    size={18}
                    className="text-indigo-500"
                  />

                  <h2 className="font-bold">
                    New Users
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Recently joined members
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400"
              >
                View all
              </button>

            </div>

            <div className="space-y-4">

              {newUsers.map(user => (
                <div
                  key={user.id}
                  className="flex items-center gap-3"
                >

                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-[#0d111a]"
                  />

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {user.username}
                    </p>

                  </div>

                  <div className="text-right">

                    <span
                      className={`text-[10px] font-bold ${
                        user.status === 'Active'
                          ? 'text-emerald-500'
                          : 'text-amber-500'
                      }`}
                    >
                      {user.status}
                    </span>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {user.joined}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-indigo-500/30 dark:hover:text-indigo-400"
            >
              Manage users
              <ChevronRight size={14} />
            </button>

          </div>

        </section>

        {/* =====================================================
            REPORTED CONTENT + QUICK ACTIONS
        ===================================================== */}

        <section className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* ===================================================
              REPORTED POSTS
          =================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0d111a] lg:col-span-2">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <ShieldAlert
                    size={18}
                    className="text-red-500"
                  />

                  <h2 className="font-bold">
                    Reported Content
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Content requiring moderation
                </p>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-500 dark:bg-red-500/10">
                284 pending
              </span>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[600px]">

                <thead>
                  <tr className="border-b border-slate-100 text-left dark:border-white/5">
                    <th className="pb-3 text-xs font-semibold text-slate-400">
                      User
                    </th>

                    <th className="pb-3 text-xs font-semibold text-slate-400">
                      Reason
                    </th>

                    <th className="pb-3 text-xs font-semibold text-slate-400">
                      Reports
                    </th>

                    <th className="pb-3 text-xs font-semibold text-slate-400">
                      Time
                    </th>

                    <th className="pb-3 text-right text-xs font-semibold text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {reportedPosts.map(post => (
                    <tr
                      key={post.id}
                      className="border-b border-slate-100 last:border-0 dark:border-white/5"
                    >

                      <td className="py-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={post.avatar}
                            alt={post.user}
                            className="h-9 w-9 rounded-full object-cover"
                          />

                          <span className="text-sm font-semibold">
                            {post.user}
                          </span>

                        </div>

                      </td>

                      <td className="py-4">

                        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                          {post.reason}
                        </span>

                      </td>

                      <td className="py-4 text-sm font-bold text-red-500">
                        {post.reports}
                      </td>

                      <td className="py-4 text-xs text-slate-400">
                        {post.time}
                      </td>

                      <td className="py-4 text-right">

                        <button
                          type="button"
                          className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
                        >
                          Review
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* ===================================================
              QUICK ACTIONS
          =================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0d111a]">

            <div className="mb-6">

              <div className="flex items-center gap-2">
                <Activity
                  size={18}
                  className="text-indigo-500"
                />

                <h2 className="font-bold">
                  Quick Actions
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Common administration tasks
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

              <button
                type="button"
                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-white/10 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/5"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <Users size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Manage Users
                  </p>

                  <p className="text-[11px] text-slate-400">
                    View and manage members
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className="text-slate-400 transition group-hover:translate-x-0.5"
                />

              </button>

              <button
                type="button"
                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-white/10 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/5"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                  <Flag size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Review Reports
                  </p>

                  <p className="text-[11px] text-slate-400">
                    284 reports need attention
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className="text-slate-400 transition group-hover:translate-x-0.5"
                />

              </button>

              <button
                type="button"
                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-white/10 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/5"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <UserCheck size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Verification
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Manage verification requests
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className="text-slate-400 transition group-hover:translate-x-0.5"
                />

              </button>

              <button
                type="button"
                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-white/10 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/5"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <BarChart3 size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Analytics
                  </p>

                  <p className="text-[11px] text-slate-400">
                    View platform insights
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className="text-slate-400 transition group-hover:translate-x-0.5"
                />

              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            FOOTER STATUS
        ===================================================== */}

        <div className="mt-6 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#0d111a] sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">

            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10">

              <Activity size={17} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0d111a]" />

            </div>

            <div>
              <p className="text-sm font-semibold">
                All systems operational
              </p>

              <p className="text-xs text-slate-400">
                Nexora platform is running normally
              </p>
            </div>

          </div>

          <p className="text-xs text-slate-400">
            Last updated just now
          </p>

        </div>

      </div>
    </main>
  )
}

export default AdminDashboard


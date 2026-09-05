import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Clock3,
  Eye,
  Globe2,
  Heart,
  Laptop,
  MessageCircle,
  MousePointerClick,
  PieChart,
  Smartphone,
  Tablet,
  TrendingUp,
  UserPlus,
  Users,
  Video,
  Share2,
  FileText,
  Search,
  RefreshCw,
  Zap
} from 'lucide-react'

/* =========================================================
   Fake Analytics Data
========================================================= */

const analyticsData = {
  overview: {
    totalUsers: 48392,
    activeUsers: 32847,
    newUsers: 4286,
    totalPosts: 126584,
    totalViews: 1240000,
    engagementRate: 8.74,
    totalLikes: 284600,
    totalComments: 84200,
    totalShares: 42800
  },

  userGrowth: [
    { month: 'Jan', users: 28420, newUsers: 2140 },
    { month: 'Feb', users: 30210, newUsers: 2360 },
    { month: 'Mar', users: 32780, newUsers: 2580 },
    { month: 'Apr', users: 35120, newUsers: 2740 },
    { month: 'May', users: 37480, newUsers: 2960 },
    { month: 'Jun', users: 40120, newUsers: 3210 },
    { month: 'Jul', users: 42860, newUsers: 3450 },
    { month: 'Aug', users: 45210, newUsers: 3810 },
    { month: 'Sep', users: 48392, newUsers: 4286 }
  ],

  engagement: [
    {
      label: 'Likes',
      value: 284600,
      percentage: 42,
      icon: Heart
    },
    {
      label: 'Comments',
      value: 84200,
      percentage: 22,
      icon: MessageCircle
    },
    {
      label: 'Shares',
      value: 42800,
      percentage: 14,
      icon: Share2
    },
    {
      label: 'Views',
      value: 1240000,
      percentage: 72,
      icon: Eye
    }
  ],

  weeklyActivity: [
    { day: 'Mon', posts: 1240, likes: 38200, comments: 11200 },
    { day: 'Tue', posts: 1480, likes: 42100, comments: 12600 },
    { day: 'Wed', posts: 1720, likes: 48600, comments: 14200 },
    { day: 'Thu', posts: 1940, likes: 52400, comments: 15800 },
    { day: 'Fri', posts: 2280, likes: 61200, comments: 18600 },
    { day: 'Sat', posts: 2640, likes: 72800, comments: 21400 },
    { day: 'Sun', posts: 2380, likes: 68400, comments: 20200 }
  ],

  trafficSources: [
    {
      name: 'Direct',
      value: 38,
      visitors: '482.4K'
    },
    {
      name: 'Google Search',
      value: 26,
      visitors: '330.2K'
    },
    {
      name: 'Social Media',
      value: 18,
      visitors: '228.6K'
    },
    {
      name: 'Referral',
      value: 11,
      visitors: '139.8K'
    },
    {
      name: 'Other',
      value: 7,
      visitors: '88.9K'
    }
  ],

  devices: [
    {
      name: 'Mobile',
      percentage: 64,
      users: '31.1K',
      icon: Smartphone
    },
    {
      name: 'Desktop',
      percentage: 27,
      users: '13.1K',
      icon: Laptop
    },
    {
      name: 'Tablet',
      percentage: 9,
      users: '4.3K',
      icon: Tablet
    }
  ],

  activityHours: [
    { time: '12 AM', value: 12 },
    { time: '2 AM', value: 8 },
    { time: '4 AM', value: 5 },
    { time: '6 AM', value: 14 },
    { time: '8 AM', value: 26 },
    { time: '10 AM', value: 42 },
    { time: '12 PM', value: 58 },
    { time: '2 PM', value: 67 },
    { time: '4 PM', value: 74 },
    { time: '6 PM', value: 88 },
    { time: '8 PM', value: 96 },
    { time: '10 PM', value: 82 }
  ],

  topPosts: [
    {
      id: 'POST-94821',
      author: 'Sophie Anderson',
      username: '@sophie.dev',
      content: 'Just shipped my first production-ready React application 🚀',
      type: 'Text',
      views: '284.6K',
      likes: '42.8K',
      comments: '8.4K',
      shares: '4.2K',
      engagement: '19.4%',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    {
      id: 'POST-94182',
      author: 'Daniel Carter',
      username: '@daniel.carter',
      content:
        'The future of web development is going to be incredibly exciting.',
      type: 'Image',
      views: '218.2K',
      likes: '36.4K',
      comments: '7.2K',
      shares: '3.8K',
      engagement: '17.8%',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 'POST-93742',
      author: 'Emma Wilson',
      username: '@emma.codes',
      content: '10 JavaScript tricks every frontend developer should know.',
      type: 'Text',
      views: '196.8K',
      likes: '31.6K',
      comments: '6.9K',
      shares: '3.1K',
      engagement: '16.9%',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    {
      id: 'POST-92514',
      author: 'Alex Morgan',
      username: '@alexmorgan',
      content:
        'Weekend hiking trip 🌄 Sometimes the best reset is disconnecting.',
      type: 'Image',
      views: '174.4K',
      likes: '28.7K',
      comments: '5.8K',
      shares: '2.9K',
      engagement: '15.7%',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    {
      id: 'POST-91843',
      author: 'Michael Lee',
      username: '@mikelee',
      content: 'Building a scalable Node.js backend from scratch.',
      type: 'Video',
      views: '158.7K',
      likes: '24.2K',
      comments: '5.1K',
      shares: '2.4K',
      engagement: '14.8%',
      avatar: 'https://i.pravatar.cc/150?img=11'
    }
  ]
}

/* =========================================================
   Helpers
========================================================= */

const formatNumber = number => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(2)}M`
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`
  }

  return number.toLocaleString()
}

/* =========================================================
   Stat Card
========================================================= */

const StatCard = ({
  title,
  value,
  change,
  description,
  icon: Icon,
  positive = true
}) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-transform duration-300 group-hover:scale-110 dark:bg-slate-800 dark:text-slate-200">
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            positive
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
          }`}
        >
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}

          {change}
        </span>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </div>
    </div>
  )
}

/* =========================================================
   Section Header
========================================================= */

const SectionHeader = ({ title, description, icon: Icon, action }) => {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <Icon size={19} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {action}
    </div>
  )
}

/* =========================================================
   Main Component
========================================================= */

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState('Last 30 days')
  const [search, setSearch] = useState('')
  const [selectedMetric, setSelectedMetric] = useState('users')

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return analyticsData.topPosts
    }

    return analyticsData.topPosts.filter(
      post =>
        post.author.toLowerCase().includes(query) ||
        post.username.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.id.toLowerCase().includes(query)
    )
  }, [search])

  const maxUsers = Math.max(...analyticsData.userGrowth.map(item => item.users))

  const maxActivity = Math.max(
    ...analyticsData.weeklyActivity.map(item => item.likes)
  )

  const maxHourActivity = Math.max(
    ...analyticsData.activityHours.map(item => item.value)
  )

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px]">
        {/* =================================================
            Header
        ================================================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <BarChart3 size={18} />
              </div>

              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Nexora Admin
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Monitor user growth, engagement, content performance and platform
              activity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <div className="relative">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={dateRange}
                onChange={e => setDateRange(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-slate-600"
              >
                <option>Today</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* =================================================
            Overview Stats
        ================================================= */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Users"
            value={formatNumber(analyticsData.overview.totalUsers)}
            change="+12.8%"
            description="vs previous period"
            icon={Users}
          />

          <StatCard
            title="Active Users"
            value={formatNumber(analyticsData.overview.activeUsers)}
            change="+8.4%"
            description="vs previous period"
            icon={Activity}
          />

          <StatCard
            title="New Users"
            value={formatNumber(analyticsData.overview.newUsers)}
            change="+16.2%"
            description="this period"
            icon={UserPlus}
          />

          <StatCard
            title="Engagement Rate"
            value={`${analyticsData.overview.engagementRate}%`}
            change="+2.6%"
            description="vs previous period"
            icon={TrendingUp}
          />
        </div>

        {/* =================================================
            User Growth + Traffic
        ================================================= */}

        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* User Growth */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader
              title="User Growth"
              description={`Monthly growth overview • ${dateRange}`}
              icon={TrendingUp}
              action={
                <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                  <button
                    onClick={() => setSelectedMetric('users')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      selectedMetric === 'users'
                        ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Users
                  </button>

                  <button
                    onClick={() => setSelectedMetric('newUsers')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      selectedMetric === 'newUsers'
                        ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    New
                  </button>
                </div>
              }
            />

            <div className="flex h-75 items-end gap-2 overflow-hidden pt-6 sm:gap-4">
              {analyticsData.userGrowth.map(item => {
                const value =
                  selectedMetric === 'users' ? item.users : item.newUsers

                const height =
                  selectedMetric === 'users'
                    ? (value / maxUsers) * 100
                    : (value / 4500) * 100

                return (
                  <div
                    key={item.month}
                    className="group flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="relative flex h-full w-full items-end justify-center">
                      <div
                        className="w-full max-w-11.5 rounded-t-xl bg-slate-900 transition-all duration-500 group-hover:opacity-80 dark:bg-slate-200"
                        style={{
                          height: `${Math.max(height, 4)}%`
                        }}
                      />

                      <div className="absolute bottom-full mb-2 hidden rounded-lg bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg group-hover:block dark:bg-white dark:text-slate-900">
                        {formatNumber(value)}
                      </div>
                    </div>

                    <span className="text-[11px] font-medium text-slate-400">
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Current total users
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  48,392
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight size={15} />
                <span>12.8% growth</span>
              </div>
            </div>
          </div>

          {/* Traffic Sources */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader
              title="Traffic Sources"
              description="Where your users come from"
              icon={Globe2}
            />

            <div className="space-y-5">
              {analyticsData.trafficSources.map(source => (
                <div key={source.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {source.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {source.visitors} visitors
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {source.value}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-slate-900 transition-all duration-700 dark:bg-slate-200"
                      style={{
                        width: `${source.value}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-xl border border-dashed border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <MousePointerClick size={18} className="text-slate-500" />

                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    1.27M total visitors
                  </p>

                  <p className="text-xs text-slate-400">
                    Across all acquisition channels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            Engagement
        ================================================= */}

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Engagement Metrics */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader
              title="Engagement Overview"
              description="How users interact with content"
              icon={Heart}
            />

            <div className="grid grid-cols-2 gap-4">
              {analyticsData.engagement.map(item => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-100 p-4 transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        <Icon size={17} />
                      </div>

                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        +{item.percentage}%
                      </span>
                    </div>

                    <p className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                      {formatNumber(item.value)}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Device Breakdown */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader
              title="Device Breakdown"
              description="Users by device type"
              icon={Laptop}
            />

            <div className="space-y-6">
              {analyticsData.devices.map(device => {
                const Icon = device.icon

                return (
                  <div key={device.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          <Icon size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-white">
                            {device.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {device.users} users
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {device.percentage}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-slate-900 transition-all duration-700 dark:bg-slate-200"
                        style={{
                          width: `${device.percentage}%`
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <Smartphone size={17} className="text-slate-500" />

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Mobile dominates traffic
                </span>
              </div>

              <span className="text-sm font-bold text-slate-900 dark:text-white">
                64%
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            Weekly Activity
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <SectionHeader
            title="Weekly Activity"
            description="Likes and publishing activity across the week"
            icon={Activity}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex h-70 items-end gap-3 sm:gap-6">
                {analyticsData.weeklyActivity.map(item => {
                  const height = (item.likes / maxActivity) * 100

                  return (
                    <div
                      key={item.day}
                      className="group flex h-full flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div className="relative flex h-full w-full items-end justify-center">
                        <div
                          className="w-full max-w-12 rounded-t-xl bg-slate-900 transition-all duration-500 group-hover:opacity-75 dark:bg-slate-200"
                          style={{
                            height: `${Math.max(height, 5)}%`
                          }}
                        />

                        <div className="absolute bottom-full mb-2 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-medium text-white group-hover:block dark:bg-white dark:text-slate-900">
                          {formatNumber(item.likes)} likes
                        </div>
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        {item.day}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={17} className="text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Posts
                    </span>
                  </div>

                  <span className="font-bold text-slate-900 dark:text-white">
                    13.7K
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart size={17} className="text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Likes
                    </span>
                  </div>

                  <span className="font-bold text-slate-900 dark:text-white">
                    371.7K
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={17} className="text-slate-500" />

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Comments
                    </span>
                  </div>

                  <span className="font-bold text-slate-900 dark:text-white">
                    110.0K
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            Peak Activity Hours
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <SectionHeader
            title="Peak Activity Hours"
            description="When Nexora users are most active"
            icon={Clock3}
          />

          <div className="flex h-57.5 items-end gap-2 overflow-x-auto pb-1 sm:gap-3">
            {analyticsData.activityHours.map(item => {
              const height = (item.value / maxHourActivity) * 100

              return (
                <div
                  key={item.time}
                  className="group flex h-full min-w-10.5 flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="relative flex h-full w-full items-end justify-center">
                    <div
                      className="w-full max-w-7.5 rounded-t-lg bg-slate-900 transition-all duration-500 group-hover:opacity-75 dark:bg-slate-200"
                      style={{
                        height: `${Math.max(height, 5)}%`
                      }}
                    />

                    <div className="absolute bottom-full mb-2 hidden rounded-lg bg-slate-900 px-2 py-1 text-[10px] text-white group-hover:block dark:bg-white dark:text-slate-900">
                      {item.value}%
                    </div>
                  </div>

                  <span className="whitespace-nowrap text-[10px] font-medium text-slate-400">
                    {item.time}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
            <Zap size={15} />

            <span>
              Peak engagement usually occurs between{' '}
              <strong className="text-slate-800 dark:text-white">
                6 PM – 10 PM
              </strong>
            </span>
          </div>
        </div>

        {/* =================================================
            Top Performing Posts
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 p-5 dark:border-slate-800">
            <SectionHeader
              title="Top Performing Posts"
              description="Content with the highest engagement"
              icon={PieChart}
              action={
                <div className="relative w-full sm:w-64">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-slate-600"
                  />
                </div>
              }
            />
          </div>

          {/* Desktop Table */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-225">
              <thead>
                <tr className="border-b border-slate-100 text-left dark:border-slate-800">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Post
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Type
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Views
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Likes
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Comments
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Shares
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Engagement
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPosts.map(post => (
                  <tr
                    key={post.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex min-w-70 items-center gap-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="h-10 w-10 rounded-full object-cover"
                        />

                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 dark:text-white">
                            {post.author}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                            {post.content}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {post.id} • {post.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {post.type === 'Video' ? (
                          <Video size={12} />
                        ) : (
                          <FileText size={12} />
                        )}

                        {post.type}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                      {post.views}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                      {post.likes}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                      {post.comments}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                      {post.shares}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {post.engagement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}

          <div className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">
            {filteredPosts.map(post => (
              <div key={post.id} className="p-5">
                <div className="flex items-start gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white">
                          {post.author}
                        </p>

                        <p className="text-xs text-slate-400">
                          {post.username}
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        {post.engagement}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {post.content}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                        <p className="text-[10px] text-slate-400">Views</p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                          {post.views}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                        <p className="text-[10px] text-slate-400">Likes</p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                          {post.likes}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                        <p className="text-[10px] text-slate-400">Comments</p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                          {post.comments}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                        <p className="text-[10px] text-slate-400">Shares</p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                          {post.shares}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}

          {filteredPosts.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Search size={20} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                No posts found
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try searching with another keyword.
              </p>
            </div>
          )}
        </div>

        {/* =================================================
            Footer Summary
        ================================================= */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs text-slate-400">Total Posts</p>

            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              126.6K
            </p>

            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              +18.2% this month
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs text-slate-400">Total Views</p>

            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              1.24M
            </p>

            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              +24.7% this month
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs text-slate-400">Total Engagement</p>

            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              411.6K
            </p>

            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              +14.3% this month
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics

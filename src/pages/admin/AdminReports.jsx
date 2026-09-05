import { useMemo, useState } from 'react'
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flag,
  Clock3,
  ShieldAlert,
  User,
  MessageSquareWarning,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  FileText,
  UserRound,
  CircleDot
} from 'lucide-react'

/* =========================================================
   Fake Reports Data
========================================================= */

const reportsData = [
  {
    id: 'RPT-1001',
    reporter: {
      name: 'Daniel Smith',
      username: 'danielsmith',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    reportedUser: {
      name: 'Michael Brown',
      username: 'michaelb',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    postId: 'POST-58291',
    postContent:
      'This post contains content that several members of the community found inappropriate and against our platform guidelines.',
    reason: 'Harassment',
    description:
      'The reported user repeatedly targeted other members in the comments and used offensive language.',
    status: 'Pending',
    priority: 'High',
    reportsCount: 8,
    createdAt: 'Sep 2, 2026',
    time: '11:42 AM'
  },
  {
    id: 'RPT-1002',
    reporter: {
      name: 'Emma Davis',
      username: 'emmadavis',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    reportedUser: {
      name: 'James Anderson',
      username: 'jamesanderson',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },
    postId: 'POST-58274',
    postContent:
      'Check out this amazing opportunity! You can make thousands of dollars every day with almost no effort.',
    reason: 'Spam',
    description:
      'This account has posted similar promotional content across multiple groups and feeds.',
    status: 'Reviewing',
    priority: 'Medium',
    reportsCount: 5,
    createdAt: 'Sep 2, 2026',
    time: '09:17 AM'
  },
  {
    id: 'RPT-1003',
    reporter: {
      name: 'Olivia Wilson',
      username: 'oliviawilson',
      avatar: 'https://i.pravatar.cc/150?img=44'
    },
    reportedUser: {
      name: 'Benjamin Harris',
      username: 'benharris',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    postId: 'POST-58198',
    postContent:
      'You should all stop using this platform. I know where some of you live and you will regret ignoring me.',
    reason: 'Threats',
    description:
      'The reporter believes this post contains a direct threat toward other Nexora users.',
    status: 'Pending',
    priority: 'Critical',
    reportsCount: 21,
    createdAt: 'Sep 1, 2026',
    time: '07:34 PM'
  },
  {
    id: 'RPT-1004',
    reporter: {
      name: 'Ava Martinez',
      username: 'avamartinez',
      avatar: 'https://i.pravatar.cc/150?img=49'
    },
    reportedUser: {
      name: 'William Taylor',
      username: 'willtaylor',
      avatar: 'https://i.pravatar.cc/150?img=15'
    },
    postId: 'POST-58144',
    postContent:
      'A discussion about recent design trends and how social platforms can improve their user experience.',
    reason: 'Other',
    description:
      'The reporter says the post is misleading, but the moderation team did not find a clear policy violation yet.',
    status: 'Dismissed',
    priority: 'Low',
    reportsCount: 1,
    createdAt: 'Aug 31, 2026',
    time: '04:12 PM'
  },
  {
    id: 'RPT-1005',
    reporter: {
      name: 'Sophia Williams',
      username: 'sophiaw',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    reportedUser: {
      name: 'Alex Johnson',
      username: 'alexjohnson',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    postId: 'POST-58092',
    postContent:
      'Learn JavaScript faster with these practical techniques and beginner-friendly examples.',
    reason: 'Misinformation',
    description:
      'The reporter claims that some technical information in this post is incorrect.',
    status: 'Resolved',
    priority: 'Medium',
    reportsCount: 3,
    createdAt: 'Aug 30, 2026',
    time: '02:45 PM'
  },
  {
    id: 'RPT-1006',
    reporter: {
      name: 'Lucas Martin',
      username: 'lucasmartin',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    reportedUser: {
      name: 'Ethan Moore',
      username: 'ethanmoore',
      avatar: 'https://i.pravatar.cc/150?img=57'
    },
    postId: 'POST-58043',
    postContent:
      'Someone is pretending to be a popular developer and using their identity to promote unrelated products.',
    reason: 'Impersonation',
    description:
      'The reporter believes the account is impersonating another developer.',
    status: 'Pending',
    priority: 'High',
    reportsCount: 7,
    createdAt: 'Aug 29, 2026',
    time: '10:18 AM'
  },
  {
    id: 'RPT-1007',
    reporter: {
      name: 'Mia Jackson',
      username: 'miajackson',
      avatar: 'https://i.pravatar.cc/150?img=48'
    },
    reportedUser: {
      name: 'Henry Lewis',
      username: 'henrylewis',
      avatar: 'https://i.pravatar.cc/150?img=60'
    },
    postId: 'POST-57981',
    postContent:
      'This post contains a repeated promotional link that appears to be posted automatically.',
    reason: 'Spam',
    description:
      'Multiple users reported receiving the same promotional message from this account.',
    status: 'Resolved',
    priority: 'Medium',
    reportsCount: 11,
    createdAt: 'Aug 28, 2026',
    time: '08:53 PM'
  },
  {
    id: 'RPT-1008',
    reporter: {
      name: 'Charlotte Lee',
      username: 'charlottelee',
      avatar: 'https://i.pravatar.cc/150?img=38'
    },
    reportedUser: {
      name: 'Benjamin Harris',
      username: 'benharris',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    postId: 'POST-57932',
    postContent:
      'A post containing aggressive comments and targeted insults toward another Nexora member.',
    reason: 'Hate Speech',
    description:
      'The reporter believes the content targets a protected group and violates community standards.',
    status: 'Reviewing',
    priority: 'Critical',
    reportsCount: 17,
    createdAt: 'Aug 27, 2026',
    time: '06:28 PM'
  },
  {
    id: 'RPT-1009',
    reporter: {
      name: 'Isabella Thomas',
      username: 'isabellathomas',
      avatar: 'https://i.pravatar.cc/150?img=45'
    },
    reportedUser: {
      name: 'James Anderson',
      username: 'jamesanderson',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },
    postId: 'POST-57894',
    postContent:
      'Click this link to claim your free reward before the offer expires tonight.',
    reason: 'Scam',
    description:
      'The post redirects users to an external website asking for personal information.',
    status: 'Pending',
    priority: 'High',
    reportsCount: 13,
    createdAt: 'Aug 26, 2026',
    time: '01:21 PM'
  },
  {
    id: 'RPT-1010',
    reporter: {
      name: 'Amelia Clark',
      username: 'ameliac',
      avatar: 'https://i.pravatar.cc/150?img=25'
    },
    reportedUser: {
      name: 'Alex Johnson',
      username: 'alexjohnson',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    postId: 'POST-57841',
    postContent:
      'My new React project is finally live! Huge thanks to everyone who helped me during development.',
    reason: 'Other',
    description:
      'The reporter mistakenly submitted this report and confirmed there is no policy violation.',
    status: 'Dismissed',
    priority: 'Low',
    reportsCount: 1,
    createdAt: 'Aug 25, 2026',
    time: '09:44 AM'
  },
  {
    id: 'RPT-1011',
    reporter: {
      name: 'William Taylor',
      username: 'willtaylor',
      avatar: 'https://i.pravatar.cc/150?img=15'
    },
    reportedUser: {
      name: 'Michael Brown',
      username: 'michaelb',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    postId: 'POST-57784',
    postContent:
      'A promotional post claiming that users can double their investment in a very short period.',
    reason: 'Scam',
    description:
      'Several users reported this post as a potentially fraudulent investment promotion.',
    status: 'Reviewing',
    priority: 'Critical',
    reportsCount: 24,
    createdAt: 'Aug 24, 2026',
    time: '05:37 PM'
  },
  {
    id: 'RPT-1012',
    reporter: {
      name: 'Daniel Smith',
      username: 'danielsmith',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    reportedUser: {
      name: 'Olivia Wilson',
      username: 'oliviawilson',
      avatar: 'https://i.pravatar.cc/150?img=44'
    },
    postId: 'POST-57713',
    postContent:
      'A personal opinion about productivity tools and different ways to organize your daily workflow.',
    reason: 'Other',
    description: 'The report was reviewed and no violation was found.',
    status: 'Resolved',
    priority: 'Low',
    reportsCount: 2,
    createdAt: 'Aug 23, 2026',
    time: '11:19 AM'
  }
]

/* =========================================================
   Status Styles
========================================================= */

const statusStyles = {
  Pending:
    'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',

  Reviewing:
    'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',

  Resolved:
    'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',

  Dismissed:
    'border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-300'
}

const priorityStyles = {
  Critical: 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400',

  High: 'border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400',

  Medium:
    'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',

  Low: 'border-slate-500/20 bg-slate-500/10 text-slate-500 dark:text-slate-400'
}

/* =========================================================
   Stat Card
========================================================= */

function StatCard({ icon: Icon, title, value, description, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   User Mini Avatar
========================================================= */

function UserAvatar({ user, size = 'h-10 w-10' }) {
  return (
    <img
      src={user.avatar}
      alt={user.name}
      className={`${size} shrink-0 rounded-full object-cover`}
    />
  )
}

/* =========================================================
   Report Details Modal
========================================================= */

function ReportDetailsModal({ report, onClose }) {
  if (!report) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={event => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
              <Flag size={17} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Report Details
              </h2>

              <p className="text-xs text-slate-400">{report.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[report.status]}`}
              >
                <CircleDot size={12} />
                {report.status}
              </span>

              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles[report.priority]}`}
              >
                {report.priority} Priority
              </span>
            </div>

            <span className="text-xs text-slate-400">
              {report.reportsCount} total reports
            </span>
          </div>

          {/* Reporter / Reported */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="mb-3 flex items-center gap-2">
                <UserRound size={15} className="text-blue-500" />

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Reported By
                </p>
              </div>

              <div className="flex items-center gap-3">
                <UserAvatar user={report.reporter} size="h-10 w-10" />

                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {report.reporter.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    @{report.reporter.username}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="mb-3 flex items-center gap-2">
                <ShieldAlert size={15} className="text-red-500" />

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Reported User
                </p>
              </div>

              <div className="flex items-center gap-3">
                <UserAvatar user={report.reportedUser} size="h-10 w-10" />

                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {report.reportedUser.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    @{report.reportedUser.username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="rounded-2xl border border-red-500/15 bg-red-500/5 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={17} className="text-red-500" />

              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Report Reason
              </p>
            </div>

            <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-400">
              {report.reason}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {report.description}
            </p>
          </div>

          {/* Reported Post */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Reported Post
                </h3>
              </div>

              <span className="text-xs text-slate-400">{report.postId}</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                {report.postContent}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <CalendarDays size={16} className="text-slate-400" />

              <div>
                <p className="text-xs text-slate-400">Reported At</p>

                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {report.createdAt} • {report.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <MessageSquareWarning size={16} className="text-slate-400" />

              <div>
                <p className="text-xs text-slate-400">Community Reports</p>

                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {report.reportsCount} reports
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end dark:border-slate-800">
          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
            <ExternalLink size={16} />
            Open Post
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   Main Component
========================================================= */

export default function AdminReports() {
  const [reports, setReports] = useState(reportsData)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [reasonFilter, setReasonFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const [openMenu, setOpenMenu] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)

  const reportsPerPage = 8

  /* =========================================================
     Statistics
  ========================================================= */

  const totalReports = reports.length

  const pendingReports = reports.filter(
    report => report.status === 'Pending'
  ).length

  const reviewingReports = reports.filter(
    report => report.status === 'Reviewing'
  ).length

  const resolvedReports = reports.filter(
    report => report.status === 'Resolved' || report.status === 'Dismissed'
  ).length

  /* =========================================================
     Filters
  ========================================================= */

  const reasons = useMemo(() => {
    return ['All', ...new Set(reports.map(report => report.reason))]
  }, [reports])

  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low']

  /* =========================================================
     Search + Filter
  ========================================================= */

  const filteredReports = useMemo(() => {
    const query = search.toLowerCase().trim()

    return reports.filter(report => {
      const matchesSearch =
        !query ||
        report.id.toLowerCase().includes(query) ||
        report.reason.toLowerCase().includes(query) ||
        report.postId.toLowerCase().includes(query) ||
        report.postContent.toLowerCase().includes(query) ||
        report.reporter.name.toLowerCase().includes(query) ||
        report.reporter.username.toLowerCase().includes(query) ||
        report.reportedUser.name.toLowerCase().includes(query) ||
        report.reportedUser.username.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All' || report.status === statusFilter

      const matchesReason =
        reasonFilter === 'All' || report.reason === reasonFilter

      const matchesPriority =
        priorityFilter === 'All' || report.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesReason && matchesPriority
    })
  }, [reports, search, statusFilter, reasonFilter, priorityFilter])

  /* =========================================================
     Pagination
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / reportsPerPage)
  )

  const visibleReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  )

  /* =========================================================
     Handlers
  ========================================================= */

  const resetFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setReasonFilter('All')
    setPriorityFilter('All')
    setCurrentPage(1)
  }

  const handleSearch = value => {
    setSearch(value)
    setCurrentPage(1)
  }

  const updateReportStatus = (id, status) => {
    setReports(currentReports =>
      currentReports.map(report =>
        report.id === id
          ? {
              ...report,
              status
            }
          : report
      )
    )

    setOpenMenu(null)
  }

  const deleteReport = id => {
    const report = reports.find(item => item.id === id)

    if (!report) return

    const confirmed = window.confirm(
      `Are you sure you want to delete report ${report.id}?`
    )

    if (!confirmed) return

    setReports(currentReports => currentReports.filter(item => item.id !== id))

    setOpenMenu(null)
  }

  /* =========================================================
     Render
  ========================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* ===================================================
            Header
        =================================================== */}

        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                <Flag size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Reports
                </h1>

                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Review and manage community reports.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <ShieldAlert size={17} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Moderation Center</p>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {pendingReports} reports need attention
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            Stats
        =================================================== */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Flag}
            title="Total Reports"
            value={totalReports.toLocaleString()}
            description="All submitted reports"
            iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          />

          <StatCard
            icon={Clock3}
            title="Pending"
            value={pendingReports.toLocaleString()}
            description="Waiting for review"
            iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          />

          <StatCard
            icon={ShieldAlert}
            title="Reviewing"
            value={reviewingReports.toLocaleString()}
            description="Currently being reviewed"
            iconClass="bg-violet-500/10 text-violet-600 dark:text-violet-400"
          />

          <StatCard
            icon={CheckCircle2}
            title="Completed"
            value={resolvedReports.toLocaleString()}
            description="Resolved or dismissed"
            iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          />
        </div>

        {/* ===================================================
            Main Card
        =================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Toolbar */}
          <div className="border-b border-slate-200/80 p-4 dark:border-slate-800 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={event => handleSearch(event.target.value)}
                  placeholder="Search reports, users or posts..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div className="relative">
                  <Filter
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={statusFilter}
                    onChange={event => {
                      setStatusFilter(event.target.value)
                      setCurrentPage(1)
                    }}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-36"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Dismissed">Dismissed</option>
                  </select>
                </div>

                <select
                  value={reasonFilter}
                  onChange={event => {
                    setReasonFilter(event.target.value)
                    setCurrentPage(1)
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-40"
                >
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>
                      {reason === 'All' ? 'All Reasons' : reason}
                    </option>
                  ))}
                </select>

                <select
                  value={priorityFilter}
                  onChange={event => {
                    setPriorityFilter(event.target.value)
                    setCurrentPage(1)
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-36"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === 'All' ? 'All Priority' : priority}
                    </option>
                  ))}
                </select>

                {(search ||
                  statusFilter !== 'All' ||
                  reasonFilter !== 'All' ||
                  priorityFilter !== 'All') && (
                  <button
                    onClick={resetFilters}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <X size={15} />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Result */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {filteredReports.length}
                </span>{' '}
                reports
              </p>

              <p className="hidden text-xs text-slate-400 sm:block">
                {reports.length.toLocaleString()} total reports
              </p>
            </div>
          </div>

          {/* =================================================
              Desktop Table
          ================================================= */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-300">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/30">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Report
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Reported User
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Reason
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Priority
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Created
                  </th>

                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleReports.map(report => (
                  <tr
                    key={report.id}
                    className="group border-b border-slate-100 transition hover:bg-slate-50/70 dark:border-slate-800/80 dark:hover:bg-slate-800/30"
                  >
                    {/* Report */}
                    <td className="max-w-102.5 px-5 py-4">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                          <Flag size={17} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {report.id}
                            </p>

                            {report.reportsCount > 10 && (
                              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-500">
                                {report.reportsCount} reports
                              </span>
                            )}
                          </div>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            {report.postContent}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Post: {report.postId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Reported User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <UserAvatar user={report.reportedUser} size="h-9 w-9" />

                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {report.reportedUser.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            @{report.reportedUser.username}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <User size={12} />
                        Reported by {report.reporter.name}
                      </div>
                    </td>

                    {/* Reason */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        <MessageSquareWarning size={13} />
                        {report.reason}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles[report.priority]}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {report.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[report.status]}`}
                      >
                        {report.status === 'Pending' && <Clock3 size={12} />}

                        {report.status === 'Reviewing' && (
                          <ShieldAlert size={12} />
                        )}

                        {report.status === 'Resolved' && (
                          <CheckCircle2 size={12} />
                        )}

                        {report.status === 'Dismissed' && <XCircle size={12} />}

                        {report.status}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {report.createdAt}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {report.time}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === report.id ? null : report.id)
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {openMenu === report.id && (
                        <div className="absolute right-5 top-14 z-30 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl dark:border-slate-700 dark:bg-slate-800">
                          {/* View */}
                          <button
                            onClick={() => {
                              setSelectedReport(report)
                              setOpenMenu(null)
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            <Eye size={16} />
                            View Report
                          </button>

                          {/* Start Review */}
                          {report.status === 'Pending' && (
                            <button
                              onClick={() =>
                                updateReportStatus(report.id, 'Reviewing')
                              }
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                            >
                              <ShieldAlert size={16} />
                              Start Review
                            </button>
                          )}

                          {/* Resolve */}
                          {(report.status === 'Pending' ||
                            report.status === 'Reviewing') && (
                            <button
                              onClick={() =>
                                updateReportStatus(report.id, 'Resolved')
                              }
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-emerald-600 transition hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                            >
                              <CheckCircle2 size={16} />
                              Resolve Report
                            </button>
                          )}

                          {/* Dismiss */}
                          {(report.status === 'Pending' ||
                            report.status === 'Reviewing') && (
                            <button
                              onClick={() =>
                                updateReportStatus(report.id, 'Dismissed')
                              }
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                              <XCircle size={16} />
                              Dismiss Report
                            </button>
                          )}

                          <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                          {/* Delete */}
                          <button
                            onClick={() => deleteReport(report.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                            Delete Report
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =================================================
              Mobile Cards
          ================================================= */}

          <div className="divide-y divide-slate-100 dark:divide-slate-800 lg:hidden">
            {visibleReports.map(report => (
              <div
                key={report.id}
                className="p-4 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30 sm:p-5"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                      <Flag size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {report.id}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {report.postId}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === report.id ? null : report.id)
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                {/* Content */}
                <div className="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                  <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {report.postContent}
                  </p>
                </div>

                {/* Users */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                    <UserAvatar user={report.reporter} size="h-9 w-9" />

                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-400">Reported by</p>

                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {report.reporter.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-red-500/10 p-3">
                    <UserAvatar user={report.reportedUser} size="h-9 w-9" />

                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-400">
                        Reported user
                      </p>

                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {report.reportedUser.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <MessageSquareWarning size={12} />
                    {report.reason}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles[report.priority]}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {report.priority}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[report.status]}`}
                  >
                    {report.status}
                  </span>
                </div>

                {/* Date */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <CalendarDays size={13} />
                  {report.createdAt} • {report.time}
                  <span className="ml-auto">{report.reportsCount} reports</span>
                </div>

                {/* Mobile Actions */}
                {openMenu === report.id && (
                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setSelectedReport(report)
                        setOpenMenu(null)
                      }}
                      className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <Eye size={14} />
                      View
                    </button>

                    {report.status === 'Pending' && (
                      <button
                        onClick={() =>
                          updateReportStatus(report.id, 'Reviewing')
                        }
                        className="flex items-center justify-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400"
                      >
                        <ShieldAlert size={14} />
                        Review
                      </button>
                    )}

                    {(report.status === 'Pending' ||
                      report.status === 'Reviewing') && (
                      <>
                        <button
                          onClick={() =>
                            updateReportStatus(report.id, 'Resolved')
                          }
                          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                        >
                          <CheckCircle2 size={14} />
                          Resolve
                        </button>

                        <button
                          onClick={() =>
                            updateReportStatus(report.id, 'Dismissed')
                          }
                          className="flex items-center justify-center gap-2 rounded-lg bg-slate-500/10 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
                        >
                          <XCircle size={14} />
                          Dismiss
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => deleteReport(report.id)}
                      className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* =================================================
              Empty State
          ================================================= */}

          {visibleReports.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Flag size={28} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                No reports found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or filter options to find the reports
                you're looking for.
              </p>

              <button
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* =================================================
              Pagination
          ================================================= */}

          {filteredReports.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-200/80 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Page{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {currentPage}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`hidden h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition sm:flex ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <span className="flex h-9 min-w-9 items-center justify-center rounded-lg text-xs text-slate-400 sm:hidden">
                  {currentPage}/{totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage(page => Math.min(totalPages, page + 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Nexora Admin • Reports & Moderation</p>

          <p>Moderation system active</p>
        </div>
      </div>

      {/* Report Details Modal */}
      <ReportDetailsModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  )
}

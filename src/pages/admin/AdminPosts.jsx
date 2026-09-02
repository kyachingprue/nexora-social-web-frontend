import { useMemo, useState } from 'react'
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  CalendarDays,
  Flag,
  ExternalLink,
  Image as ImageIcon,
  Video
} from 'lucide-react'

/* =========================================================
   Fake Posts Data
========================================================= */

const postsData = [
  {
    id: 1,
    author: {
      name: 'Alex Johnson',
      username: 'alexjohnson',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    content:
      'Just finished building my new React dashboard! The combination of TypeScript, Tailwind CSS and Framer Motion makes frontend development so much fun. 🚀',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80'
    },
    likes: 284,
    comments: 42,
    shares: 18,
    views: 4821,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Technology',
    createdAt: 'Sep 2, 2026',
    time: '10:42 AM'
  },
  {
    id: 2,
    author: {
      name: 'Sophia Williams',
      username: 'sophiaw',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    content:
      'Beautiful sunset from London today. Sometimes you just need to stop working for a few minutes and enjoy the view. 🌅',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80'
    },
    likes: 842,
    comments: 76,
    shares: 54,
    views: 12842,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Photography',
    createdAt: 'Sep 2, 2026',
    time: '09:18 AM'
  },
  {
    id: 3,
    author: {
      name: 'Daniel Smith',
      username: 'danielsmith',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    content:
      'Here are 5 JavaScript concepts every frontend developer should understand before moving into advanced React development.',
    media: null,
    likes: 421,
    comments: 91,
    shares: 63,
    views: 9632,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Education',
    createdAt: 'Sep 1, 2026',
    time: '07:32 PM'
  },
  {
    id: 4,
    author: {
      name: 'Emma Davis',
      username: 'emmadavis',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    content:
      "I can't believe how quickly this year is going. Feeling grateful for all the amazing people I've met along the way. ❤️",
    media: null,
    likes: 176,
    comments: 28,
    shares: 12,
    views: 3214,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Lifestyle',
    createdAt: 'Sep 1, 2026',
    time: '03:21 PM'
  },
  {
    id: 5,
    author: {
      name: 'Michael Brown',
      username: 'michaelb',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    content:
      'This post has received several reports from the community. Please review the content carefully before taking further action.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'
    },
    likes: 31,
    comments: 14,
    shares: 4,
    views: 1842,
    status: 'Published',
    reportStatus: 'Reported',
    reports: 8,
    category: 'Technology',
    createdAt: 'Aug 31, 2026',
    time: '11:42 AM'
  },
  {
    id: 6,
    author: {
      name: 'Olivia Wilson',
      username: 'oliviawilson',
      avatar: 'https://i.pravatar.cc/150?img=44'
    },
    content:
      "Working remotely has completely changed how I organize my day. Here's my simple productivity routine that keeps me focused.",
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80'
    },
    likes: 623,
    comments: 58,
    shares: 31,
    views: 8472,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Productivity',
    createdAt: 'Aug 30, 2026',
    time: '08:15 AM'
  },
  {
    id: 7,
    author: {
      name: 'James Anderson',
      username: 'jamesanderson',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },
    content:
      'This post is currently hidden because it was flagged by multiple users and is under admin review.',
    media: null,
    likes: 12,
    comments: 7,
    shares: 1,
    views: 842,
    status: 'Hidden',
    reportStatus: 'Reported',
    reports: 14,
    category: 'General',
    createdAt: 'Aug 29, 2026',
    time: '06:43 PM'
  },
  {
    id: 8,
    author: {
      name: 'Ava Martinez',
      username: 'avamartinez',
      avatar: 'https://i.pravatar.cc/150?img=49'
    },
    content:
      'Exploring new places, meeting new people and creating memories. Madrid has been incredible! ✈️',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80'
    },
    likes: 934,
    comments: 103,
    shares: 81,
    views: 16342,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Travel',
    createdAt: 'Aug 28, 2026',
    time: '02:37 PM'
  },
  {
    id: 9,
    author: {
      name: 'William Taylor',
      username: 'willtaylor',
      avatar: 'https://i.pravatar.cc/150?img=15'
    },
    content:
      'A quick look at my latest UI design experiment. Trying to keep interfaces simple, accessible and enjoyable to use.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80'
    },
    likes: 512,
    comments: 64,
    shares: 39,
    views: 7248,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Design',
    createdAt: 'Aug 27, 2026',
    time: '05:52 PM'
  },
  {
    id: 10,
    author: {
      name: 'Isabella Thomas',
      username: 'isabellathomas',
      avatar: 'https://i.pravatar.cc/150?img=45'
    },
    content:
      'Sharing some thoughts about building a healthy relationship with social media and maintaining a balanced digital life.',
    media: null,
    likes: 287,
    comments: 82,
    shares: 42,
    views: 5318,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Lifestyle',
    createdAt: 'Aug 26, 2026',
    time: '01:24 PM'
  },
  {
    id: 11,
    author: {
      name: 'Ethan Moore',
      username: 'ethanmoore',
      avatar: 'https://i.pravatar.cc/150?img=57'
    },
    content:
      "New project announcement! I'm working on an open-source developer tool that should make API testing much easier.",
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80'
    },
    likes: 716,
    comments: 87,
    shares: 74,
    views: 11428,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Technology',
    createdAt: 'Aug 25, 2026',
    time: '09:46 AM'
  },
  {
    id: 12,
    author: {
      name: 'Mia Jackson',
      username: 'miajackson',
      avatar: 'https://i.pravatar.cc/150?img=48'
    },
    content:
      'Weekend food adventure! Tried a new restaurant and the experience was absolutely amazing. 🍜',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80'
    },
    likes: 364,
    comments: 51,
    shares: 19,
    views: 6284,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Food',
    createdAt: 'Aug 24, 2026',
    time: '07:18 PM'
  },
  {
    id: 13,
    author: {
      name: 'Lucas Martin',
      username: 'lucasmartin',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    content:
      "Sometimes the best ideas come when you take a step away from the screen. Don't forget to take breaks.",
    media: null,
    likes: 241,
    comments: 32,
    shares: 17,
    views: 3921,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Productivity',
    createdAt: 'Aug 23, 2026',
    time: '04:51 PM'
  },
  {
    id: 14,
    author: {
      name: 'Charlotte Lee',
      username: 'charlottelee',
      avatar: 'https://i.pravatar.cc/150?img=38'
    },
    content:
      'Seoul at night feels completely different. The lights, food and energy are something everyone should experience at least once.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1538485399081-7c897fdd8c4c?auto=format&fit=crop&w=900&q=80'
    },
    likes: 1128,
    comments: 126,
    shares: 94,
    views: 18942,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Travel',
    createdAt: 'Aug 22, 2026',
    time: '08:36 PM'
  },
  {
    id: 15,
    author: {
      name: 'Benjamin Harris',
      username: 'benharris',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    content:
      'This content has been flagged for violating Nexora community guidelines.',
    media: null,
    likes: 9,
    comments: 3,
    shares: 0,
    views: 528,
    status: 'Hidden',
    reportStatus: 'Reported',
    reports: 21,
    category: 'General',
    createdAt: 'Aug 21, 2026',
    time: '12:17 PM'
  },
  {
    id: 16,
    author: {
      name: 'Amelia Clark',
      username: 'ameliac',
      avatar: 'https://i.pravatar.cc/150?img=25'
    },
    content:
      "Learning something new every day. Today I'm diving deeper into PostgreSQL and database optimization.",
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'
    },
    likes: 453,
    comments: 47,
    shares: 28,
    views: 6742,
    status: 'Published',
    reportStatus: 'Clean',
    reports: 0,
    category: 'Education',
    createdAt: 'Aug 20, 2026',
    time: '10:11 AM'
  }
]

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
   Post Preview Modal
========================================================= */

function PostPreviewModal({ post, onClose }) {
  if (!post) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={event => event.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-500" />

            <h2 className="font-bold text-slate-900 dark:text-white">
              Post Details
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 px-5 pt-5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {post.author.name}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              @{post.author.username}
            </p>
          </div>

          <div className="ml-auto">
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                post.status === 'Published'
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400'
              }`}
            >
              {post.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          <p className="whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">
            {post.content}
          </p>

          {/* Media */}
          {post.media && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              {post.media.type === 'image' ? (
                <img
                  src={post.media.url}
                  alt="Post media"
                  className="max-h-[420px] w-full object-cover"
                />
              ) : (
                <div className="flex h-72 items-center justify-center bg-slate-900">
                  <Video size={42} className="text-white/70" />
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
              <Heart size={16} className="text-red-500" />

              <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                {post.likes.toLocaleString()}
              </p>

              <p className="text-xs text-slate-400">Likes</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
              <MessageCircle size={16} className="text-blue-500" />

              <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                {post.comments.toLocaleString()}
              </p>

              <p className="text-xs text-slate-400">Comments</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
              <Share2 size={16} className="text-violet-500" />

              <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                {post.shares.toLocaleString()}
              </p>

              <p className="text-xs text-slate-400">Shares</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70">
              <Eye size={16} className="text-emerald-500" />

              <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                {post.views.toLocaleString()}
              </p>

              <p className="text-xs text-slate-400">Views</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-5 space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays size={16} className="text-slate-400" />

              <span className="text-slate-600 dark:text-slate-300">
                {post.createdAt} at {post.time}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Flag size={16} className="text-slate-400" />

              <span className="text-slate-600 dark:text-slate-300">
                {post.reports} community reports
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FileText size={16} className="text-slate-400" />

              <span className="text-slate-600 dark:text-slate-300">
                Category: {post.category}
              </span>
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

export default function AdminPosts() {
  const [posts, setPosts] = useState(postsData)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [reportFilter, setReportFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [openMenu, setOpenMenu] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 8

  /* =========================================================
     Statistics
  ========================================================= */

  const totalPosts = posts.length

  const publishedPosts = posts.filter(
    post => post.status === 'Published'
  ).length

  const hiddenPosts = posts.filter(post => post.status === 'Hidden').length

  const reportedPosts = posts.filter(
    post => post.reportStatus === 'Reported'
  ).length

  /* =========================================================
     Categories
  ========================================================= */

  const categories = useMemo(() => {
    return ['All', ...new Set(posts.map(post => post.category))]
  }, [posts])

  /* =========================================================
     Filtering
  ========================================================= */

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase().trim()

    return posts.filter(post => {
      const matchesSearch =
        !query ||
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.author.username.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All' || post.status === statusFilter

      const matchesReport =
        reportFilter === 'All' ||
        (reportFilter === 'Reported'
          ? post.reportStatus === 'Reported'
          : post.reportStatus === 'Clean')

      const matchesCategory =
        categoryFilter === 'All' || post.category === categoryFilter

      return matchesSearch && matchesStatus && matchesReport && matchesCategory
    })
  }, [posts, search, statusFilter, reportFilter, categoryFilter])

  /* =========================================================
     Pagination
  ========================================================= */

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage))

  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  /* =========================================================
     Handlers
  ========================================================= */

  const resetFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setReportFilter('All')
    setCategoryFilter('All')
    setCurrentPage(1)
  }

  const handleSearch = value => {
    setSearch(value)
    setCurrentPage(1)
  }

  const togglePostStatus = id => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === id
          ? {
              ...post,
              status: post.status === 'Published' ? 'Hidden' : 'Published'
            }
          : post
      )
    )

    setOpenMenu(null)
  }

  const deletePost = id => {
    const post = posts.find(item => item.id === id)

    if (!post) return

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete this post by ${post.author.name}?`
    )

    if (!confirmed) return

    setPosts(currentPosts => currentPosts.filter(item => item.id !== id))

    setOpenMenu(null)
  }

  const markReportClean = id => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === id
          ? {
              ...post,
              reportStatus: 'Clean',
              reports: 0
            }
          : post
      )
    )

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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <FileText size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Posts
                </h1>

                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Manage, review and moderate all Nexora posts.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
            <ActivityIcon />

            <div>
              <p className="text-xs text-slate-400">Content status</p>

              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Moderation Active
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            Stats
        =================================================== */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FileText}
            title="Total Posts"
            value={totalPosts.toLocaleString()}
            description="+18.2% from last month"
            iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          />

          <StatCard
            icon={CheckCircle2}
            title="Published"
            value={publishedPosts.toLocaleString()}
            description="Publicly visible posts"
            iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          />

          <StatCard
            icon={EyeOff}
            title="Hidden"
            value={hiddenPosts.toLocaleString()}
            description="Currently hidden posts"
            iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          />

          <StatCard
            icon={AlertTriangle}
            title="Reported"
            value={reportedPosts.toLocaleString()}
            description="Need moderation review"
            iconClass="bg-red-500/10 text-red-600 dark:text-red-400"
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
                  placeholder="Search posts, users or content..."
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
                    <option value="Published">Published</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </div>

                <select
                  value={reportFilter}
                  onChange={event => {
                    setReportFilter(event.target.value)
                    setCurrentPage(1)
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-36"
                >
                  <option value="All">All Reports</option>
                  <option value="Reported">Reported</option>
                  <option value="Clean">Clean</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={event => {
                    setCategoryFilter(event.target.value)
                    setCurrentPage(1)
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-40"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'All' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                {(search ||
                  statusFilter !== 'All' ||
                  reportFilter !== 'All' ||
                  categoryFilter !== 'All') && (
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

            {/* Result count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {filteredPosts.length}
                </span>{' '}
                posts
              </p>

              <p className="hidden text-xs text-slate-400 sm:block">
                {posts.length.toLocaleString()} total posts
              </p>
            </div>
          </div>

          {/* =================================================
              Desktop Table
          ================================================= */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1150px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/30">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Post
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Engagement
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Reports
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Category
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
                {visiblePosts.map(post => (
                  <tr
                    key={post.id}
                    className="group border-b border-slate-100 transition hover:bg-slate-50/70 dark:border-slate-800/80 dark:hover:bg-slate-800/30"
                  >
                    {/* Post */}
                    <td className="max-w-[460px] px-5 py-4">
                      <div className="flex gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {post.author.name}
                            </p>

                            {post.media && (
                              <span className="text-slate-400">
                                {post.media.type === 'image' ? (
                                  <ImageIcon size={13} />
                                ) : (
                                  <Video size={13} />
                                )}
                              </span>
                            )}
                          </div>

                          <p className="mt-0.5 text-xs text-slate-400">
                            @{post.author.username}
                          </p>

                          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
                            {post.content}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Engagement */}
                    <td className="px-5 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Heart size={13} className="text-red-500" />
                            {post.likes.toLocaleString()}
                          </span>

                          <span className="flex items-center gap-1">
                            <MessageCircle
                              size={13}
                              className="text-blue-500"
                            />
                            {post.comments.toLocaleString()}
                          </span>

                          <span className="flex items-center gap-1">
                            <Share2 size={13} className="text-violet-500" />
                            {post.shares.toLocaleString()}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400">
                          {post.views.toLocaleString()} views
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                          post.status === 'Published'
                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {post.status}
                      </span>
                    </td>

                    {/* Reports */}
                    <td className="px-5 py-4">
                      {post.reportStatus === 'Reported' ? (
                        <div>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
                            <AlertTriangle size={13} />
                            {post.reports} Reports
                          </span>

                          <p className="mt-1 text-[11px] text-red-500">
                            Needs review
                          </p>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 size={14} />
                          Clean
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {post.category}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {post.createdAt}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {post.time}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === post.id ? null : post.id)
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {openMenu === post.id && (
                        <div className="absolute right-5 top-14 z-30 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl dark:border-slate-700 dark:bg-slate-800">
                          <button
                            onClick={() => {
                              setSelectedPost(post)
                              setOpenMenu(null)
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            <Eye size={16} />
                            View Post
                          </button>

                          <button
                            onClick={() => togglePostStatus(post.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            {post.status === 'Published' ? (
                              <>
                                <EyeOff size={16} className="text-amber-500" />
                                Hide Post
                              </>
                            ) : (
                              <>
                                <CheckCircle2
                                  size={16}
                                  className="text-emerald-500"
                                />
                                Publish Post
                              </>
                            )}
                          </button>

                          {post.reportStatus === 'Reported' && (
                            <button
                              onClick={() => markReportClean(post.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-emerald-500"
                              />
                              Mark as Clean
                            </button>
                          )}

                          <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                          <button
                            onClick={() => deletePost(post.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                            Delete Post
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
            {visiblePosts.map(post => (
              <div
                key={post.id}
                className="p-4 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30 sm:p-5"
              >
                {/* Author */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {post.author.name}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        @{post.author.username}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === post.id ? null : post.id)
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                {/* Content */}
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {post.content}
                </p>

                {/* Image */}
                {post.media?.type === 'image' && (
                  <div className="mt-4 overflow-hidden rounded-xl">
                    <img
                      src={post.media.url}
                      alt="Post"
                      className="h-48 w-full object-cover sm:h-64"
                    />
                  </div>
                )}

                {/* Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      post.status === 'Published'
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {post.status}
                  </span>

                  <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {post.category}
                  </span>

                  {post.reportStatus === 'Reported' && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
                      <AlertTriangle size={12} />
                      {post.reports} Reports
                    </span>
                  )}
                </div>

                {/* Engagement */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Heart size={14} className="text-red-500" />
                    {post.likes.toLocaleString()}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={14} className="text-blue-500" />
                    {post.comments.toLocaleString()}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Share2 size={14} className="text-violet-500" />
                    {post.shares.toLocaleString()}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Eye size={14} className="text-emerald-500" />
                    {post.views.toLocaleString()}
                  </span>
                </div>

                {/* Date */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <CalendarDays size={13} />
                  {post.createdAt} • {post.time}
                </div>

                {/* Mobile action menu */}
                {openMenu === post.id && (
                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setSelectedPost(post)
                        setOpenMenu(null)
                      }}
                      className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <Eye size={14} />
                      View
                    </button>

                    <button
                      onClick={() => togglePostStatus(post.id)}
                      className="flex items-center justify-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400"
                    >
                      {post.status === 'Published' ? (
                        <>
                          <EyeOff size={14} />
                          Hide
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={14} />
                          Publish
                        </>
                      )}
                    </button>

                    {post.reportStatus === 'Reported' && (
                      <button
                        onClick={() => markReportClean(post.id)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2 size={14} />
                        Clean
                      </button>
                    )}

                    <button
                      onClick={() => deletePost(post.id)}
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

          {visiblePosts.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <FileText size={28} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                No posts found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or filter options to find the posts
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

          {filteredPosts.length > 0 && (
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
          <p>Nexora Admin • Content Management</p>

          <p>Last updated just now</p>
        </div>
      </div>

      {/* Post Details Modal */}
      <PostPreviewModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  )
}

/* =========================================================
   Small Activity Icon
========================================================= */

function ActivityIcon() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
      <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500/40" />
      <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
    </div>
  )
}

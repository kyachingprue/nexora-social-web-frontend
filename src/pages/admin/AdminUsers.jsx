import { useMemo, useState } from 'react'
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit3,
  Trash2,
  UserX,
  UserCheck,
  Shield,
  ShieldCheck,
  Users,
  UserPlus,
  Activity,
  Ban,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  CalendarDays,
  MapPin,
  ExternalLink
} from 'lucide-react'

const usersData = [
  {
    id: 1,
    name: 'Alex Johnson',
    username: 'alexjohnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'User',
    status: 'Active',
    location: 'New York, USA',
    joined: 'Jan 12, 2026',
    posts: 284,
    followers: 1842,
    following: 421,
    lastActive: '2 min ago'
  },
  {
    id: 2,
    name: 'Sophia Williams',
    username: 'sophiaw',
    email: 'sophia.williams@example.com',
    avatar: 'https://i.pravatar.cc/150?img=47',
    role: 'Moderator',
    status: 'Active',
    location: 'London, UK',
    joined: 'Feb 04, 2026',
    posts: 492,
    followers: 3284,
    following: 618,
    lastActive: '5 min ago'
  },
  {
    id: 3,
    name: 'Daniel Smith',
    username: 'danielsmith',
    email: 'daniel.smith@example.com',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'User',
    status: 'Active',
    location: 'Toronto, Canada',
    joined: 'Feb 18, 2026',
    posts: 128,
    followers: 924,
    following: 284,
    lastActive: '12 min ago'
  },
  {
    id: 4,
    name: 'Emma Davis',
    username: 'emmadavis',
    email: 'emma.davis@example.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
    role: 'User',
    status: 'Inactive',
    location: 'Sydney, Australia',
    joined: 'Mar 01, 2026',
    posts: 76,
    followers: 642,
    following: 193,
    lastActive: '2 days ago'
  },
  {
    id: 5,
    name: 'Michael Brown',
    username: 'michaelb',
    email: 'michael.brown@example.com',
    avatar: 'https://i.pravatar.cc/150?img=68',
    role: 'Admin',
    status: 'Active',
    location: 'San Francisco, USA',
    joined: 'Mar 15, 2026',
    posts: 631,
    followers: 6248,
    following: 874,
    lastActive: '1 min ago'
  },
  {
    id: 6,
    name: 'Olivia Wilson',
    username: 'oliviawilson',
    email: 'olivia.wilson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=44',
    role: 'User',
    status: 'Active',
    location: 'Berlin, Germany',
    joined: 'Mar 27, 2026',
    posts: 214,
    followers: 1532,
    following: 346,
    lastActive: '18 min ago'
  },
  {
    id: 7,
    name: 'James Anderson',
    username: 'jamesanderson',
    email: 'james.anderson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=13',
    role: 'User',
    status: 'Suspended',
    location: 'Chicago, USA',
    joined: 'Apr 08, 2026',
    posts: 98,
    followers: 421,
    following: 231,
    lastActive: '4 days ago'
  },
  {
    id: 8,
    name: 'Ava Martinez',
    username: 'avamartinez',
    email: 'ava.martinez@example.com',
    avatar: 'https://i.pravatar.cc/150?img=49',
    role: 'Moderator',
    status: 'Active',
    location: 'Madrid, Spain',
    joined: 'Apr 21, 2026',
    posts: 347,
    followers: 2941,
    following: 512,
    lastActive: '7 min ago'
  },
  {
    id: 9,
    name: 'William Taylor',
    username: 'willtaylor',
    email: 'william.taylor@example.com',
    avatar: 'https://i.pravatar.cc/150?img=15',
    role: 'User',
    status: 'Active',
    location: 'Melbourne, Australia',
    joined: 'May 03, 2026',
    posts: 184,
    followers: 1128,
    following: 391,
    lastActive: '24 min ago'
  },
  {
    id: 10,
    name: 'Isabella Thomas',
    username: 'isabellathomas',
    email: 'isabella.thomas@example.com',
    avatar: 'https://i.pravatar.cc/150?img=45',
    role: 'User',
    status: 'Inactive',
    location: 'Paris, France',
    joined: 'May 16, 2026',
    posts: 63,
    followers: 584,
    following: 207,
    lastActive: '1 week ago'
  },
  {
    id: 11,
    name: 'Ethan Moore',
    username: 'ethanmoore',
    email: 'ethan.moore@example.com',
    avatar: 'https://i.pravatar.cc/150?img=57',
    role: 'User',
    status: 'Active',
    location: 'Vancouver, Canada',
    joined: 'May 29, 2026',
    posts: 241,
    followers: 1874,
    following: 438,
    lastActive: '31 min ago'
  },
  {
    id: 12,
    name: 'Mia Jackson',
    username: 'miajackson',
    email: 'mia.jackson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=48',
    role: 'User',
    status: 'Active',
    location: 'Singapore',
    joined: 'Jun 08, 2026',
    posts: 305,
    followers: 2418,
    following: 529,
    lastActive: '9 min ago'
  },
  {
    id: 13,
    name: 'Lucas Martin',
    username: 'lucasmartin',
    email: 'lucas.martin@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'User',
    status: 'Active',
    location: 'Amsterdam, Netherlands',
    joined: 'Jun 19, 2026',
    posts: 156,
    followers: 1042,
    following: 318,
    lastActive: '42 min ago'
  },
  {
    id: 14,
    name: 'Charlotte Lee',
    username: 'charlottelee',
    email: 'charlotte.lee@example.com',
    avatar: 'https://i.pravatar.cc/150?img=38',
    role: 'Moderator',
    status: 'Active',
    location: 'Seoul, South Korea',
    joined: 'Jul 02, 2026',
    posts: 428,
    followers: 3721,
    following: 604,
    lastActive: '3 min ago'
  },
  {
    id: 15,
    name: 'Benjamin Harris',
    username: 'benharris',
    email: 'benjamin.harris@example.com',
    avatar: 'https://i.pravatar.cc/150?img=59',
    role: 'User',
    status: 'Suspended',
    location: 'Boston, USA',
    joined: 'Jul 14, 2026',
    posts: 44,
    followers: 287,
    following: 142,
    lastActive: '3 days ago'
  },
  {
    id: 16,
    name: 'Amelia Clark',
    username: 'ameliac',
    email: 'amelia.clark@example.com',
    avatar: 'https://i.pravatar.cc/150?img=25',
    role: 'User',
    status: 'Active',
    location: 'Dublin, Ireland',
    joined: 'Jul 28, 2026',
    posts: 219,
    followers: 1693,
    following: 387,
    lastActive: '14 min ago'
  },
  {
    id: 17,
    name: 'Henry Lewis',
    username: 'henrylewis',
    email: 'henry.lewis@example.com',
    avatar: 'https://i.pravatar.cc/150?img=60',
    role: 'User',
    status: 'Active',
    location: 'Manchester, UK',
    joined: 'Aug 03, 2026',
    posts: 137,
    followers: 812,
    following: 269,
    lastActive: '51 min ago'
  },
  {
    id: 18,
    name: 'Harper Walker',
    username: 'harperwalker',
    email: 'harper.walker@example.com',
    avatar: 'https://i.pravatar.cc/150?img=23',
    role: 'User',
    status: 'Inactive',
    location: 'Los Angeles, USA',
    joined: 'Aug 11, 2026',
    posts: 82,
    followers: 713,
    following: 204,
    lastActive: '5 days ago'
  },
  {
    id: 19,
    name: 'Alexander Hall',
    username: 'alexhall',
    email: 'alexander.hall@example.com',
    avatar: 'https://i.pravatar.cc/150?img=69',
    role: 'User',
    status: 'Active',
    location: 'Zurich, Switzerland',
    joined: 'Aug 18, 2026',
    posts: 267,
    followers: 2198,
    following: 451,
    lastActive: '6 min ago'
  },
  {
    id: 20,
    name: 'Evelyn Young',
    username: 'evelynyoung',
    email: 'evelyn.young@example.com',
    avatar: 'https://i.pravatar.cc/150?img=43',
    role: 'User',
    status: 'Active',
    location: 'Tokyo, Japan',
    joined: 'Aug 26, 2026',
    posts: 193,
    followers: 1487,
    following: 332,
    lastActive: '16 min ago'
  }
]

const roleStyles = {
  Admin: {
    icon: ShieldCheck,
    className:
      'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20'
  },
  Moderator: {
    icon: Shield,
    className:
      'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
  },
  User: {
    icon: Users,
    className:
      'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/20'
  }
}

const statusStyles = {
  Active:
    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Inactive:
    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Suspended: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
}

function StatCard({ icon: Icon, title, value, description }) {
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

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Icon size={21} />
        </div>
      </div>
    </div>
  )
}

function UserAvatar({ user }) {
  return (
    <div className="relative shrink-0">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-11 w-11 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
      />

      {user.status === 'Active' && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
      )}
    </div>
  )
}

function UserDetailsModal({ user, onClose }) {
  if (!user) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={event => event.stopPropagation()}
      >
        <div className="relative h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-12">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg dark:border-slate-900"
            />
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h2>

              <span
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyles[user.status]}`}
              >
                {user.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              @{user.username}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/70">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {user.posts}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Posts
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/70">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {user.followers.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Followers
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/70">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {user.following.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Following
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={17} className="text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300">
                {user.email}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <MapPin size={17} className="text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300">
                {user.location}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <CalendarDays size={17} className="text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300">
                Joined {user.joined}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Activity size={17} className="text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300">
                Last active {user.lastActive}
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
              <ExternalLink size={16} />
              View Profile
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
    </div>
  )
}

export default function AdminUsers() {
  const [users, setUsers] = useState(usersData)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [openMenu, setOpenMenu] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const usersPerPage = 8

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const query = search.toLowerCase().trim()

      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)

      const matchesRole = roleFilter === 'All' || user.role === roleFilter

      const matchesStatus =
        statusFilter === 'All' || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, roleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage))

  const visibleUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  )

  const totalUsers = users.length
  const activeUsers = users.filter(user => user.status === 'Active').length
  const suspendedUsers = users.filter(
    user => user.status === 'Suspended'
  ).length
  const moderators = users.filter(
    user => user.role === 'Moderator' || user.role === 'Admin'
  ).length

  const resetFilters = () => {
    setSearch('')
    setRoleFilter('All')
    setStatusFilter('All')
    setCurrentPage(1)
  }

  const handleSearch = value => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleRoleFilter = value => {
    setRoleFilter(value)
    setCurrentPage(1)
  }

  const handleStatusFilter = value => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const toggleUserStatus = id => {
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'Suspended' ? 'Active' : 'Suspended'
            }
          : user
      )
    )

    setOpenMenu(null)
  }

  const deleteUser = id => {
    const user = users.find(item => item.id === id)

    if (!user) return

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    )

    if (!confirmed) return

    setUsers(currentUsers => currentUsers.filter(item => item.id !== id))

    setOpenMenu(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Users size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Users
                </h1>

                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Manage and monitor all Nexora users.
                </p>
              </div>
            </div>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
            <UserPlus size={17} />
            Add New User
          </button>
        </div>

        {/* Stats */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Users}
            title="Total Users"
            value={totalUsers.toLocaleString()}
            description="+12.8% from last month"
          />

          <StatCard
            icon={Activity}
            title="Active Users"
            value={activeUsers.toLocaleString()}
            description="Currently active accounts"
          />

          <StatCard
            icon={ShieldCheck}
            title="Staff Members"
            value={moderators.toLocaleString()}
            description="Admins and moderators"
          />

          <StatCard
            icon={Ban}
            title="Suspended"
            value={suspendedUsers.toLocaleString()}
            description="Accounts currently restricted"
          />
        </div>

        {/* Main Card */}
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
                  placeholder="Search users, username or email..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Filter
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={roleFilter}
                    onChange={event => handleRoleFilter(event.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-40"
                  >
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="User">User</option>
                  </select>
                </div>

                <select
                  value={statusFilter}
                  onChange={event => handleStatusFilter(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>

                {(search || roleFilter !== 'All' || statusFilter !== 'All') && (
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
                  {filteredUsers.length}
                </span>{' '}
                users
              </p>

              <p className="hidden text-xs text-slate-400 sm:block">
                {users.length.toLocaleString()} total accounts
              </p>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/30">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    User
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Role
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Location
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Joined
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Activity
                  </th>

                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleUsers.map(user => {
                  const RoleIcon = roleStyles[user.role].icon

                  return (
                    <tr
                      key={user.id}
                      className="group border-b border-slate-100 transition hover:bg-slate-50/70 dark:border-slate-800/80 dark:hover:bg-slate-800/30"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={user} />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {user.name}
                            </p>

                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                              @{user.username}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${roleStyles[user.role].className}`}
                        >
                          <RoleIcon size={13} />
                          {user.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[user.status]}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {user.status}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <MapPin size={14} className="text-slate-400" />
                          {user.location}
                        </div>
                      </td>

                      {/* Joined */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {user.joined}
                        </p>
                      </td>

                      {/* Activity */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {user.lastActive}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {user.posts} posts
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="relative px-5 py-4 text-right">
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === user.id ? null : user.id)
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                          <MoreHorizontal size={19} />
                        </button>

                        {openMenu === user.id && (
                          <div className="absolute right-5 top-14 z-30 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl dark:border-slate-700 dark:bg-slate-800">
                            <button
                              onClick={() => {
                                setSelectedUser(user)
                                setOpenMenu(null)
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                              <Eye size={16} />
                              View Details
                            </button>

                            <button
                              onClick={() => setOpenMenu(null)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                              <Edit3 size={16} />
                              Edit User
                            </button>

                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                              {user.status === 'Suspended' ? (
                                <>
                                  <UserCheck
                                    size={16}
                                    className="text-emerald-500"
                                  />
                                  Activate
                                </>
                              ) : (
                                <>
                                  <UserX size={16} className="text-amber-500" />
                                  Suspend
                                </>
                              )}
                            </button>

                            <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                            <button
                              onClick={() => deleteUser(user.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                            >
                              <Trash2 size={16} />
                              Delete User
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 lg:hidden">
            {visibleUsers.map(user => {
              const RoleIcon = roleStyles[user.role].icon

              return (
                <div
                  key={user.id}
                  className="p-4 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <UserAvatar user={user} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          @{user.username}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === user.id ? null : user.id)
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${roleStyles[user.role].className}`}
                    >
                      <RoleIcon size={13} />
                      {user.role}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[user.status]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {user.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                    <div>
                      <p className="text-slate-400">Location</p>
                      <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">
                        {user.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Joined</p>
                      <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">
                        {user.joined}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Posts</p>
                      <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">
                        {user.posts}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Followers</p>
                      <p className="mt-1 font-medium text-slate-700 dark:text-slate-300">
                        {user.followers.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {openMenu === user.id && (
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setOpenMenu(null)
                        }}
                        className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      <button
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>

                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400"
                      >
                        {user.status === 'Suspended' ? (
                          <>
                            <UserCheck size={14} />
                            Activate
                          </>
                        ) : (
                          <>
                            <UserX size={14} />
                            Suspend
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {visibleUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Users size={28} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                No users found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or filter options to find the users
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

          {/* Pagination */}
          {filteredUsers.length > 0 && (
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

        {/* Footer info */}
        <div className="mt-5 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Nexora Admin • User Management</p>

          <p>Last updated just now</p>
        </div>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  )
}

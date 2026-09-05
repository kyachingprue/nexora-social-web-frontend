import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Flag,
  BarChart3,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import ThemeToggle from "../components/navbar/ThemeToggle";
import useAuth from "../hooks/useAuth";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Posts",
    path: "/admin/posts",
    icon: FileText,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: Flag,
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const getPageTitle = (pathname) => {
  const item = menuItems.find((item) =>
    pathname.startsWith(item.path)
  );

  return item?.name || "Dashboard";
};

const getInitials = (name = "") => {
  return (
    name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A"
  );
};

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] =
    useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pageTitle = getPageTitle(location.pathname);

  // Close mobile sidebar whenever route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  const handleLogout = async () => {
    setProfileOpen(false);

    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside
        className={`fixed left-0 top-0 z-50 hidden h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:block
          ${desktopSidebarCollapsed ? "w-20.5" : "w-64"}
        `}
      >
        {/* Logo */}
        <div
          className={`flex h-20 items-center border-b border-gray-200 dark:border-gray-800
            ${desktopSidebarCollapsed ? "justify-center" : "px-5"}
          `}
        >
          <NavLink
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
              <ShieldCheck size={22} />
            </div>

            {!desktopSidebarCollapsed && (
              <div className="overflow-hidden">
                <h1 className="whitespace-nowrap text-xl font-bold tracking-tight">
                  Nexora
                </h1>

                <p className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                  Administration
                </p>
              </div>
            )}
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="h-[calc(100vh-5rem)] overflow-y-auto px-3 py-5">
          <p
            className={`
              mb-3 px-3 text-[11px] font-semibold uppercase
              tracking-wider text-gray-400 dark:text-gray-500
              ${desktopSidebarCollapsed ? "text-center" : ""}
            `}
          >
            {!desktopSidebarCollapsed && "Management"}
          </p>

          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={
                    desktopSidebarCollapsed
                      ? item.name
                      : undefined
                  }
                  className={({ isActive }) => `
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      desktopSidebarCollapsed
                        ? "justify-center"
                        : ""
                    }

                    ${
                      isActive
                        ? `
                          bg-sky-500
                          text-white
                          shadow-md
                          shadow-sky-500/20
                        `
                        : `
                          text-gray-600
                          hover:bg-gray-100
                          hover:text-gray-900
                          dark:text-gray-400
                          dark:hover:bg-gray-800
                          dark:hover:text-white
                        `
                    }
                  `}
                >
                  <Icon
                    size={19}
                    strokeWidth={2}
                    className="shrink-0"
                  />

                  {!desktopSidebarCollapsed && (
                    <span>{item.name}</span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Sidebar collapse button */}
          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={() =>
                setDesktopSidebarCollapsed(
                  (previous) => !previous
                )
              }
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                text-gray-500
                transition-all
                hover:bg-gray-100
                hover:text-gray-900
                dark:text-gray-400
                dark:hover:bg-gray-800
                dark:hover:text-white

                ${
                  desktopSidebarCollapsed
                    ? "justify-center"
                    : ""
                }
              `}
            >
              {desktopSidebarCollapsed ? (
                <PanelLeftOpen size={19} />
              ) : (
                <PanelLeftClose size={19} />
              )}

              {!desktopSidebarCollapsed && (
                <span>Collapse Sidebar</span>
              )}
            </button>
          </div>
        </nav>
      </aside>

      {/* =====================================================
          MOBILE SIDEBAR OVERLAY
      ====================================================== */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-70
          border-r
          border-gray-200
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          dark:border-gray-800
          dark:bg-gray-900
          lg:hidden

          ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Mobile sidebar header */}
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-5 dark:border-gray-800">
          <NavLink
            to="/admin/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold">Nexora</h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administration
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="
              rounded-lg
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-900
              dark:hover:bg-gray-800
              dark:hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile navigation */}
        <nav className="h-[calc(100vh-5rem)] overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Management
          </p>

          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    }
                  `}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* =====================================================
          MAIN AREA
      ====================================================== */}
      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ${desktopSidebarCollapsed ? "lg:pl-20.5" : "lg:pl-64"}
        `}
      >
        {/* ===================================================
            FIXED NAVBAR
        ==================================================== */}
        <header
          className="
            fixed
            left-0
            right-0
            top-0
            z-30
            h-20
            border-b
            border-gray-200
            bg-white/90
            backdrop-blur-xl
            transition-colors
            duration-300
            dark:border-gray-800
            dark:bg-gray-900/90

            lg:left-64
          "
          style={{
            left:
              typeof window !== "undefined" &&
              window.innerWidth >= 1024
                ? desktopSidebarCollapsed
                  ? "82px"
                  : "256px"
                : "0px",
          }}
        >
          <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left section */}
            <div className="flex min-w-0 items-center gap-3">
              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() =>
                  setMobileSidebarOpen(true)
                }
                className="
                  rounded-xl
                  p-2.5
                  text-gray-600
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                  dark:text-gray-300
                  dark:hover:bg-gray-800
                  dark:hover:text-white
                  lg:hidden
                "
                aria-label="Open sidebar"
              >
                <Menu size={22} />
              </button>

              {/* Desktop title */}
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold sm:text-xl">
                  {pageTitle}
                </h2>

                <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
                  Manage your Nexora platform
                </p>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search */}
              <button
                type="button"
                className="
                  hidden
                  rounded-xl
                  p-2.5
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                  dark:text-gray-400
                  dark:hover:bg-gray-800
                  dark:hover:text-white
                  sm:block
                "
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Theme */}
              <div className="rounded-xl">
                <ThemeToggle />
              </div>

              {/* Notification */}
              <button
                type="button"
                className="
                  relative
                  rounded-xl
                  p-2.5
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                  dark:text-gray-400
                  dark:hover:bg-gray-800
                  dark:hover:text-white
                "
                aria-label="Notifications"
              >
                <Bell size={20} />

                {/* Notification badge */}
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
              </button>

              {/* Divider */}
              <div className="mx-1 hidden h-8 w-px bg-gray-200 dark:bg-gray-800 sm:block" />

              {/* Admin profile */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((previous) => !previous)
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    p-1.5
                    transition
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                  "
                >
                  {/* Avatar */}
                  <div className="relative h-9 w-9 overflow-hidden rounded-full bg-sky-500">
                    {user?.avatar || user?.photoURL ? (
                      <img
                        src={
                          user?.avatar ||
                          user?.photoURL
                        }
                        alt={user?.name || "Admin"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                        {getInitials(user?.name)}
                      </div>
                    )}
                  </div>

                  {/* Admin information */}
                  <div className="hidden text-left md:block">
                    <p className="max-w-30 truncate text-sm font-semibold">
                      {user?.name || "Admin"}
                    </p>

                    <p className="max-w-30 truncate text-xs text-gray-500 dark:text-gray-400">
                      {user?.role || "Administrator"}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`
                      hidden
                      text-gray-400
                      transition-transform
                      duration-200
                      md:block

                      ${profileOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* Profile dropdown */}
                {profileOpen && (
                  <>
                    {/* Outside click area */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    />

                    <div
                      className="
                        absolute
                        right-0
                        top-14
                        z-50
                        w-64
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        shadow-2xl
                        shadow-black/10
                        dark:border-gray-800
                        dark:bg-gray-900
                        dark:shadow-black/40
                      "
                    >
                      {/* User info */}
                      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 overflow-hidden rounded-full bg-sky-500">
                            {user?.avatar ||
                            user?.photoURL ? (
                              <img
                                src={
                                  user?.avatar ||
                                  user?.photoURL
                                }
                                alt={
                                  user?.name || "Admin"
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-bold text-white">
                                {getInitials(
                                  user?.name
                                )}
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {user?.name || "Admin"}
                            </p>

                            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                              {user?.email ||
                                "admin@nexora.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown actions */}
                      <div className="p-2">
                        <NavLink
                          to="/profile"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-100
                            dark:text-gray-300
                            dark:hover:bg-gray-800
                            dark:hover:text-white
                          "
                        >
                          <User size={18} />
                          <span>My Profile</span>
                        </NavLink>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-2.5
                            text-sm
                            font-medium
                            text-red-500
                            transition
                            hover:bg-red-50
                            dark:hover:bg-red-950/30
                          "
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}
        <main className="min-h-screen pt-20">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


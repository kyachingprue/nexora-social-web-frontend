import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import MobileTabBar from "./MobileTabBar";


export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl dark:bg-linear-to-br from-cyan-950 to-black">
      <Navbar />

      <div className="container flex gap-3 md:gap-5 py-6">
        <Sidebar />

        <main className="min-w-0 flex-1 pb-20 lg:pb-6 px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col gap-4"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <RightSidebar />
      </div>

      <MobileTabBar />
    </div>
  )
}

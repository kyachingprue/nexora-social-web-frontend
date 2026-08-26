import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative flex h-9 w-16 items-center rounded-full border border-gray-200 bg-gray-100 px-1 shadow-sm transition-colors duration-300 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
        ${className}
      `}
    >
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-950"
        style={{
          marginLeft: isDark ? 'auto' : 0
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{
                rotate: -90,
                opacity: 0
              }}
              animate={{
                rotate: 0,
                opacity: 1
              }}
              exit={{
                rotate: 90,
                opacity: 0
              }}
              transition={{
                duration: 0.2
              }}
            >
              <Moon
                size={15}
                strokeWidth={2}
                className="text-indigo-600 dark:text-indigo-400"/>
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{
                rotate: 90,
                opacity: 0
              }}
              animate={{
                rotate: 0,
                opacity: 1
              }}
              exit={{
                rotate: -90,
                opacity: 0
              }}
              transition={{
                duration: 0.2
              }}
            >
              <Sun
                size={15}
                strokeWidth={2}
                className="text-amber-500 dark:text-amber-400"/>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  )
}

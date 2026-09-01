import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { currentUser, stories } from '../../data/fakeData'
import { cn } from '../../lib/utils'

export default function Stories() {
  const scrollRef = useRef(null)

  const [isDragging, setIsDragging] = useState(false)

  const dragState = useRef({
    startX: 0,
    scrollLeft: 0
  })

  const handlePointerDown = e => {
    const container = scrollRef.current

    if (!container) return

    setIsDragging(true)

    dragState.current = {
      startX: e.clientX,
      scrollLeft: container.scrollLeft
    }

    container.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = e => {
    const container = scrollRef.current

    if (!container || !isDragging) return

    const distance = e.clientX - dragState.current.startX

    container.scrollLeft = dragState.current.scrollLeft - distance
  }

  const handlePointerUp = e => {
    const container = scrollRef.current

    setIsDragging(false)

    if (container?.hasPointerCapture(e.pointerId)) {
      container.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <div
      ref={scrollRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        'flex gap-4 overflow-x-auto pb-1 pt-1',
        'scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',

        // Touch / swipe
        'touch-pan-x',

        // Mouse
        isDragging ? 'cursor-grabbing' : 'cursor-grab',

        // Smooth scrolling when not dragging
        !isDragging && 'scroll-smooth'
      )}
    >
      {/* Your Story */}
      <StoryItem avatar={currentUser.avatar} name="Your story" isSelf />

      {/* Stories */}
      {stories.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.05,
            duration: 0.3
          }}
          className="shrink-0"
        >
          <StoryItem
            avatar={s.user.avatar}
            name={s.user.name.split(' ')[0]}
            viewed={s.viewed}
          />
        </motion.div>
      ))}
    </div>
  )
}

function StoryItem({ avatar, name, viewed, isSelf }) {
  return (
    <motion.button
      type="button"
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.96
      }}
      className="flex w-16 shrink-0 select-none flex-col items-center gap-1.5"
    >
      {/* Story Ring */}
      <div
        className={cn(
          'relative grid h-16 w-16 place-items-center rounded-full p-[2.5px]',

          viewed
            ? 'bg-gray-200 dark:bg-gray-700'
            : 'bg-linear-to-br from-violet-500 via-indigo-500 to-purple-500'
        )}
      >
        <img
          src={avatar}
          alt={name}
          draggable={false}
          className="
            h-full
            w-full
            rounded-full
            border-2
            border-white
            object-cover

            dark:border-gray-950
          "
        />

        {/* Add Story */}
        {isSelf && (
          <span
            className="
              absolute
              -bottom-0.5
              -right-0.5
              grid
              h-5
              w-5
              place-items-center
              rounded-full

              bg-violet-600
              text-white
              ring-2
              ring-white

              dark:bg-violet-500
              dark:ring-gray-950
            "
          >
            <Plus size={12} />
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className="w-full select-none truncate text-center text-[11px] text-gray-600 dark:text-gray-400">
        {name}
      </span>
    </motion.button>
  )
}

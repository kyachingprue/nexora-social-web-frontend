import { useRef } from "react";
import { BadgeCheck } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "../lib/utils";


export function VerifiedBadge({ className, size = 16 }) {
  const ref = useRef(null);

  const handleEnter = () => {
    gsap.fromTo(
      ref.current,
      { rotate: -15, scale: 0.9 },
      { rotate: 0, scale: 1.15, duration: 0.35, ease: "back.out(3)", yoyo: true, repeat: 1 }
    );
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleEnter}
      className={cn(
        'inline-flex shrink-0 text-violet-600',
        'dark:text-violet-400',
        className
      )}
      title="Verified account"
    >
      <BadgeCheck
        size={size}
        className="fill-blue-600 stroke-white dark:fill-blue-500 dark:stroke-gray-950"
        strokeWidth={2.2}
      />
    </span>
  )
}

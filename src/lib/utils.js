import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateString) {
  const then = new Date(dateString)

  if (Number.isNaN(then.getTime())) {
    return ''
  }

  const now = new Date()
  const seconds = Math.floor((now - then) / 1000)

  const intervals = [
    { label: 'y', secs: 31536000 },
    { label: 'mo', secs: 2592000 },
    { label: 'w', secs: 604800 },
    { label: 'd', secs: 86400 },
    { label: 'h', secs: 3600 },
    { label: 'm', secs: 60 }
  ]

  for (const { label, secs } of intervals) {
    const count = Math.floor(seconds / secs)

    if (count >= 1) {
      return `${count}${label}`
    }
  }

  return 'now'
}

export function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return `${n}`;
}

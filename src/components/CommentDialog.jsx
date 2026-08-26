import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import { commentsByPost, currentUser } from "../data/fakeData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerifiedBadge } from "../ui/verified-badge";
import { timeAgo } from "../lib/utils";


export default function CommentDialog({ post, open, onOpenChange }) {
  const [comments, setComments] = useState(commentsByPost[post.id] || []);
  const [draft, setDraft] = useState("");

  const submit = () => {
    if (!draft.trim()) return;
    setComments((c) => [
      ...c,
      {
        id: `local-${Date.now()}`,
        user: currentUser,
        text: draft.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setDraft("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-white">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-5 py-3 bg-white dark:bg-gray-950">
          <AnimatePresence initial={false}>
            {comments.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 py-3"
              >
                {/* Avatar */}
                <Avatar className="h-9 w-9 shrink-0 ring-1 ring-gray-200 dark:ring-gray-700">
                  <AvatarImage src={c.user.avatar} alt={c.user.name} />

                  <AvatarFallback className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    {c.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                {/* Comment */}
                <div className="min-w-0">
                  <div className="rounded-2xl bg-gray-100 px-3.5 py-2.5 dark:bg-gray-800">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {c.user.name}
                      </span>

                      {c.user.verified && (
                        <VerifiedBadge
                          size={12}
                          className="
                    text-violet-600

                    dark:text-violet-400
                  "
                        />
                      )}
                    </div>

                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {c.text}
                    </p>
                  </div>

                  <p className="mt-1 pl-3.5 text-[11px] text-gray-500 dark:text-gray-400">
                    {timeAgo(c.createdAt)} ago
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {comments.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to say something.
            </p>
          )}
        </div>

        {/* Comment Input */}
        <div className="flex items-center gap-2 border-t border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-950">
          {/* Current User Avatar */}
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={currentUser.avatar} alt="you" />

            <AvatarFallback className="bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              YU
            </AvatarFallback>
          </Avatar>

          {/* Input */}
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Add a comment..."
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-violet-400 dark:focus:bg-gray-900 dark:focus:ring-violet-400/10"/>

          {/* Send */}
          <button
            type="button"
            onClick={submit}
            disabled={!draft.trim()}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-600 text-white transition-all duration-200 hover:bg-violet-700 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 dark:bg-violet-500 dark:hover:bg-violet-400 dark:text-white dark:focus-visible:ring-offset-gray-950">
            <Send size={15} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

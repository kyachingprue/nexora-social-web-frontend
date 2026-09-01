import { useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Link2,
  Send,
} from "lucide-react";
import { FaFacebook, FaTwitter } from 'react-icons/fa6'
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { VerifiedBadge } from "../../ui/verified-badge";
import { cn, formatCount, timeAgo } from "../../lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import CommentDialog from "./CommentDialog";



export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(post.savedByMe);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [shared, setShared] = useState(false);

  const heartRef = useRef(null);
  const burstRef = useRef(null);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => (next ? c + 1 : c - 1));

    gsap.fromTo(
      heartRef.current,
      { scale: 1 },
      { scale: 1.5, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
    );

    if (next && burstRef.current) {
      gsap.fromTo(
        burstRef.current,
        { scale: 0, opacity: 0.9 },
        { scale: 2.4, opacity: 0, duration: 0.55, ease: "power1.out" }
      );
    }
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-3 p-4 pb-3">
        <Avatar className="h-11 w-11 ring-1 ring-gray-200 dark:ring-gray-700">
          <AvatarImage src={post.user.avatar} alt={post.user.name} />

          <AvatarFallback className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            {post.user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {post.user.name}
            </p>

            {post.user.verified && (
              <VerifiedBadge className="text-violet-600 dark:text-violet-400"/>
            )}
          </div>

          <p className="flex items-center gap-1 truncate text-xs text-gray-500 dark:text-gray-400">
            {post.user.handle} · {timeAgo(post.createdAt)} ago
            {post.location && (
              <>
                <span>·</span>
                <MapPin size={11} />
                {post.location}
              </>
            )}
          </p>
        </div>

        {/* More Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-full text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Post options"
            >
              <MoreHorizontal size={18} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <DropdownMenuItem
              onClick={() => setSaved(s => !s)}
              className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:text-white">
              <Bookmark size={15} />
              {saved ? 'Remove from saved' : 'Save post'}
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:text-white">
              <Link2 size={15} />
              Copy link
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-950/40 dark:focus:text-red-300">
              Report post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* TEXT */}
      {post.text && (
        <p className="whitespace-pre-line px-4 pb-3 text-[15px] leading-relaxed text-gray-800 dark:text-gray-200"
        >
          {post.text}
        </p>
      )}

      {/*  IMAGE */}
      {post.image && (
        <div className="relative w-full cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800"
          onDoubleClick={() => !liked && toggleLike()}
        >
          {!imgLoaded && (
            <div
              className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800"
            />
          )}

          <img
            src={post.image}
            alt=""
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={cn(
              'max-h-136 w-full object-cover transition-opacity duration-500',
              imgLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />

          {/* Double-click Heart */}
          <div
            ref={burstRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0">
            <Heart
              size={90}
              className="fill-white text-white drop-shadow-lg"/>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="flex items-center justify-between px-4 pt-3 text-xs
      text-gray-500 dark:text-gray-400">
        <span>{formatCount(likeCount)} likes</span>

        <div className="flex gap-3">
          <span>{formatCount(post.comments)} comments</span>

          <span>{formatCount(post.shares)} shares</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-1 flex items-center justify-between border-t
      border-gray-200 px-2 py-1 dark:border-gray-800">
        {/* Like */}
        <ActionButton
          onClick={toggleLike}
          active={liked}
          activeClass="text-pink-600 dark:text-pink-400"
          icon={
            <span ref={heartRef} className="inline-flex">
              <Heart
                size={20}
                className={
                  liked
                    ? 'fill-pink-600 text-pink-600 dark:fill-pink-400 dark:text-pink-400'
                    : ''
                }
              />
            </span>
          }
          label="Like"
        />

        {/* Comment */}
        <ActionButton
          onClick={() => setCommentsOpen(true)}
          icon={<MessageCircle size={20} />}
          label="Comment"
        />

        {/* Share */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={handleShare}
              className="relative flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
              <Share2 size={20} />

              <span className="hidden sm:inline">
                {shared ? 'Shared!' : 'Share'}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <DropdownMenuItem className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:text-white">
              <Send size={15} />
              Send as message
            </DropdownMenuItem>

            <DropdownMenuItem className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:text-white">
              <FaTwitter size={15} />
              Share to X
            </DropdownMenuItem>

            <DropdownMenuItem className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:text-white">
              <FaFacebook size={15} />
              Share to Facebook
            </DropdownMenuItem>

            <DropdownMenuItem className="text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:text-white">
              <Link2 size={15} />
              Copy link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Save */}
        <ActionButton
          onClick={() => setSaved(s => !s)}
          active={saved}
          activeClass="text-violet-600 dark:text-violet-400"
          icon={
            <Bookmark
              size={20}
              className={saved ? 'fill-violet-600 dark:fill-violet-400' : ''}
            />
          }
          label="Save"
        />
      </div>

      {/* Comments */}
      <CommentDialog
        post={post}
        open={commentsOpen}
        onOpenChange={setCommentsOpen}
      />
    </motion.article>
  )
}

function ActionButton({ onClick, icon, label, active, activeClass }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-gray-400
      dark:hover:bg-gray-800 dark:hover:text-white`,
        active && activeClass
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

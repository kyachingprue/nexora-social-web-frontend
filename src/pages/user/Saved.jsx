import PostCard from "../../components/post/PostCard";
import { posts } from "../../data/fakeData";


export default function Saved() {
  const savedPosts = posts.filter((p) => p.savedByMe);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1
          className="
        font-display
        text-2xl
        font-bold

        text-gray-900

        dark:text-white
      "
        >
          Saved posts
        </h1>

        <p
          className="
        text-sm

        text-gray-500

        dark:text-gray-400
      "
        >
          Posts you've bookmarked to revisit later.
        </p>
      </div>

      {/* Saved Posts */}
      {savedPosts.length === 0 ? (
        <div
          className="
        rounded-xl
        border
        border-dashed
        p-10
        text-center
        text-sm

        border-gray-300
        text-gray-500

        dark:border-gray-700
        dark:text-gray-400
      "
        >
          Nothing saved yet. Tap the bookmark icon on any post to keep it here.
        </div>
      ) : (
        savedPosts.map(post => <PostCard key={post.id} post={post} />)
      )}
    </div>
  )
}

import Stories from "../components/feed/Stories";
import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import { posts } from "../data/fakeData";

export default function Home() {
  return (
    <>
      <Stories />
      <CreatePost />
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

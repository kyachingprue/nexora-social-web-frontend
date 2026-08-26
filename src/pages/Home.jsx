import Stories from "../components/Stories";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
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

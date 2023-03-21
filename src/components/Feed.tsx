import { type FakePost } from "~/fake-data/Insta-posts";
import Post from "./Post";

export default function Feed({ posts }: { posts: FakePost[] }) {
  return (
    <div className="w-full max-w-[470px] bg-zinc-700">
      <div className="">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

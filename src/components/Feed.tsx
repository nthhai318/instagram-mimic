import { type FakePost } from "~/fake-data/Insta-posts";
import Post from "./Post";
import PostInput from "./PostInput";

export default function Feed({ posts }: { posts: FakePost[] }) {
  return (
    <div className="w-full max-w-[470px] bg-zinc-700">
      <div className="">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="absolute">
        <PostInput />
      </div>
    </div>
  );
}

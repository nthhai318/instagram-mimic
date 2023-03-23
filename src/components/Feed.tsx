import { type RouterOutputs } from "~/utils/api";
import Post from "./Post";

type PostsOutput = RouterOutputs["post"]["getAll"];

export default function Feed({ posts }: { posts: PostsOutput }) {
  return (
    <div className="w-full max-w-[470px] ">
      <div className="flex flex-col gap-10 divide-y divide-gray-600">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

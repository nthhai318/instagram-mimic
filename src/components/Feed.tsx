import { type FakePost } from "~/fake-data/Insta-posts";
import Post from "./Post";
import PostInput from "./PostInput";

export default function Feed({ posts }: { posts: FakePost[] }) {
  return (
    <div className="w-full max-w-[470px] ">
      <div className="flex flex-col gap-10 divide-y divide-gray-600">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      {/* <div className="fixed inset-0 z-20 flex w-full items-center justify-center">
        <PostInput />
      </div> */}
    </div>
  );
}

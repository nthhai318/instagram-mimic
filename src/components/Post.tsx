import { type FakePost } from "~/fake-data/Insta-posts";
import Image from "next/image";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";

export default function Post({ post }: { post: FakePost }) {
  return (
    <div className="flex w-full flex-col">
      {/* User Info */}
      <div className="flex items-center gap-2 p-2">
        <Image
          src={post.userImg}
          width={100}
          height={100}
          alt={`${post.name} ava`}
          className="h-10 w-10 rounded-full object-cover"
        />
        <p className="font-bold">{post.name}</p>
        <span>•</span>
        <p className="text-sm font-thin">{post.timestamp}</p>
      </div>
      {/* Image */}
      <div className="">
        <Image
          src={post.image}
          width={1000}
          height={1000}
          alt="content"
          className="h-auto max-h-[600px] w-full object-cover"
        />
      </div>
      {/* Utilities: Likes/Comment/Share */}
      <div className="my-2 flex items-center gap-6">
        <FaRegHeart size={24} />
        <FaHeart size={24} />
        <FaRegComment size={24} />
      </div>
      {/* Number of Likes */}
      <div></div>
      {/* Content */}
      <div></div>
      {/* Comments */}
      <div></div>
      {/* Add a Comment */}
      <div></div>
    </div>
  );
}

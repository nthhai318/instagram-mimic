import Image from "next/image";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";

type PostsOutput = RouterOutputs["post"]["getAll"][0];

export default function Post({ post }: { post: PostsOutput }) {
  // const { data: likes } = api.like.getAllFromPost.useQuery({ postId: post.id });

  // const { data: comments } = api.comment.getAllFromPost.useQuery({
  //   postId: post.id,
  // });

  const [hasLiked, setHasLiked] = useState(false);

  // const { data: sessionData } = useSession();

  // if (sessionData && likes) {
  //   setHasLiked(() =>
  //     likes.findIndex((like) => like.userId === sessionData.user.id) !== -1
  //       ? true
  //       : false
  //   );
  // }

  return (
    <div className="flex w-full flex-col ">
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
        <p className="text-sm font-thin">
          {post.createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
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
        {!hasLiked ? <FaRegHeart size={24} /> : <FaHeart size={24} />}
        <FaRegComment size={24} />
      </div>
      {/* Number of Likes */}
      {/* {likes && (
        <div>
          <p>
            {likes.length} {likes.length <= 1 ? "like" : "likes"}
          </p>
        </div>
      )} */}
      {/* Content */}
      <div className="text-justify">
        <span className="font-bold">{post.name} </span>
        <span className="text-sm">{post.content}</span>
      </div>
      {/* Comments */}
      {/* {comments && (
        <div>
          {comments.length > 0 && (
            <button>
              Show {comments.length}{" "}
              {comments.length > 1 ? "comments" : "comment"}
            </button>
          )}
          {comments.length == 0 && <div>Comment on this post</div>}
        </div>
      )} */}
    </div>
  );
}

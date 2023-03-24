import Image from "next/image";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { api, type RouterOutputs } from "~/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

type PostOutput = RouterOutputs["post"]["getAll"][0];

export default function Post({
  post,
  fetchpost,
}: {
  post: PostOutput;
  fetchpost: () => void;
}) {
  const { data: sessionData } = useSession();

  const likeId =
    post.like[
      post.like.findIndex((like) => like.userId === sessionData?.user.id)
    ];

  const likePost = api.like.create.useMutation({
    onSuccess: () => {
      fetchpost();
    },
  });

  const unlikePost = api.like.delete.useMutation({
    onSuccess: () => {
      fetchpost();
    },
  });

  return (
    <div className="flex w-full flex-col pb-10">
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
        <Link href={`/post/${post.id}`}>
          <Image
            src={post.image}
            width={1000}
            height={1000}
            alt="content"
            className="h-auto max-h-[600px] w-full object-cover"
          />
        </Link>
      </div>

      {/* Utilities: Likes/Comment */}
      <div className="mb-2 flex items-center gap-6 p-3">
        {likeId ? (
          <FaHeart
            size={24}
            onClick={() =>
              unlikePost.mutate({
                likeId: likeId.id,
              })
            }
          />
        ) : (
          <FaRegHeart
            size={24}
            onClick={() => likePost.mutate({ postId: post.id })}
          />
        )}
        {post.like && <p>{post.like.length}</p>}
        <FaRegComment size={24} />
        <p>{post.comment.length}</p>
      </div>

      {/* Content */}
      <div className="text-justify">
        <span className="font-bold">{post.name} </span>
        <span className="text-sm">{post.content}</span>
      </div>

      {/* Comments */}
      <Link href={`/post/${post.id}`}>
        <div className="cursor-pointer text-center">
          {post.comment.length == 0 ? (
            <div>Comment on this post</div>
          ) : (
            <div>{`Show ${post.comment.length} ${
              post.comment.length == 1 ? "comment" : "comments"
            }`}</div>
          )}
        </div>
      </Link>
    </div>
  );
}

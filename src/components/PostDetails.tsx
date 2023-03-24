import Image from "next/image";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { type Post, Comment } from "@prisma/client";

type PostOutput = RouterOutputs["post"]["getPostById"];

export default function Post({
  post,
  postRefetch,
}: {
  post: NonNullable<PostOutput>;
  postRefetch: () => void;
}) {
  const [comment, setComment] = useState<string>("");

  const { data: sessionData } = useSession();

  const likeId =
    post.like[
      post.like.findIndex((like) => like.userId === sessionData?.user.id)
    ];

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      setComment("");
      postRefetch();
    },
  });

  const sendComment = () => {
    if (!comment) {
      alert("Cannot post with empty image");
      return;
    }
    createComment.mutate({
      content: comment,
      postId: post.id,
    });
  };

  const likePost = api.like.create.useMutation({
    onSuccess: () => {
      postRefetch();
    },
  });

  const unlikePost = api.like.delete.useMutation({
    onSuccess: () => {
      postRefetch();
    },
  });

  return (
    <div className="h-fit w-full max-w-[1050px] flex-col overflow-hidden rounded-lg bg-zinc-700">
      <div className="flex h-fit w-full flex-col  md:flex-row">
        <div className="flflex flex aspect-square items-center justify-center">
          {/* Image */}
          <Image
            src={post.image}
            width={1000}
            height={1000}
            alt="content"
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="relative w-full md:w-[340px]">
          <div className="scrollbar-hide flex w-full flex-col divide-y divide-zinc-500 overflow-y-scroll md:absolute md:inset-0 md:w-[340px]">
            {/* User content */}
            <div className="flex items-center gap-2 p-3">
              <Image
                src={post.userImg}
                width={100}
                height={100}
                alt={`${post.name} ava`}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <div className="">
                  <span className="font-bold">{post.name} </span>
                  <span className="text-base">{post.content}</span>
                </div>
                <p className="text-xs font-thin">
                  {post.createdAt.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Comments */}
            <div className="scrollbar-hide order order-1 flex flex-col gap-5 overflow-y-scroll md:flex-1">
              {post.comment.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
            {/* Post a comment */}
            <div className="bg-zinc-800/50 md:order-1">
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
              <textarea
                placeholder="Write your comment"
                className="w-full bg-transparent  p-3 outline-none"
                rows={2}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  e.target.style.height = "0";
                  e.target.style.height = `${Math.max(
                    e.target.scrollHeight,
                    72
                  )}px`;
                }}
              />
              <button
                className="w-full rounded-md bg-zinc-600 p-2"
                onClick={sendComment}
              >
                Submit comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="flex items-center gap-2 p-3">
      <Image
        src={comment.userImg}
        width={100}
        height={100}
        alt={`${comment.name} ava`}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div>
        <div className="">
          <span className="font-bold">{comment.name}: </span>
          <span className="text-base">{comment.content}</span>
        </div>
        <p className="text-xs font-thin">
          {comment.createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

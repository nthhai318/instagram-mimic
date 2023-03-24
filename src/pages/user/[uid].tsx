import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import PostInputModal from "~/components/PostInputModal";
import { api } from "~/utils/api";
import Link from "next/link";
import { FaHeart, FaRegComment } from "react-icons/fa";

export const dynamic = "force-dynamic";

const UserPost: NextPage = () => {
  const router = useRouter();
  const { uid } = router.query as { uid: string };

  const {
    data: posts,
    refetch: postsrefetch,
    isLoading: loading,
  } = api.post.getPostByUserId.useQuery({
    userId: uid,
  });

  const fetchpost = () => postsrefetch();

  const sortedPosts = posts?.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  return (
    <>
      <Head>
        <title>
          {loading
            ? "Loading"
            : sortedPosts
            ? sortedPosts[0]?.name
            : "User not found"}
        </title>
        <meta
          name="description"
          content="Instagram mimic using Nextjs and Supabase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-1 flex-col items-center justify-start overflow-x-hidden">
        {sortedPosts && (
          <div className="flex w-full flex-col items-center">
            <div className="mx flex h-[200px] w-full items-center justify-center ">
              {sortedPosts[0] && (
                <div className="flex items-center gap-10">
                  <div className="gradient-border">
                    <Image
                      src={sortedPosts[0]?.userImg}
                      width={200}
                      height={200}
                      alt="ava"
                      className="h-[105px] w-[105px] rounded-full "
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{sortedPosts[0]?.name}</p>
                    <p>
                      {sortedPosts.length}{" "}
                      {sortedPosts.length < 2 ? "post" : "posts"}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="mx-auto grid w-full max-w-[912px] grid-cols-3 items-center justify-center gap-1">
              {/* Post Feed */}

              {sortedPosts.map((post) => (
                // <PostPreview
                //   key={post.id}
                //   fetchpost={() => void fetchpost()}
                //   post={post}
                // />
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className="group relative flex aspect-square max-w-[300px] items-center justify-center"
                >
                  <div>
                    <Image
                      src={post.image}
                      width={300}
                      height={300}
                      alt={post.content}
                      className="absolute inset-0 aspect-square h-full object-cover group-hover:brightness-50"
                    />
                  </div>
                  <div className="z-30 hidden gap-3 group-hover:flex">
                    <FaHeart size={24} />
                    {post.like && <p>{post.like.length}</p>}
                    <FaRegComment size={24} />
                    <p>{post.comment.length}</p>
                  </div>
                </Link>
              ))}
            </div>
            <PostInputModal postsrefetch={fetchpost} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserPost;

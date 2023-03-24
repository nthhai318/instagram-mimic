import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import PostDetails from "~/components/PostDetails";
import { api } from "~/utils/api";

export const dynamic = "force-dynamic";

export default function DetailsPost() {
  const router = useRouter();
  const { pid } = router.query as { pid: string };

  const {
    data: post,
    refetch: refetchpost,
    isLoading: loading,
  } = api.post.getPostById.useQuery({
    postId: pid,
  });

  const postRefetch = () => refetchpost();

  return (
    <>
      <Head>
        <title>
          {loading ? "Loading" : post ? post.content : "Post not found"}
        </title>
        <meta
          name="description"
          content="Instagram mimic using Nextjs and Supabase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col">
        {!post && loading ? (
          <div className="flex h-full w-full items-center justify-center">
            Loading
          </div>
        ) : !post && !loading ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p>No post found</p>
            <p>
              Return{" "}
              <Link className="font-bold text-red-300 hover:underline" href="/">
                Home
              </Link>
              ?
            </p>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {post && (
              <PostDetails post={post} postRefetch={() => void postRefetch()} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Friends from "~/components/Friends";
import PostInput from "~/components/PostInput";
import PostPreview from "~/components/PostPreview";
import { api } from "~/utils/api";

export const dynamic = "force-dynamic";

const UserPost: NextPage = () => {
  const router = useRouter();
  const { uid } = router.query as { uid: string };

  const { data: sessionData } = useSession();

  const { data: posts, refetch: postsrefetch } =
    api.post.getPostByUserId.useQuery({
      userId: uid,
    });

  const fetchpost = () => postsrefetch();

  const sortedPosts = posts?.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );
  return (
    <>
      <Head>
        <title>Instagram Mimics</title>
        <meta
          name="description"
          content="Instagram mimic using Nextjs and Supabase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-1 items-start justify-center gap-16 overflow-x-hidden">
        <div className="flex w-full max-w-[630px] flex-col items-center justify-start">
          <Friends />
          {/* Post Feed */}
          <div className="w-full max-w-[470px] ">
            <div className="flex flex-col divide-y divide-gray-600">
              {sortedPosts &&
                sortedPosts.map((post) => (
                  <PostPreview
                    key={post.id}
                    fetchpost={() => void fetchpost()}
                    post={post}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="hidden w-[319px] lg:flex">{/* <Suggestions /> */}</div>
        <PostInput postsrefetch={fetchpost} />
      </div>
    </>
  );
};

export default UserPost;

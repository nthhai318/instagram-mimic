import { type NextPage } from "next";
import Head from "next/head";
import Feed from "~/components/Feed";
import Friends from "~/components/Friends";
import PostInput from "~/components/PostInput";
// import Suggestions from "~/components/Suggestions";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: posts, refetch: postsrefetch } =
    api.post.getAll.useQuery(undefined);
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
          {sortedPosts && <Feed posts={sortedPosts} />}
        </div>
        <div className="hidden w-[319px] lg:flex">{/* <Suggestions /> */}</div>
        <PostInput postsrefetch={fetchpost} />
      </div>
    </>
  );
};

export default Home;

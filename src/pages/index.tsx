import { type NextPage } from "next";
import Head from "next/head";
import Friends from "~/components/Friends";
import PostPreview from "~/components/PostPreview";
import PostInputModal from "~/components/PostInputModal";
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
        <PostInputModal postsrefetch={fetchpost} />
      </div>
    </>
  );
};

export default Home;

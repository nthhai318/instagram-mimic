import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Feed from "~/components/Feed";
import Friends, { type FakeFriends } from "~/components/Friends";
import Suggestions from "~/components/Suggestions";
import { type FakePost } from "~/fake-data/Insta-posts";

const Home: NextPage = () => {
  const [friends, setFriends] = useState<FakeFriends>([]);
  const [posts, setPosts] = useState<FakePost[]>([]);

  useEffect(() => {
    fetch("api/fakeUser")
      .then((res) => res.json() as Promise<FakeFriends>)
      .then((data) => setFriends(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("api/fakePosts")
      .then((res) => res.json() as Promise<FakePost[]>)
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

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
          {friends && <Friends friends={friends} />}
          {posts && <Feed posts={posts} />}
        </div>
        <div className="hidden w-[319px] lg:flex">
          <Suggestions />
        </div>
      </div>
    </>
  );
};

export default Home;

import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Feed from "~/components/Feed";
import Friends, { type FakeFriends } from "~/components/Friends";
import Suggestions from "~/components/Suggestions";

const Home: NextPage = () => {
  const [friends, setFriends] = useState<FakeFriends>([]);

  useEffect(() => {
    fetch("api/fakeUser")
      .then((res) => res.json() as Promise<FakeFriends>)
      .then((data) => setFriends(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(friends);

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
          <Friends friends={friends} />
          <Feed />
        </div>
        <div className="hidden w-[319px] lg:flex">
          <Suggestions />
        </div>
      </div>
    </>
  );
};

export default Home;

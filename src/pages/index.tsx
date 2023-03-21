import { type NextPage } from "next";
import Head from "next/head";
import Feed from "~/components/Feed";
import Friends from "~/components/Friends";
import Suggestions from "~/components/Suggestions";

const Home: NextPage = () => {
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
      <div className="flex flex-1 items-start justify-center gap-16">
        <div className="flex w-full max-w-[630px] flex-col items-center justify-start">
          <Friends />
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

import { type NextPage } from "next";
import Head from "next/head";

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
      <div className="flex flex-1 flex-col items-center justify-center"></div>
    </>
  );
};

export default Home;

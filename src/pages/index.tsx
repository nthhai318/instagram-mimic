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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="h-20 w-[calc(40vw+100px)] bg-red-900"></div>
      </main>
    </>
  );
};

export default Home;

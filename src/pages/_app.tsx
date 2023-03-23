import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/Layout";
import { PostInputContext } from "~/components/PostInputContext";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [postModalOpen, setPostModalOpen] = useState(false);

  return (
    <SessionProvider session={session}>
      <PostInputContext.Provider value={{ postModalOpen, setPostModalOpen }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostInputContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/Layout";
import { ModalContext } from "~/components/PostInputContext";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);

  return (
    <SessionProvider session={session}>
      <ModalContext.Provider
        value={{
          postModalOpen,
          setPostModalOpen,
          logModalOpen,
          setLogModalOpen,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

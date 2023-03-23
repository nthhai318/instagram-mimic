import Image from "next/image";
import { useContext } from "react";
import { PostInputContext } from "../PostInputContext";
import { CgAddR } from "react-icons/cg";
import { useSession } from "next-auth/react";

export default function Header() {
  const { setPostModalOpen } = useContext(PostInputContext);
  const { data: sessionData } = useSession();
  return (
    <div className="flex h-[60px] w-full items-center justify-between bg-zinc-900 px-4">
      <Image
        src="/Instagram-large.svg"
        width={200}
        height={200}
        alt="logo"
        className="my-auto h-fit w-28 self-center"
      />
      {sessionData && (
        <div
          className="flex items-center gap-5"
          onClick={() => setPostModalOpen(true)}
        >
          <CgAddR className="hover:scale-105 hover:brightness-90" size={24} />
        </div>
      )}
    </div>
  );
}

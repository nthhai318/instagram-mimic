import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";
import { type IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { PostInputContext } from "../PostInputContext";

export default function Navbar() {
  const { setPostModalOpen } = useContext(PostInputContext);
  const { data: sessionData } = useSession();

  return (
    <div className="h-14 w-full  md:h-full md:w-[72px] xl:w-56 ">
      <div className="fixed left-0 bottom-0 z-10 h-14 w-full bg-zinc-900 p-1 md:h-full md:w-[72px] xl:w-56 xl:p-4">
        {/* LOGO */}
        <div className="hidden h-24 items-center justify-center md:flex ">
          <Image
            src="/Instagram-small.svg"
            width={200}
            height={200}
            alt="logo"
            className="my-auto hidden h-full w-6 self-center md:flex xl:hidden"
          />
          <Image
            src="/Instagram-large.svg"
            width={200}
            height={200}
            alt="logo"
            className="my-auto hidden h-full w-28 self-center xl:flex"
          />
        </div>
        {/* MENU ITEMS */}
        <div className="flex justify-around gap-6 md:flex-col md:items-center md:py-3 xl:items-start">
          <MenuItem menu="home" Icon={AiFillHome} />

          <MenuItem menu="Explore" Icon={MdOutlineExplore} />

          {sessionData && (
            <div
              className="hidden w-fit cursor-pointer md:flex xl:w-full"
              onClick={() => setPostModalOpen(true)}
            >
              <MenuItem menu="create" Icon={CgAddR} />
            </div>
          )}

          {sessionData && <UserProfile />}
          {!sessionData ? (
            <div
              className="h-[48px] w-fit cursor-pointer xl:w-full"
              onClick={() => void signIn("github")}
            >
              <MenuItem menu="Sign in" Icon={BiLogInCircle} />
            </div>
          ) : (
            <div
              className="h-[48px] w-fit cursor-pointer xl:w-full"
              onClick={() => void signOut()}
            >
              <MenuItem menu="Sign out" Icon={BiLogOutCircle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuItem({ Icon, menu }: { Icon: IconType; menu: string }) {
  return (
    <div className="flex h-[48px] w-fit items-center rounded-full p-1 text-[1.25rem] duration-75 hover:bg-zinc-700/50 hover:duration-100 xl:w-full ">
      <Icon size={24} color="white" className="m-2 inline-block" />
      <span className="hidden  pb-1 capitalize xl:inline-block xl:pr-5">
        {menu}
      </span>
    </div>
  );
}

function UserProfile() {
  const { data: sessionData } = useSession();
  return (
    <>
      {sessionData && (
        <div className="flex h-[48px] w-fit items-center rounded-full p-1 text-[1.25rem] duration-75 hover:bg-zinc-700/50 hover:duration-100 xl:w-full">
          <Image
            src={sessionData.user.image || "/default-avatar.webp"}
            height={50}
            width={50}
            alt="user-ava"
            className="m-2 h-[24px] w-[24px] rounded-full object-cover"
          />
          <div className="hidden flex-1 xl:inline-block">
            <p className="pb-1 text-[1.25rem]">Profile</p>
          </div>
        </div>
      )}
    </>
  );
}

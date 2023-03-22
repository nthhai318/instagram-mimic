import { signIn } from "next-auth/react";
import Image from "next/image";
import { type IconType } from "react-icons";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
// import { BsCollectionPlay } from "react-icons/bs";
// import { FaRegPaperPlane } from "react-icons/fa";
// import { CgHeart } from "react-icons/cg";

export default function Navbar() {
  return (
    <div className="h-14 w-full  md:h-full md:w-[72px] xl:w-56 ">
      <div className="fixed left-0 bottom-0 z-10 h-14 w-full bg-zinc-900/20 p-1 md:h-full md:w-[72px] xl:w-56 xl:p-4">
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

          <MenuItem menu="Explore" Icon={AiOutlineSearch} />

          {/* <li>
            <MenuItem menu="Video" Icon={BsCollectionPlay} />
          </li> */}
          {/* <li>
            <MenuItem menu="Messages" Icon={FaRegPaperPlane} />
          </li> */}
          {/* <li className="hidden md:flex">
            <MenuItem menu="Notifications" Icon={CgHeart} />
          </li> */}

          <UserProfile />
          <button
            className="h-[48px] w-fit rounded-full p-1 text-center text-[1.25rem] duration-75 hover:bg-zinc-700/50 hover:duration-100 xl:w-full"
            onClick={() => void signIn("github")}
          >
            <p>Sign In</p>
          </button>
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
  return (
    <div className="flex h-[48px] w-fit items-center rounded-full p-1 text-[1.25rem] duration-75 hover:bg-zinc-700/50 hover:duration-100 xl:w-full">
      <Image
        src="/default-avatar.webp"
        height={50}
        width={50}
        alt="user-ava"
        className="m-2 h-[24px] w-[24px] rounded-full object-cover"
      />
      <div className="hidden flex-1 xl:inline-block">
        <p className="pb-1 text-[1.25rem]">Profile</p>
      </div>
    </div>
  );
}

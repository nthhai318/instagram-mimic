import Image from "next/image";
import { type IconType } from "react-icons";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
// import { BsCollectionPlay } from "react-icons/bs";
// import { FaRegPaperPlane } from "react-icons/fa";
// import { CgHeart } from "react-icons/cg";

export default function Navbar() {
  return (
    <div className="md:w-18 h-12 w-full bg-zinc-900/20 md:h-full md:p-4 xl:w-56">
      <div className="h-full">
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
        <ul className="flex justify-around gap-6 py-3 md:flex-col">
          <li>
            <MenuItem menu="home" Icon={AiFillHome} />
          </li>
          <li>
            <MenuItem menu="Explore" Icon={AiOutlineSearch} />
          </li>
          {/* <li>
            <MenuItem menu="Video" Icon={BsCollectionPlay} />
          </li> */}
          {/* <li>
            <MenuItem menu="Messages" Icon={FaRegPaperPlane} />
          </li> */}
          {/* <li className="hidden md:flex">
            <MenuItem menu="Notifications" Icon={CgHeart} />
          </li> */}
          <li>
            <UserProfile />
          </li>
        </ul>
      </div>
    </div>
  );
}

function MenuItem({ Icon, menu }: { Icon: IconType; menu: string }) {
  return (
    <div className="flex h-[48px] items-center rounded-full p-1 pb-2 text-[1.25rem] duration-75 hover:bg-zinc-700/50 hover:duration-100 ">
      <Icon size={24} color="white" className="m-2 inline-block" />
      <span className="hidden pr-5 capitalize lg:inline-block">{menu}</span>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex h-[48px] items-center rounded-full p-1 text-[1.25rem] duration-75 hover:bg-zinc-700/50 hover:duration-100 ">
      <Image
        src="/default-avatar.webp"
        height={50}
        width={50}
        alt="user-ava"
        className="m-2 h-[24px] w-[24px] rounded-full object-cover"
      />
      <div className="hidden flex-1 lg:inline-block">
        <p className="pb-1 text-[1.25rem]">Profile</p>
      </div>
    </div>
  );
}

import Image from "next/image";
import { CgAddR } from "react-icons/cg";

export default function Header() {
  return (
    <div className="flex h-[60px] w-full items-center justify-between px-4">
      <Image
        src="/Instagram-large.svg"
        width={200}
        height={200}
        alt="logo"
        className="my-auto h-fit w-28 self-center"
      />
      <div className="flex items-center gap-5">
        <CgAddR className="hover:scale-105 hover:brightness-90" size={24} />
        {/* <CgHeart className="hover:scale-105 hover:brightness-90" size={24} /> */}
      </div>
    </div>
  );
}

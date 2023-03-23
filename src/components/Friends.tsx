import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export type FakeFriends = {
  gender: string;
  name: { title: string; first: string; last: string };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}[];

export default function Friends() {
  const [friends, setFriends] = useState<FakeFriends>([]);

  useEffect(() => {
    fetch("api/fakeUser")
      .then((res) => res.json() as Promise<FakeFriends>)
      .then((data) => setFriends(data))
      .catch((err) => console.log(err));
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mt-8 w-full max-w-[630px] p-4 px-8">
      <div
        ref={ref}
        className="scrollbar-hide  w-full overflow-x-auto scroll-smooth"
      >
        {friends && (
          <div className="flex w-max flex-nowrap gap-4   py-5">
            {friends.map((user) => (
              <div key={user.email}>
                <div className="gradient-border ">
                  <Image
                    src={user.picture.thumbnail}
                    width={100}
                    height={100}
                    alt={`${user.name.first} ${user.name.last} ava`}
                    className="h-14 w-14 rounded-full border"
                  />
                </div>
                <p className="w-14 break-words text-center text-sm">
                  {user.name.last}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          if (ref.current) {
            ref.current.scrollLeft -= 200;
          }
        }}
        className="absolute top-[60px] left-0 z-10"
      >
        <HiOutlineChevronLeft size={30} />
      </button>

      <button
        onClick={() => {
          if (ref.current) {
            ref.current.scrollLeft += 200;
          }
        }}
        className="absolute right-0 top-[60px] z-10"
      >
        <HiOutlineChevronRight size={30} />
      </button>
    </div>
  );
}

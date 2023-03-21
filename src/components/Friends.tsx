import Image from "next/image";

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

export default function Friends({ friends }: { friends: FakeFriends }) {
  return (
    <div className="relative mt-8 w-full max-w-[630px] overflow-x-hidden p-4">
      <div className="scroll flex w-max flex-nowrap gap-4 py-5">
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
      <button></button>
    </div>
  );
}

import { type GetServerSideProps } from "next";

type Users = {
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
  return <div className="w-full max-w-[630px] bg-zinc-700">Friends</div>;
}

export const getServerSideProps: GetServerSideProps<{
  fakeUser: Users;
}> = async () => {
  const res = await fetch("/api/fakeUser");
  const fakeUser = await res.json();

  return {
    props: {
      fakeUser,
    },
  };
};

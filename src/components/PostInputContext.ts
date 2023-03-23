import { type Dispatch, type SetStateAction, createContext } from "react";

type PostInputContextValue = {
  postModalOpen: boolean;
  setPostModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const PostInputContext = createContext<PostInputContextValue>({
  postModalOpen: false,
  setPostModalOpen: () => void {},
});
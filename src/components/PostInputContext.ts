import { type Dispatch, type SetStateAction, createContext } from "react";

type PostInputContextValue = {
  postModalOpen: boolean;
  setPostModalOpen: Dispatch<SetStateAction<boolean>>;
  logModalOpen: boolean;
  setLogModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<PostInputContextValue>({
  postModalOpen: false,
  setPostModalOpen: () => void {},
  logModalOpen: false, 
  setLogModalOpen: () => void {},
});
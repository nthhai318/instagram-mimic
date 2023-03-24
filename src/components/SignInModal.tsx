import { useContext } from "react";
import Modal from "./Modal";
import { ModalContext } from "./PostInputContext";
import { signIn } from "next-auth/react";

export default function SignInModal() {
  const { logModalOpen, setLogModalOpen } = useContext(ModalContext);

  return (
    <>
      {logModalOpen && (
        <Modal handleClick={() => setLogModalOpen(false)}>
          <div className="h-fit w-full max-w-[500px] flex-col items-center justify-center overflow-hidden rounded-lg bg-zinc-700 py-10">
            <div className="mb-5 text-center uppercase">
              Sign in to Instagram-mimic
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <button
                className="w-fit rounded-lg bg-blue-500 py-4 px-5"
                onClick={() => void signIn("github")}
              >
                Sign in with Github
              </button>
              <button
                className="w-fit rounded-lg bg-blue-500 py-4 px-5"
                onClick={() => void signIn("google")}
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

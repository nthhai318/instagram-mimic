import { AiOutlineClose } from "react-icons/ai";

export default function Modal({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) {
  return (
    <div className="fixed inset-0 z-20 flex w-full items-center justify-center bg-zinc-900/80 py-12">
      {children}
      <button
        onClick={handleClick}
        className="group absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full hover:brightness-200"
      >
        <AiOutlineClose
          size={30}
          className="group-hover: absolute top-2 right-2 shadow-white drop-shadow-lg"
        />
      </button>
    </div>
  );
}

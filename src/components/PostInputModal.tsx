import Image from "next/image";
import { type ChangeEvent, useRef, useState, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { api } from "~/utils/api";
import Modal from "./Modal";
import { ModalContext } from "./PostInputContext";
import { useSession } from "next-auth/react";
import { type QueryObserverResult } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`
);

export default function PostInputModal({
  postsrefetch,
}: {
  postsrefetch: () => Promise<QueryObserverResult>;
}) {
  const { data: sessionData } = useSession();
  const ref = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [input, setInput] = useState<string | null>(null);
  const [finishPost, setFinishPost] = useState(false);
  const { postModalOpen, setPostModalOpen } = useContext(ModalContext);

  const sendPost = async () => {
    if (!img) {
      alert("Cannot post with empty image");
      return;
    }
    if (!input) {
      alert("Cannot post with empty caption");
      return;
    }

    const { data, error } = await supabase.storage
      .from("instagram-mimic")
      .upload(`posts/${sessionData?.user.id || "anon"}/${nanoid()}`, img);

    if (error) {
      alert("Uploaded failed, please try again");
      console.log(error);
      throw new Error("Cannot upload image");
    } else {
      const { data: getURL } = supabase.storage
        .from("instagram-mimic")
        .getPublicUrl(data.path);
      createPost.mutate({
        image: getURL.publicUrl,
        content: input,
      });
      setImg(null);
      setInput(null);
    }
  };

  // TODO: change router.reload to refetch post on main page
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      setFinishPost(true);
      setTimeout(() => {
        setFinishPost(false);
        setPostModalOpen(false);
      }, 2000);
      void postsrefetch();
    },
  });

  const addImageToState = (e: ChangeEvent<HTMLInputElement>) => {
    let file: File | undefined;
    if (e.target.files) {
      file = e.target.files[0];
    }
    if (file) {
      setImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        if (typeof readerEvent.target?.result == "string") {
          setPreview(readerEvent.target.result);
        }
      };
    }
  };

  return (
    <>
      {postModalOpen && (
        <Modal handleClick={() => setPostModalOpen(false)}>
          <div className="h-fit w-full max-w-[1050px] flex-col overflow-hidden rounded-lg bg-zinc-700">
            <div className="flex h-14 w-full items-center justify-center font-semibold">
              <p>Create new post</p>
            </div>
            {!finishPost ? (
              <div className="flex h-fit w-full flex-col  md:flex-row">
                <div
                  className="group relative flex aspect-square flex-1 cursor-pointer items-center justify-center bg-zinc-800/80 hover:bg-zinc-800/50"
                  onClick={() => ref.current?.click()}
                >
                  <input
                    type="file"
                    onChange={addImageToState}
                    hidden
                    ref={ref}
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  {img && preview ? (
                    <>
                      <Image
                        src={preview}
                        width={1000}
                        height={1000}
                        alt="preview"
                        className="absolute inset-0 h-full w-full object-cover group-hover:brightness-75"
                      />
                      <p className="z-30 hidden group-hover:flex">
                        Choose another image
                      </p>

                      <button
                        className="absolute left-3 top-3 rounded-full p-2 hover:bg-gray-500/50 hover:brightness-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImg(null);
                        }}
                      >
                        <AiOutlineClose size={24} />
                      </button>
                    </>
                  ) : (
                    <p className="z-30">Choose an image from your gallery</p>
                  )}
                </div>
                {sessionData && (
                  <div className="scrollbar-hide flex w-[340px] flex-col overflow-y-scroll ">
                    <div className="flex items-center gap-2 p-3">
                      <Image
                        src={sessionData.user.image || "/default-avatar.webp"}
                        width={50}
                        height={50}
                        className="h-14 w-14 rounded-full object-cover"
                        alt="ava"
                      />
                      <p className="font-bold">{sessionData.user.name}</p>
                    </div>
                    <div>
                      <textarea
                        placeholder="Write a caption"
                        className="w-full bg-transparent px-3 outline-none"
                        rows={3}
                        onChange={(e) => {
                          setInput(e.target.value);
                          e.target.style.height = "0";
                          e.target.style.height = `${Math.max(
                            e.target.scrollHeight,
                            72
                          )}px`;
                        }}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="w-fit rounded-lg bg-blue-700 p-2 px-5 hover:brightness-90"
                        onClick={() => void sendPost()}
                      >
                        Share
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="my-20 flex w-full items-center justify-center">
                <p>Your post has been shared</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

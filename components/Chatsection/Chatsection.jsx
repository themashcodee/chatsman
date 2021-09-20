import React, { useContext } from "react";
import Header from "./Header";
import Chats from "./Chats";
import Footer from "./Footer";
import Image from "next/image";

// STORE AND DATABASE
import { StoreContext } from "../../pages/_app";

const Chatsection = () => {
  const {
    USER: { user },
    RECEIVER: { receiver, setReceiver },
  } = useContext(StoreContext);

  if (!receiver)
    return (
      <section className="w-full h-full hidden sm:flex flex-grow justify-center items-center font-medium text-4xl text-cwhite-medium dark:text-cblack-3 select-none">
        Empty
      </section>
    );

  return (
    <section className="flex-grow flex flex-col h-full w-full relative">
      <Header
        name={receiver.name}
        userId={user.id}
        image={receiver.image}
        username={receiver.username}
        conversationId={receiver.conversationId}
        setReceiver={setReceiver}
      />

      {receiver.wallpaper && (
        <section className="absolute w-full h-[calc(100%-120px)] top-[56px] left-0">
          <div className="relative w-full h-full">
            <Image
              src={receiver.wallpaper}
              alt={"wallpaper"}
              layout={"fill"}
              objectFit="cover"
            ></Image>
            <div className="w-full h-full absolute inset-0 bg-black/60"></div>
          </div>
        </section>
      )}

      <Chats
        conversationId={receiver.conversationId}
        senderId={user.id}
        wallpaper={receiver.wallpaper}
      />
      <Footer conversationId={receiver.conversationId} senderId={user.id} />
    </section>
  );
};

export default Chatsection;

import React, { useContext } from "react";
import Header from "./Header";
import Chats from "./Chats";
import Footer from "./Footer";

// STORE AND DATABASE
import { StoreContext } from "../../pages/_app";

const Chatsection = () => {
  const { CURRENT_USER, CURRENT_RECEIVER } = useContext(StoreContext);

  if (!CURRENT_RECEIVER.receiver)
    return (
      <section className="w-full h-full hidden sm:flex flex-grow justify-center items-center font-medium text-4xl text-cwhite-darker dark:text-cblack-3 select-none">
        Empty
      </section>
    );

  return (
    <section className="flex-grow flex flex-col h-full w-full">
      <Header />
      <Chats
        chats={CURRENT_RECEIVER.receiver.chats}
        senderId={CURRENT_USER.id}
      />
      <Footer
        senderId={CURRENT_USER.id}
        receiverId={CURRENT_RECEIVER.receiver.id}
      />
    </section>
  );
};

export default Chatsection;

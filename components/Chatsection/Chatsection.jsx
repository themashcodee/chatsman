import React, { useContext } from "react";
import Header from "./Header";
import Chats from "./Chats";
import Footer from "./Footer";

// STORE AND DATABASE
import { StoreContext } from "../../pages/_app";

const Chatsection = () => {
  const {
    USER: { user },
    RECEIVER: { receiver },
  } = useContext(StoreContext);

  if (!receiver)
    return (
      <section className="w-full h-full hidden sm:flex flex-grow justify-center items-center font-medium text-4xl text-cwhite-darker dark:text-cblack-3 select-none">
        Empty
      </section>
    );

  return (
    <section className="flex-grow flex flex-col h-full w-full">
      <Header />
      <Chats chats={receiver.chats} senderId={user.id} />
      <Footer senderId={user.id} receiverId={receiver.id} />
    </section>
  );
};

export default Chatsection;

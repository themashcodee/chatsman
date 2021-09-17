import React, { useContext } from "react";
import Header from "./Header";
import Chats from "./Chats";
import Footer from "./Footer";

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
    <section className="flex-grow flex flex-col h-full w-full">
      <Header
        name={receiver.name}
        image={receiver.image}
        username={receiver.username}
        conversationId={receiver.conversationId}
        setReceiver={setReceiver}
      />
      <Chats conversationId={receiver.conversationId} senderId={user._id} />
      <Footer conversationId={receiver.conversationId} senderId={user._id} />
    </section>
  );
};

export default Chatsection;

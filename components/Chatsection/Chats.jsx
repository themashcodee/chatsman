import React from "react";
import Message from "./Message";

import { getMessageTime } from "../../helpers/getMessageTime";

const Chats = ({ chats, senderId }) => {
  return (
    <section className="scrollable flex flex-grow flex-col gap-2 p-3 w-full">
      {chats.map((message) => {
        return (
          <Message
            key={message.id}
            owner={`${senderId === message.senderId ? "sender" : "receiver"}`}
            message={message.message}
            time={getMessageTime(message.time)}
          />
        );
      })}
    </section>
  );
};

export default Chats;

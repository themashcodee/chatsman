import React, { useEffect, useState } from "react";
import Message from "./Message";

import { GET_MESSAGES } from "../../graphql/queries/index";
import { useQuery } from "@apollo/client";

import { getMessageTime } from "../../helpers/getMessageTime";

const Chats = ({ senderId, conversationId }) => {
  const { data, error, loading } = useQuery(GET_MESSAGES, {
    variables: { conversationId, senderId },
  });

  const [chats, setChats] = useState([]);
  const [note, setNote] = useState("");

  if (error) {
    setNote("There is some server error, try again later.");
  }

  useEffect(() => {
    if (data) setChats(data.getMessages.messages);
    setNote("There is no Messages.");
  }, [setChats, data]);

  return (
    <section className="scrollable flex flex-grow flex-col gap-2 p-3 w-full">
      {chats.length ? (
        chats.map((message) => {
          return (
            <Message
              key={message.id}
              owner={`${senderId === message.senderId ? "sender" : "receiver"}`}
              message={message.content}
              time={getMessageTime(+message.createdAt)}
            />
          );
        })
      ) : (
        <div className="text-cwhite-medium dark:text-cblack-5 text-center">
          {note}
        </div>
      )}
    </section>
  );
};

export default Chats;

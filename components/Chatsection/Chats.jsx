import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";

import { GET_MESSAGES } from "../../graphql/queries/index";
import { MESSAGE_ADDED } from "../../graphql/subscription/index";
import { useQuery, useSubscription } from "@apollo/client";

import { getMessageTime } from "../../helpers/getMessageTime";
import Image from "next/image";

const Chats = ({ senderId, conversationId, wallpaper }) => {
  const { data, error, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });
  const { data: subsData, error: subsError } = useSubscription(MESSAGE_ADDED, {
    variables: { conversationId },
  });

  const [chats, setChats] = useState([]);
  const [note, setNote] = useState("");

  const scrollCont = useRef(null);
  const scrollToBottom = () =>
    (scrollCont.current.scrollTop = scrollCont.current.scrollHeight);

  if (subsError) setNote("There is some server error, try again later.");
  if (error) setNote("There is some server error, try again later.");

  function fetchAllMessages() {
    refetch({ conversationId, isFull: true });
    if (data) return setChats(data.getMessages.messages);
  }

  useEffect(scrollToBottom);
  useEffect(() => {
    if (subsData) return setChats(subsData.messageAdded.messages);
    setNote("There is no Messages.");
  }, [subsData]);
  useEffect(() => {
    refetch();
    if (data) return setChats(data.getMessages.messages);
    setNote("There is no Messages.");
  }, [data, refetch, conversationId]);

  return (
    <section
      ref={scrollCont}
      className="scrollable flex flex-grow flex-col gap-2 p-3 w-full relative"
    >
      {wallpaper && (
        <>
          <Image
            src={wallpaper}
            alt={"wallpaper"}
            layout="fill"
            objectFit={"cover"}
          />
          <div className="absolute inset-0 w-full h-full bg-black/60"></div>
        </>
      )}
      {chats.length === 50 && (
        <div
          onClick={fetchAllMessages}
          className="text-center text-cwhite-darker pb-2 dark:text-cblack-5 cursor-pointer select-none"
        >
          Load older messages
        </div>
      )}
      {chats.length ? (
        chats.map((message) => {
          return (
            <Message
              key={message.id}
              id={message.id}
              senderId={message.senderId}
              conversationId={conversationId}
              isSender={senderId === message.senderId}
              message={message.content}
              isWallpaper={!!wallpaper}
              time={getMessageTime(+message.createdAt)}
            />
          );
        })
      ) : (
        <div
          className={`text-cwhite-medium dark:text-cblack-5 text-center z-10 ${
            wallpaper ? "dark:text-[#999999]" : null
          }`}
        >
          {note}
        </div>
      )}
    </section>
  );
};

export default Chats;

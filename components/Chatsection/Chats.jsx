import React, { useEffect, useState } from "react";
import Message from "./Message";
import { getMessageTime } from "../../helpers/getMessageTime";
import { GET_MESSAGES } from "../../graphql/queries/index";
import { MESSAGE_ADDED } from "../../graphql/subscription/index";
import { useQuery, useSubscription } from "@apollo/client";

const Chats = ({ senderId, conversationId, wallpaper, setReply }) => {
  const { data, error, refetch } = useQuery(GET_MESSAGES, {
    fetchPolicy: "cache-and-network",
    variables: { conversationId },
  });
  const { data: subsData, error: subsError } = useSubscription(MESSAGE_ADDED, {
    variables: { conversationId },
  });

  const [chats, setChats] = useState([]);
  const [showAllMessage, setShowAllMessages] = useState(false);

  if (subsError) setNote("There is some server error, try again later.");
  if (error) setNote("There is some server error, try again later.");

  const fetchAllMessages = () => {
    setShowAllMessages(true);
    refetch({ conversationId, isFull: true });
  };

  useEffect(() => {
    if (subsData) {
      const message = subsData.messageAdded.messages[0];
      setChats((prev) => {
        const isDeleted = prev.find((mess) => mess.id === message.id);
        if (isDeleted) return prev.filter((mess) => mess.id !== message.id);
        return [message, ...prev];
      });
    }
  }, [subsData]);

  useEffect(() => data && setChats(data.getMessages.messages), [data]);

  return (
    <section className="scrollable flex flex-col-reverse gap-2 p-3 w-full mb-auto">
      {chats.length
        ? showAllMessage
          ? chats.map((message) => {
              return (
                <Message
                  key={message.id}
                  id={message.id}
                  senderId={message.senderId}
                  conversationId={conversationId}
                  isSender={senderId === message.senderId}
                  message={message.content}
                  type={message.type}
                  replyId={message.replyId}
                  replyContent={message.replyContent}
                  isWallpaper={!!wallpaper}
                  time={getMessageTime(+message.createdAt)}
                  setReply={setReply}
                />
              );
            })
          : chats.slice(0, 49).map((message) => {
              return (
                <Message
                  key={message.id}
                  id={message.id}
                  senderId={message.senderId}
                  conversationId={conversationId}
                  isSender={senderId === message.senderId}
                  message={message.content}
                  type={message.type}
                  replyId={message.replyId}
                  replyContent={message.replyContent}
                  isWallpaper={!!wallpaper}
                  time={getMessageTime(+message.createdAt)}
                  setReply={setReply}
                />
              );
            })
        : null}

      {/* LOAD MORE MESSAGES */}
      {!showAllMessage && chats.length > 49 && (
        <div
          onClick={fetchAllMessages}
          className={`text-center text-cwhite-darker pb-2 dark:text-cblack-5 cursor-pointer select-none
          ${!!wallpaper ? "dark:text-cwhite-darker" : null}`}
        >
          Load older messages
        </div>
      )}
    </section>
  );
};

export default Chats;

import React, { useEffect, useState } from "react";
import Message from "./Message";
import { getMessageTime } from "../../helpers/getMessageTime";
import { GET_MESSAGES } from "../../graphql/queries/index";
import { MESSAGE_ADDED } from "../../graphql/subscription/index";
import { useQuery, useSubscription } from "@apollo/client";

const Chats = ({ senderId, conversationId, wallpaper }) => {
  const { data, error, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });
  const { data: subsData, error: subsError } = useSubscription(MESSAGE_ADDED, {
    variables: { conversationId },
  });

  const [chats, setChats] = useState([]);

  if (subsError) setNote("There is some server error, try again later.");
  if (error) setNote("There is some server error, try again later.");

  const fetchAllMessages = () => refetch({ conversationId, isFull: true });

  useEffect(
    () => subsData && setChats(subsData.messageAdded.messages),
    [subsData]
  );
  useEffect(() => data && setChats(data.getMessages.messages), [data]);
  useEffect(refetch, [conversationId, refetch]);

  return (
    <section className="scrollable bg-scroll flex flex-col-reverse gap-2 p-3 w-full">
      {chats.length
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
                isWallpaper={!!wallpaper}
                time={getMessageTime(+message.createdAt)}
              />
            );
          })
        : null}

      {/* LOAD MORE MESSAGES */}
      {chats.length === 50 && (
        <div
          onClick={fetchAllMessages}
          className="text-center text-cwhite-darker pb-2 dark:text-cblack-5 cursor-pointer select-none"
        >
          Load older messages
        </div>
      )}
    </section>
  );
};

export default Chats;

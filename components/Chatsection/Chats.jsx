import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";

import { GET_MESSAGES } from "../../graphql/queries/index";
import { MESSAGE_ADDED } from "../../graphql/subscription/index";
import { useQuery, useSubscription } from "@apollo/client";

import { getMessageTime } from "../../helpers/getMessageTime";

const Chats = ({ senderId, conversationId }) => {
  const { data, error, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });
  const { data: subscribedData, error: subscribedError } = useSubscription(
    MESSAGE_ADDED,
    { variables: { conversationId } }
  );

  const [chats, setChats] = useState([]);
  const [note, setNote] = useState("");

  const scrollCont = useRef(null);
  const scrollToBottom = () =>
    (scrollCont.current.scrollTop = scrollCont.current.scrollHeight);

  if (subscribedError) setNote("There is some server error, try again later.");
  if (error) setNote("There is some server error, try again later.");

  function fetchAllMessages() {
    refetch({ conversationId, isFull: true });
    if (data) {
      return setChats(data.getMessages.messages);
    }
  }

  useEffect(scrollToBottom);
  useEffect(() => {
    if (subscribedData) {
      return setChats(subscribedData.messageAdded.messages);
    }
    setNote("There is no Messages.");
  }, [subscribedData]);
  useEffect(() => {
    refetch();
    if (data) {
      return setChats(data.getMessages.messages);
    }
    setNote("There is no Messages.");
  }, [data, refetch, conversationId]);

  return (
    <section
      ref={scrollCont}
      className="scrollable flex flex-grow flex-col gap-2 p-3 w-full"
    >
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
              time={getMessageTime(+message.createdAt)}
            />
          );
        })
      ) : (
        <div className="text-cwhite-medium dark:text-cblack-5 text-center">
          {note}
        </div>
      )}
      <div></div>
    </section>
  );
};

export default Chats;

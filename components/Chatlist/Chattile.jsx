import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Profile from "../icons/User";
import moment from "moment";

// DATABASE AND STORE
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USER, GET_LAST_MESSAGE } from "../../graphql/queries/index";
import { LAST_MESSAGE_ADDED } from "../../graphql/subscription";
import { StoreContext } from "../../pages/_app";

const ChatTile = ({ conversationId, members }) => {
  const {
    RECEIVER: { receiver, setReceiver },
    USER: { user },
  } = useContext(StoreContext);

  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState("");

  const receiverId = members.find((id) => id !== user._id);
  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id: receiverId },
  });

  const { data: LastMessageData, error: LastMessageError } = useQuery(
    GET_LAST_MESSAGE,
    { variables: { conversationId } }
  );
  const {
    data: SubscriptionLastMessageData,
    error: SubscriptionLastMessageError,
  } = useSubscription(LAST_MESSAGE_ADDED, { variables: { conversationId } });
  useEffect(() => {
    if (LastMessageData && LastMessageData.getLastMessage.messages) {
      const { content, type, createdAt } =
        LastMessageData.getLastMessage.messages;
      setLastMessage(type === "TEXT" ? content : "an image");
      setLastMessageTime(moment(+createdAt).fromNow());
    }
  }, [LastMessageData]);
  useEffect(() => {
    if (
      SubscriptionLastMessageData &&
      SubscriptionLastMessageData.lastMessageAdded.messages
    ) {
      const { content, type, createdAt } =
        SubscriptionLastMessageData.lastMessageAdded.messages;
      setLastMessage(type === "TEXT" ? content : "an image");
      setLastMessageTime(moment(+createdAt).fromNow());
    }
  }, [SubscriptionLastMessageData]);

  // ERROR HANDLING
  if (LastMessageError) return "There is Error";
  if (SubscriptionLastMessageError) return "There is an Error";
  if (error) return "There is Error";
  if (loading) return null;

  const receiverObj = data.getUser.user;
  const { image, name, _id, username } = receiverObj;

  function openChat() {
    if (receiver && receiver.name === name) return;
    setReceiver({ image, name, _id, conversationId, username });
  }

  return (
    <section
      onClick={openChat}
      className="bg-cwhite-lightest dark:bg-cblack-3 hover:bg-cwhite-light dark:hover:bg-cblack-4 select-none cursor-pointer rounded-lg flex-shrink-0 flex justify-between items-center h-16 w-full px-3"
    >
      <div className="flex items-center gap-3">
        <div className="relative overflow-hidden h-10 w-10 rounded-full p-2 bg-cwhite-light dark:bg-cblack-5 text-cblack-5 dark:text-cwhite-darker">
          {image ? (
            <Image
              src={image}
              alt="profile image"
              layout="fill"
              objectFit="cover"
            ></Image>
          ) : (
            <Profile />
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="font-medium text-lg">
            {name.length > 15 ? name.substr(0, 15) + "." : name}
          </h2>
          <p className="text-xxm text-cblack-5 dark:text-cwhite-darker">
            {lastMessage.length < 15
              ? lastMessage
              : lastMessage.substr(0, 15) + "..."}
            {lastMessageTime && " · " + lastMessageTime}
          </p>
        </div>
      </div>

      <div
        className={`
        w-3 h-3 rounded-full 
        ${true ? "bg-cgreen" : "bg-cred-medium"}
        `}
      ></div>
    </section>
  );
};

export default ChatTile;

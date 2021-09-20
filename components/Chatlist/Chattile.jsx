import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Profile from "../icons/User";
import moment from "moment";

// DATABASE AND STORE
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USER, LAST_MESSAGE } from "../../graphql/queries/index";
import { LAST_MESSAGE_ADDED } from "../../graphql/subscription";
import { StoreContext } from "../../pages/_app";

const ChatTile = ({ conversationId, members, wallpaper }) => {
  // Fetching data from store
  const {
    RECEIVER: { receiver, setReceiver },
    USER: { user },
  } = useContext(StoreContext);

  // States
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState("");
  const [receiverObj, setReceiverObj] = useState(null);

  // QUERIES AND SUBSCRIPTION
  const receiverId = members.find((id) => id !== user.id);
  const { data, error, refetch } = useQuery(GET_USER, {
    variables: { id: receiverId },
  });
  const {
    data: LMData,
    error: LMError,
    refetch: SubsRefetch,
  } = useQuery(LAST_MESSAGE, {
    variables: { conversationId },
  });
  const { data: SubsData, error: SubsError } = useSubscription(
    LAST_MESSAGE_ADDED,
    { variables: { conversationId } }
  );

  // USE EFFECTS
  useEffect(() => {
    refetch();
    data && setReceiverObj(data.getUser.user);
  }, [data, refetch, members]);
  useEffect(() => {
    SubsRefetch();
    if (LMData && LMData.getLastMessage.messages) {
      const { content, type, createdAt } = LMData.getLastMessage.messages;
      setLastMessage(type === "TEXT" ? content : "Image");
      setLastMessageTime(moment(+createdAt).fromNow());
    }
  }, [LMData, SubsRefetch]);
  useEffect(() => {
    if (SubsData && SubsData.lastMessageAdded.success) {
      if (SubsData.lastMessageAdded.messages) {
        const { content, type, createdAt } = SubsData.lastMessageAdded.messages;
        setLastMessage(type === "TEXT" ? content : "Image");
        return setLastMessageTime(moment(+createdAt).fromNow());
      }
      setLastMessage("");
      setLastMessageTime("");
    }
  }, [SubsData]);

  // ERROR HANDLING
  if (LMError) return "There is some errors";
  if (SubsError) return "There is some errors";
  if (error) return "There is some errors";
  if (!receiverObj) return null;

  const { image, name, _id, username } = receiverObj;

  function openChat() {
    if (receiver && receiver.name === name) return;
    setReceiver({ image, name, id: _id, conversationId, username, wallpaper });
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

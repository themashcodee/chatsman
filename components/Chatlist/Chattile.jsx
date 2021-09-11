import React, { useContext } from "react";
import Image from "next/image";
import Profile from "../icons/User";

// DATABASE AND STORE
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/index";
import { StoreContext } from "../../pages/_app";

const ChatTile = ({ conversationId, members }) => {
  const {
    RECEIVER: { receiver, setReceiver },
    USER: { user },
  } = useContext(StoreContext);

  const receiverId = members.find((id) => id !== user.id);

  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id: receiverId },
  });

  if (error) {
    console.log(error);
    return "There is Error";
  }

  // function openChat(id1, id2) {
  //   if (RECEIVER.receiver && RECEIVER.receiver.name === name) return;

  //   if (!IS_CHAT_OPEN.isChatOpen) IS_CHAT_OPEN.setIsChatOpen(true);
  //   RECEIVER.setReceiver({
  //     id,
  //     name,
  //     img,
  //     online,
  //     chats: getMutualChat(id1, id2),
  //   });
  // }
  if (loading) return null;

  const receiverObj = data.getUser.user;
  const { image, name, id } = receiverObj;

  return (
    <section
      // onClick={() => openChat(id, CURRENT_USER.id)}
      className="bg-cwhite-light dark:bg-cblack-3 hover:bg-opacity-40 select-none cursor-pointer rounded-lg flex-shrink-0 flex justify-between items-center h-16 w-full px-3"
    >
      <div className="flex items-center gap-3">
        <div className="relative overflow-hidden h-10 w-10 rounded-full p-2 bg-cwhite-medium dark:bg-cblack-5 text-cblack-5 dark:text-cwhite-darker">
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
            {"this is a last message"}
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

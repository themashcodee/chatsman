import React, { useContext } from "react";
import Image from "next/image";

// DATABASE AND STORE
import { StoreContext } from "../../pages/_app";

// HELPER
import { getMutualChat } from "../../helpers/getMutualChat";

const ChatTile = ({ id, name, img, lastmessage, online }) => {
  const { IS_CHAT_OPEN, CURRENT_RECEIVER, CURRENT_USER } =
    useContext(StoreContext);

  function openChat(id1, id2) {
    if (CURRENT_RECEIVER.receiver && CURRENT_RECEIVER.receiver.name === name)
      return;
    if (!IS_CHAT_OPEN.isChatOpen) IS_CHAT_OPEN.setIsChatOpen(true);
    CURRENT_RECEIVER.setReceiver({
      id,
      name,
      img,
      online,
      chats: getMutualChat(id1, id2),
    });
  }

  return (
    <section
      onClick={() => openChat(id, CURRENT_USER.id)}
      className="bg-cwhite-light dark:bg-cblack-3 hover:bg-opacity-40 select-none cursor-pointer rounded-lg flex-shrink-0 flex justify-between items-center h-16 w-full px-3"
    >
      <div className="flex items-center gap-3">
        <div className="relative overflow-hidden h-10 w-10 rounded-full">
          <Image
            src={img}
            alt="profile image"
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
        <div className="flex flex-col">
          <h2 className="font-medium text-lg">
            {name.length > 15 ? name.substr(0, 15) + "." : name}
          </h2>
          <p className="text-xxm text-cblack-5 dark:text-cwhite-darker">
            {lastmessage}
          </p>
        </div>
      </div>

      <div
        className={`
        w-3 h-3 rounded-full 
        ${online ? "bg-cgreen" : "bg-cred-medium"}
        `}
      ></div>
    </section>
  );
};

export default ChatTile;

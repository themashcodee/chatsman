import React, { useContext } from "react";
import Add from "../icons/Add";
import ChatTile from "./Chattile";
import Header from "./Header";

// STORE
import { StoreContext } from "../../pages/_app";

// HELPERS
import { getLastMessage } from "../../helpers/getLastMessage";
import { getMutualChat } from "../../helpers/getMutualChat";
import { getFriendList } from "../../helpers/getFriendList";

const Chatlist = () => {
  const { CURRENT_USER, IS_CHAT_OPEN } = useContext(StoreContext);

  const receivers = getFriendList(CURRENT_USER);

  return (
    <aside
      className={`
      ${IS_CHAT_OPEN.isChatOpen ? "hidden" : "flex"} 
      sm:flex flex-col flex-grow relative w-96 sm:border-r border-cwhite-light dark:border-cblack-3
      `}
    >
      <Header
        name={CURRENT_USER.name}
        img={CURRENT_USER.img}
        id={CURRENT_USER.id}
      />

      <article className="scrollable flex flex-col gap-2 p-2 overflow-auto">
        {receivers.map((receiver) => {
          const mutualChat = getMutualChat(receiver.id, CURRENT_USER.id);
          const lastmessage = getLastMessage(mutualChat);

          return (
            <ChatTile
              key={receiver.id}
              id={receiver.id}
              name={receiver.name}
              img={receiver.img}
              lastmessage={lastmessage}
              online={receiver.online}
            />
          );
        })}
      </article>

      <button className="absolute right-4 bottom-4 w-10 h-10 bg-cyellow rounded-full p-1">
        <Add></Add>
      </button>
    </aside>
  );
};

export default Chatlist;

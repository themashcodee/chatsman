import React, { useContext } from "react";
import Add from "../icons/Add";
import ChatTile from "./Chattile";
import Header from "./Header";

// DB QUERY
import { useQuery } from "@apollo/client";
import { GET_CONVERSATIONS } from "../../graphql/queries/index";

// STORE
import { StoreContext } from "../../pages/_app";

const Chatlist = () => {
  const {
    USER: { user },
    RECEIVER: { receiver },
  } = useContext(StoreContext);

  const { data, error } = useQuery(GET_CONVERSATIONS);
  let conversations;
  if (data && data.getConversations.success) {
    conversations = data.getConversations.conversations;
  }

  // ERROR STATE
  if (error) return "There is Error";
  // LOADING STATE
  if (!conversations) return null;

  return (
    <aside
      className={`
      ${receiver ? "hidden" : "flex"} 
      sm:flex flex-col flex-grow relative flex-shrink-0 w-80 xl:w-96 sm:border-r border-cwhite-light dark:border-cblack-3
      `}
    >
      <Header name={user.name} img={user.img} id={user.id} />

      <article className="scrollable flex flex-col gap-2 p-2 overflow-auto">
        {conversations.map((conversation) => {
          return (
            <ChatTile
              key={conversation.id}
              conversationId={conversation.id}
              name={conversation.name}
              image={conversation.image}
              members={conversation.members}
              isGroup={conversation.isGroup}
            />
          );
        })}
      </article>

      <button className="absolute right-4 bottom-4 w-10 h-10 bg-cyellow text-cblack-5 rounded-full p-1">
        <Add></Add>
      </button>
    </aside>
  );
};

export default Chatlist;

import React, { useContext, useEffect, useState } from "react";
import ChatIcon from "../icons/Chat";
import Header from "./Header";
import ChatTile from "./Chattile";

// DB QUERY
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_CONVERSATIONS } from "../../graphql/queries/index";
import { CREATE_CONVERSATION } from "../../graphql/mutations/index";
import { CONVERSATION_ADDED } from "../../graphql/subscription";

// STORE
import { StoreContext } from "../../pages/_app";

const Chatlist = () => {
  const {
    USER: { user },
    RECEIVER: { receiver, setReceiver },
  } = useContext(StoreContext);

  const [conversations, setConversations] = useState([]);

  // ADD CONVERSATION FUNCTIONING
  const [create, { error: convError }] = useMutation(CREATE_CONVERSATION);
  async function addConversation() {
    const usrn = prompt("Username");
    if (!usrn) return;
    if (usrn.length < 3 || usrn.length > 10) return alert("Invalid Username");

    try {
      const result = await create({
        variables: { members: [usrn, user.username] },
      });

      if (convError)
        return alert("There is some server error, try again later.");

      const { message, success } = result.data.createConversation;
      if (!success) return alert(message);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  // SUBSCRIPTION
  const { data: subsData, error: subsError } = useSubscription(
    CONVERSATION_ADDED,
    { variables: { id: user.id } }
  );
  useEffect(() => {
    if (subsData) {
      setConversations(subsData.conversationAdded.conversations);
      setReceiver((prev) => {
        if (prev) {
          const newReceiver = subsData.conversationAdded.conversations.find(
            (conv) => conv.id === prev.conversationId
          );
          return { ...prev, wallpaper: newReceiver.wallpaper };
        }
      });
    }
  }, [subsData, setReceiver]);

  // GET CONVERSATION
  const { data, error } = useQuery(GET_CONVERSATIONS, {
    variables: { id: user.id },
    fetchPolicy: "cache-and-network",
  });
  useEffect(
    () => data && setConversations(data.getConversations.conversations),
    [data]
  );

  // ERROR STATE
  if (subsError) return "There is some server error";
  if (error) return "There is errors";
  // LOADING STATE
  if (!conversations) return null;

  return (
    <aside
      className={`
      ${receiver ? "hidden" : "flex"} 
      sm:flex flex-col flex-grow relative flex-shrink-0 w-80 xl:w-96 sm:border-r border-cwhite-light dark:border-cblack-3
      `}
    >
      <Header name={user.name} username={user.username} image={user.image} />

      <article className="scrollable flex flex-col gap-2 p-2 overflow-auto">
        {conversations.map((conversation) => {
          return (
            <ChatTile
              key={conversation.id}
              conversationId={conversation.id}
              members={conversation.members}
              wallpaper={conversation.wallpaper}
              lastMessage={conversation.lastMessage?.content}
              lastMessageTime={conversation.lastMessageTime}
              lastMessageType={conversation.lastMessage?.type}
            />
          );
        })}
      </article>

      <button
        onClick={addConversation}
        className="fixed sm:absolute right-4 bottom-4 w-12 h-12 bg-cblue text-white rounded-full p-2"
      >
        <ChatIcon></ChatIcon>
      </button>
    </aside>
  );
};

export default Chatlist;

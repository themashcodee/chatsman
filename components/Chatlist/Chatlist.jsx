import React, { useContext, useEffect, useState } from "react";
import ChatIcon from "../icons/Chat";
import ChatTile from "./Chattile";
import Header from "./Header";

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
    RECEIVER: { receiver },
  } = useContext(StoreContext);

  // ADD CONVERSATION FUNCTIONING
  const [create, { error: convError }] = useMutation(CREATE_CONVERSATION);
  async function addConversation() {
    const usrn = prompt("Username");
    if (!usrn) return;
    if (usrn.length < 3 || usrn.length > 10) return alert("Invalid Username");

    try {
      const result = await create({
        variables: { isGroup: false, members: [usrn, user.username] },
      });

      if (convError) return alert("There is some server errors");

      const { message, success } = result.data.createConversation;
      if (!success) return alert(message);
    } catch (err) {
      return alert("There is some server error, try again later.");
    }
  }

  // SUBSCRIPTION
  const { data: subscribedData, error: subscribedError } = useSubscription(
    CONVERSATION_ADDED,
    { variables: { id: user._id } }
  );
  useEffect(() => {
    if (subscribedData)
      setConversations(subscribedData.conversationAdded.conversations);
  }, [subscribedData]);

  // GET CONVERSATION
  const { data, error, refetch } = useQuery(GET_CONVERSATIONS, {
    variables: { id: user._id },
  });
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    refetch();
    if (data && data.getConversations.success) {
      setConversations(data.getConversations.conversations);
    }
  }, [data, refetch]);

  // ERROR STATE
  if (subscribedError) return "There is some server error, try again later.";
  if (error) {
    console.log(error);
    return "There is Error";
  }
  // LOADING STATE
  if (!conversations) return null;

  return (
    <aside
      className={`
      ${receiver ? "hidden" : "flex"} 
      sm:flex flex-col flex-grow relative flex-shrink-0 w-80 xl:w-96 sm:border-r border-cwhite-light dark:border-cblack-3
      `}
    >
      <Header name={user.name} image={user.image} id={user.id} />

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

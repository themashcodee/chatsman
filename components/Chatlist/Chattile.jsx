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

  const receiverId = members.find((id) => id !== user._id);

  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id: receiverId },
  });

  if (error) {
    console.log(error);
    return "There is Error";
  }
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

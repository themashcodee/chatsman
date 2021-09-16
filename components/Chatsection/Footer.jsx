import React, { useState } from "react";
import ImageIcon from "../icons/Image";
import Send from "../icons/Send";

import { CREATE_MESSAGE } from "../../graphql/mutations/index";
import { useMutation } from "@apollo/client";

const Footer = ({ senderId, conversationId }) => {
  const [message, setMessage] = useState("");
  const [createMessage, { createMessageError }] = useMutation(CREATE_MESSAGE);

  async function sendMessage(e) {
    e.preventDefault();
    if (!message.length) return;
    setMessage("");

    try {
      const result = await createMessage({
        variables: {
          conversationId,
          senderId,
          type: "TEXT",
          content: message,
        },
      });
      if (createMessageError)
        return alert("There is some server error, try again later.");

      const { message: resultMessage, success } = result.data.createMessage;
      if (!success) return alert(resultMessage);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  return (
    <form
      onSubmit={(e) => sendMessage(e)}
      className="h-14 p-2 w-full flex gap-2 flex-shrink-0 items-center border-t border-cwhite-light dark:border-cblack-3"
    >
      <div className="flex items-center bg-cwhite-light dark:bg-cblack-3 h-full w-full px-2 rounded-lg">
        <div className="w-7 h-7 p-1 bg-cwhite-medium dark:bg-cblack-4 rounded">
          <ImageIcon />
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-1.5 border-none outline-none w-full bg-transparent"
          required
        />
      </div>
      <button
        type="submit"
        className="h-9 w-9 p-2 bg-cblue text-white rounded-full"
      >
        <Send />
      </button>
    </form>
  );
};

export default Footer;

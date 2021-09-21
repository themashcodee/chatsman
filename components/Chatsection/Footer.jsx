import React, { useState } from "react";
import ImageIcon from "../icons/Image";
import Send from "../icons/Send";
import Close from "../icons/Close";

import { CREATE_MESSAGE } from "../../graphql/mutations/index";
import { useMutation } from "@apollo/client";

const Footer = ({ senderId, conversationId }) => {
  const [message, setMessage] = useState("");
  const [createMessage, { error }] = useMutation(CREATE_MESSAGE);
  const [file, setFile] = useState(null);

  async function sendMessage(e) {
    e.preventDefault();
    try {
      if (file) return sendImage();
      if (!message.length) return;
      setMessage("");

      const result = await createMessage({
        variables: {
          conversationId,
          senderId,
          content: message,
        },
      });
      if (error) return alert("There is some server error, try again later.");

      const { message: resultMessage, success } = result.data.createMessage;
      if (!success) return alert(resultMessage);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  async function sendImage() {
    try {
      const data = new FormData();
      data.append("file", file);
      setFile(null);
      data.append("id", conversationId);
      data.append("senderId", senderId);

      const response = await (
        await fetch(process.env.API_URI_CONV_IMAGE_UPLOAD, {
          method: "POST",
          body: data,
        })
      ).json();

      if (!response.success) alert(response.message);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  return (
    <form
      onSubmit={(e) => sendMessage(e)}
      className="h-16 p-2 w-full flex gap-2 flex-shrink-0 items-center border-t border-cwhite-light dark:border-cblack-3 relative"
    >
      <article
        className={`
        w-full absolute h-12 rounded-t-xl bg-green-400/50 text-white backdrop-blur-sm left-0 -top-12 transition select-none
        duration-200 z-50 font-medium px-3 flex items-center origin-bottom justify-between
        ${file ? "scale-y-100" : "scale-y-0"}
        `}
      >
        {file ? (
          <>
            <div className="opacity-100">
              {file.name.length < 20
                ? file.name
                : file.name.substr(0, 20) + "..."}
            </div>
            <div
              className="w-6 h-6 cursor-pointer"
              onClick={() => setFile(null)}
            >
              <Close />
            </div>
          </>
        ) : null}
      </article>

      <div className="flex items-center bg-cwhite-light dark:bg-cblack-3 h-full w-full px-2 rounded-lg cursor-pointer">
        <div className="w-7 h-7 p-1 bg-cwhite-medium dark:bg-cblack-4 rounded relative">
          <label
            htmlFor="file"
            className="w-full h-full flex justify-center items-center cursor-pointer"
          >
            <ImageIcon />
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="w-0 h-0 absolute inset-0"
            onClick={(e) => (e.target.value = null)}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`
          px-1.5 border-none outline-none w-full bg-transparent
          ${file ? "cursor-not-allowed" : null}
          `}
          required
          disabled={file ? true : false}
        />
      </div>
      <button
        type="submit"
        className="h-9 w-9 p-2 bg-cblue flex-shrink-0 text-white rounded"
      >
        <Send />
      </button>
    </form>
  );
};

export default Footer;

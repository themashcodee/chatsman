import React, { useState } from "react";
import ImageIcon from "../icons/Image";
import Send from "../icons/Send";
import Close from "../icons/Close";

import { CREATE_MESSAGE } from "../../graphql/mutations/index";
import { useMutation } from "@apollo/client";

const Footer = ({ senderId, conversationId, reply, setReply }) => {
  const [message, setMessage] = useState("");
  const [createMessage, { error }] = useMutation(CREATE_MESSAGE);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    try {
      if (file) return sendImage();
      if (!message.length) return;
      setMessage("");

      let variables = reply
        ? {
            conversationId,
            senderId,
            content: message,
            replyContent: reply.replyContent,
            replyId: reply.replyId,
          }
        : { conversationId, senderId, content: message };
      setReply(null);
      const result = await createMessage({ variables });
      if (error) return alert("There is some server error, try again later.");

      const { message: resultMessage, success } = result.data.createMessage;
      if (!success) return alert(resultMessage);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  async function sendImage() {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      setReply(null);
      setFile(null);
      data.append("id", conversationId);
      data.append("senderId", senderId);
      if (reply) {
        data.append("replyContent", reply.replyContent);
        data.append("replyId", reply.replyId);
      }

      const response = await (
        await fetch(process.env.API_URI_CONV_IMAGE_UPLOAD, {
          method: "POST",
          body: data,
        })
      ).json();
      if (!response.success) alert(response.message);
      setUploading(false);
    } catch (err) {
      setUploading(false);
      alert("There is some server error, try again later.");
    }
  }

  return (
    <form
      onSubmit={(e) => sendMessage(e)}
      className={`h-16 p-2 w-full flex gap-2 flex-shrink-0 self-end mt-auto items-center border-t border-cwhite-light dark:border-cblack-3 relative
       ${file || reply ? "mt-12" : null}
      ${file && reply ? "mt-24" : null}
      `}
    >
      {/* SEND IMAGE POP UP */}
      <article
        className={`
        w-full absolute h-12 bg-green-400 text-white left-0 -top-12 transition select-none
        duration-200 z-50 font-medium px-3 flex items-center origin-bottom justify-between
        ${reply ? null : "rounded-t-xl"}
        ${file ? "scale-y-100" : "scale-y-0"}
        `}
      >
        {file ? (
          <>
            <div>
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

      {/* REPLY MESSAGE POP UP */}
      <article
        className={`
        w-full absolute h-12 rounded-t-xl bg-green-200 border-l-8 border-green-400 text-cblack-3 left-0 transition select-none
        duration-200 z-50 font-medium px-3 flex items-center origin-bottom justify-between
        ${file ? "-top-24" : "-top-12"}
        ${reply ? "scale-y-100" : "scale-y-0"}
        `}
      >
        {reply ? (
          <>
            <div>
              {reply.replyContent.length < 25
                ? reply.replyContent
                : reply.replyContent.substr(0, 25) + "..."}
            </div>
            <div
              className="w-6 h-6 cursor-pointer"
              onClick={() => setReply(null)}
            >
              <Close />
            </div>
          </>
        ) : null}
      </article>

      {/* MESSAGE INPUT */}
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
            accept="image/*"
            name="file"
            className="w-0 h-0 absolute inset-0"
            onClick={(e) => (e.target.value = null)}
            onChange={(e) => setFile(e.target.files[0])}
            disabled={uploading ? true : false}
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

      {/* SUBMIT BUTTON */}
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

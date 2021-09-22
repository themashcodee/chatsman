import React, { useState } from "react";
import Delete from "../icons/Delete";
import Download from "../icons/Download";
import Image from "next/image";

import { saveAs } from "file-saver";

import { useMutation } from "@apollo/client";
import { DELETE_MESSAGE } from "../../graphql/mutations/index";

const Message = ({
  isSender,
  message,
  time,
  senderId,
  id,
  conversationId,
  isWallpaper,
  type,
}) => {
  const [showTime, setShowTime] = useState(false);
  const [deleteMessage, { error }] = useMutation(DELETE_MESSAGE, {
    variables: { senderId, id, conversationId },
  });

  async function deleteMessageFunc() {
    try {
      const isAgree = confirm(
        "Message will be deleted permanently from both side!"
      );
      if (!isAgree) return;

      const result = await deleteMessage();
      if (error) return alert("There is some server error, try again later.");

      const { message, success } = result.data.deleteMessage;
      if (!success) return alert(message);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  async function downloadImage() {
    try {
      const dotInd = message.lastIndexOf(".");
      const ext = message.substring(dotInd);
      const buffer = await (await fetch(message)).arrayBuffer();

      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement("a");
      link.href = url;
      const randomNumber = () => Math.floor(100000 + Math.random() * 900000);
      link.download = `chatsman-${randomNumber}${ext}`;
      link.click();
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  return (
    <div
      className={`
    ${isSender ? "justify-end self-end" : "justify-start self-start"}
    select-none relative w-full flex
    `}
    >
      <div
        onClick={() => {
          if (!showTime) {
            setShowTime(true);
            setTimeout(() => setShowTime(false), 3000);
          }
        }}
        className={`
              ${
                isSender
                  ? "bg-cred-light dark:bg-cred-dark"
                  : "bg-cwhite-light dark:bg-cblack-3"
              }
                 ${
                   showTime
                     ? `mb-4 ${isSender ? "mr-9" : type === "IMAGE" && "ml-9"}`
                     : "mb-0"
                 } 
                 p-2 rounded-lg cursor-pointer z-10 duration-200 transition-all max-w-[75%]
                 ${
                   type === "IMAGE"
                     ? "w-[75%] md:w-[45%] lg:w-[40%] xl:w-[30%] min-h-[80px]"
                     : null
                 }
        `}
      >
        {type === "TEXT" ? (
          message.split(" ").some((word) => word.length > 15) ? (
            message
              .split(" ")
              .map((word) => {
                return word.length > 15
                  ? word
                      .split("")
                      .map((newword, i) =>
                        i !== 0 && i !== newword.length - 1 && i % 14 === 0
                          ? newword + "-"
                          : newword
                      )
                      .join("")
                  : word;
              })
              .join(" ")
          ) : (
            message
          )
        ) : (
          <div className="image-container relative">
            <Image
              src={message}
              alt={"image"}
              layout="fill"
              className="image rounded"
            ></Image>
          </div>
        )}
      </div>

      {type === "IMAGE" && (
        <div
          onClick={() => {
            setShowTime(false);
            downloadImage();
          }}
          className={`absolute cursor-pointer -z-1 text-xxm ${
            isSender ? "top-10" : "top-1"
          } duration-200 transition-all w-7 h-7 text-white p-1 rounded-full bg-blue-400 flex justify-center items-center
        ${
          showTime
            ? `${isSender ? "right-0" : "left-0"}`
            : `${isSender ? "right-4" : "left-4"} scale-0 transform`
        }`}
        >
          <Download />
        </div>
      )}

      {isSender && (
        <div
          onClick={() => {
            setShowTime(false);
            deleteMessageFunc();
          }}
          className={`absolute cursor-pointer -z-1 text-xxm top-1 duration-200 transition-all w-7 h-7 text-cblack-5 p-1 rounded-full bg-cyellow flex justify-center items-center
        ${
          showTime
            ? `${isSender ? "right-0" : "left-0"}`
            : `${isSender ? "right-4" : "left-4"} scale-0 transform`
        }`}
        >
          <Delete />
        </div>
      )}

      <div
        className={`absolute -z-1 text-xxm duration-200 transition-all
        ${isSender ? "right-10" : "left-10"} 
        ${isWallpaper ? "text-white" : null}
        ${showTime ? "bottom-0" : "bottom-4 scale-0 transform"}`}
      >
        {time}
      </div>
    </div>
  );
};

export default Message;

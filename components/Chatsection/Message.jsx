import React, { useState } from "react";

const Message = ({ owner, message, time }) => {
  const [showTime, setShowTime] = useState(false);

  return (
    <div
      className={`
    ${owner === "sender" ? "justify-end self-end" : "justify-start self-start"}
    select-none relative w-full flex
    `}
    >
      <div
        onClick={() => {
          if (!showTime) setTimeout(() => setShowTime(false), 3000);
          setShowTime(!showTime);
        }}
        className={`
              ${
                owner === "sender"
                  ? "bg-cred-light dark:bg-cred-dark"
                  : "bg-cwhite-light dark:bg-cblack-3"
              }
                 ${showTime ? "mb-4" : "mb-0"} 
                 p-2 rounded-lg cursor-pointer z-1 duration-200 transition-all max-w-75p
        `}
      >
        {message}
      </div>
      <div
        className={`absolute -z-1 text-xxm duration-200 transition-all ${
          owner === "sender" ? "right-0" : "left-0"
        } ${showTime ? "bottom-0" : "bottom-4 scale-0 transform"}`}
      >
        {time}
      </div>
    </div>
  );
};

export default Message;

import React from "react";

const ImpOption = ({ funtionOnClick, label, bg, special }) => {
  return (
    <div
      onClick={funtionOnClick}
      className={`
      ${special ? bg : "bg-cwhite-light dark:bg-cblack-3"} 
        w-full h-12 items-center flex select-none rounded-lg cursor-pointer px-3 flex-shrink-0`}
    >
      <h2 className={`${special ? "text-white" : null} font-medium`}>
        {label}
      </h2>
    </div>
  );
};

export default ImpOption;

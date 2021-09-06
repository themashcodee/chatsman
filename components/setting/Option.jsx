import React from "react";

const Option = ({ funtionOnClick, label, stateLabel }) => {
  return (
    <div
      onClick={funtionOnClick}
      className="flex justify-between w-full h-12 items-center flex-shrink-0 select-none bg-cwhite-light rounded-lg dark:bg-cblack-3 cursor-pointer px-3"
    >
      <h2 className="text-cblack-5 dark:text-cwhite-darker">{label}</h2>
      <h3 className="font-medium italic">{stateLabel}</h3>
    </div>
  );
};

export default Option;

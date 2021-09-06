import React from "react";
import Favicon from "../icons/Favicon";

const Header = () => {
  return (
    <header className="flex h-16 gap-2 flex-shrink-0 items-center px-4 w-full select-none">
      <div className="h-10 w-10">
        <Favicon />
      </div>
      <h1 className="font-medium text-2xl">Chatsman</h1>
    </header>
  );
};

export default Header;

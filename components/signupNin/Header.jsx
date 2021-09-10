import React from "react";
import Favicon from "../icons/Favicon";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-16 gap-2 flex-shrink-0 items-center px-4 w-full select-none">
      <div className="h-10 w-10">
        <Favicon />
      </div>
      <Link passHref={true} href="/home" replace={true}>
        <h1 className="font-medium cursor-pointer text-2xl">Chatsman</h1>
      </Link>
    </header>
  );
};

export default Header;

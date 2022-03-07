import React from "react";
import Back from "../icons/Back";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex select-none flex-shrink-0 h-14 px-3 items-center border-b border-cwhite-light dark:border-cblack-3">
      <Link href="/home" passHref={true} replace={true}>
        <button className="h-6 w-6">
          <Back />
        </button>
      </Link>
      <h1 className="font-medium text-3xl pl-2">Setting</h1>
    </header>
  );
};

export default Header;

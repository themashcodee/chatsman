import React from "react";
import Back from "../icons/Back";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex select-none flex-shrink-0 pt-4 px-4 items-center">
      <Link href="/home" passHref={true} replace={true}>
        <button className="h-6 w-6">
          <Back />
        </button>
      </Link>
    </header>
  );
};

export default Header;

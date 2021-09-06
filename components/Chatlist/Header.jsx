import React from "react";
import Setting from "../icons/Setting";
import Image from "next/image";
import Link from "next/link";

const Header = ({ img, name }) => {
  return (
    <header className="flex flex-shrink-0 justify-between items-center h-14 px-3 border-b border-cwhite-light dark:border-cblack-3 select-none">
      <div className="flex gap-2 items-center">
        <div className="h-10 overflow-hidden w-10 rounded-full relative">
          <Image
            src={img}
            alt="profile image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="text-2xl font-medium">{name}</h1>
      </div>
      <Link href="/setting" passHref={true} replace={true}>
        <button className="h-8 w-8">
          <Setting />
        </button>
      </Link>
    </header>
  );
};

export default Header;

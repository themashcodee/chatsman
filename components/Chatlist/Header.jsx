import React from "react";
import Setting from "../icons/Setting";
import Image from "next/image";
import Link from "next/link";
import Profile from "../icons/User";

const Header = ({ image, name }) => {
  return (
    <header className="flex flex-shrink-0 justify-between items-center h-14 px-3 border-b border-cwhite-light dark:border-cblack-3 select-none">
      <div className="flex gap-2 items-center">
        <div className="h-10 overflow-hidden w-10 rounded-full relative p-2 bg-cwhite-light dark:bg-cblack-3 text-cblack-5 dark:text-cwhite-darker">
          {image ? (
            <Image
              src={image}
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <Profile />
          )}
        </div>
        <h1 className="text-2xl font-medium">
          {name.length > 15 ? name.substr(0, 15) + "." : name}
        </h1>
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

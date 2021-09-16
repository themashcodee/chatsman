import React from "react";
import Back from "../icons/Back";
import Image from "next/image";
import Profile from "../icons/User";
import Menu from "../icons/Menu";

const Header = ({ name, image, receiverId, senderId, setReceiver }) => {
  return (
    <header className="select-none px-4 flex flex-shrink-0 gap-3 justify-between items-center w-full h-14 border-b border-cwhite-light dark:border-cblack-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setReceiver(null);
          }}
          className="h-6 w-6"
        >
          <Back />
        </button>
        <div className="relative overflow-hidden h-10 w-10 rounded-full p-2 bg-cwhite-light dark:bg-cblack-3 text-cblack-5 dark:text-cwhite-darker">
          {image ? (
            <Image
              src={image}
              alt="profile image"
              layout="fill"
              objectFit="cover"
            ></Image>
          ) : (
            <Profile />
          )}
        </div>
        <div className="text-xl font-medium">
          {name.length > 15 ? name.substr(0, 15) + "." : name}
        </div>

        <div
          className={`w-3 h-3 rounded-full ${
            true ? "bg-cgreen" : "bg-cred-medium"
          }`}
        ></div>
      </div>
      <div className="h-6 w-8 cursor-pointer">
        <Menu />
      </div>
    </header>
  );
};

export default Header;

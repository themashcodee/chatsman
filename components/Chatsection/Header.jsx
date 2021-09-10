import React, { useContext } from "react";
import Back from "../icons/Back";
import Image from "next/image";
import Profile from "../icons/User";

import { StoreContext } from "../../pages/_app";

const Header = () => {
  const {
    RECEIVER: { receiver, setReceiver },
  } = useContext(StoreContext);

  return (
    <header className="px-4 flex flex-shrink-0 gap-3 items-center w-full h-14 border-b border-cwhite-light dark:border-cblack-3">
      <button
        onClick={() => {
          setReceiver(null);
        }}
        className="h-6 w-6"
      >
        <Back />
      </button>
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        {receiver.img ? (
          <Image
            src={receiver.img}
            alt="profile image"
            layout="fill"
            objectFit="cover"
          ></Image>
        ) : (
          <Profile />
        )}
      </div>
      <div className="text-xl font-medium text-cblack-3 dark:text-white">
        {receiver.name.length > 15
          ? receiver.name.substr(0, 15) + "."
          : receiver.name}
      </div>

      <div
        className={`w-3 h-3 rounded-full ${
          receiver.online ? "bg-cgreen" : "bg-cred-medium"
        }`}
      ></div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import Back from "../icons/Back";
import Image from "next/image";
import Profile from "../icons/User";
import Menu from "../icons/Menu";
import Link from "next/link";

const Header = ({
  name,
  image,
  receiverId,
  username,
  senderId,
  setReceiver,
}) => {
  const [modelVisible, setModelVisible] = useState(false);

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

      <div
        className="h-6 w-8 cursor-pointer relative"
        onClick={() => {
          setModelVisible(!modelVisible);
        }}
      >
        {modelVisible && (
          <div className="absolute w-36 rounded-lg right-0 z-50 top-8 bg-cwhite-light border border-cwhite-medium dark:border-cblack-5 dark:bg-cblack-3">
            <Link href={`/user/${username}`} passHref={true} replace={true}>
              <div className="dark:text-white text-cblack-3 w-full h-10 font-medium flex justify-center items-center border-b border-cwhite-medium dark:border-cblack-5">
                Profile
              </div>
            </Link>
            <div className="dark:text-white text-cblack-3 w-full h-10 font-medium flex justify-center items-center">
              Delete Chat
            </div>
          </div>
        )}
        <Menu />
      </div>
    </header>
  );
};

export default Header;

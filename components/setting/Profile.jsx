import React, { useContext } from "react";
import Image from "next/image";
import Edit from "../icons/Edit";
import ProfileIcon from "../icons/User";

import { StoreContext } from "../../pages/_app";

const Profile = () => {
  const {
    USER: { user },
  } = useContext(StoreContext);

  return (
    <article className="flex flex-col w-full p-8 items-center select-none">
      <div className="relative w-28 h-28 sm:h-40 sm:w-40 lg:w-48 lg:h-48 cursor-pointer">
        <div className="relative text-cblack-5 dark:text-cwhite-darker  w-full h-full rounded-full overflow-hidden p-5 sm:p-8 lg:p-11 bg-cwhite-light dark:bg-cblack-3">
          {user.image ? (
            <Image
              src={img}
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <ProfileIcon />
          )}
        </div>
        <button
          className="
        absolute bg-cblack-2 text-cwhite-darker dark:bg-white p-2 
        rounded-full dark:text-cblack-5 md:h-11 md:w-11 h-8 wi-8 top-0 right-0
        sm:h-10 sm:w-10
        "
        >
          <Edit />
        </button>
      </div>
      <h1 className="font-medium text-4xl pt-3">{user.name}</h1>
      <p className="text-cblack-5 italic dark:text-cwhite-darker">
        {user.username}
      </p>
    </article>
  );
};

export default Profile;

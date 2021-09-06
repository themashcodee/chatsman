import React, { useContext } from "react";
import Image from "next/image";
import Edit from "../icons/Edit";

import { StoreContext } from "../../pages/_app";

const Profile = () => {
  const { CURRENT_USER } = useContext(StoreContext);

  return (
    <article className="flex flex-col w-full p-8 items-center select-none">
      <div className="relative w-28 h-28 sm:h-40 sm:w-40 lg:w-48 lg:h-48 cursor-pointer">
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={CURRENT_USER.img}
            alt="profile image"
            layout="fill"
            objectFit="cover"
          ></Image>
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
      <h1 className="font-medium text-4xl pt-3">{CURRENT_USER.name}</h1>
      <p className="text-cblack-5 italic dark:text-cwhite-darker">
        {CURRENT_USER.username}
      </p>
    </article>
  );
};

export default Profile;

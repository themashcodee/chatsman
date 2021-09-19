import React from "react";
import Image from "next/image";
import ProfileIcon from "../icons/User";
import moment from "moment";

const Profile = ({ user }) => {
  return (
    <article className="flex flex-col w-full p-8 items-center select-none">
      <div className="relative w-48 h-48 sm:h-60 sm:w-60 md:w-64 md:h-64 lg:w-72 lg:h-72">
        <div className="relative text-cblack-5 dark:text-cwhite-darker  w-full h-full rounded-2xl overflow-hidden p-5 sm:p-8 lg:p-11 bg-cwhite-light dark:bg-cblack-3">
          {user.image ? (
            <Image
              src={user.image}
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <ProfileIcon />
          )}
        </div>
      </div>
      <h1 className="font-medium text-4xl pt-4 text-center">{user.name}</h1>
      <p className="text-cblack-5 italic dark:text-cwhite-darker">
        {user.username}
      </p>
      <p className="text-cblack-3 pt-3 dark:text-cwhite-medium">
        {user.description ? user.description : null}
      </p>
      <p className="pt-3 italic text-[#aaaaaa] dark:text-[#555555]">
        {"Joined " + moment(+user.createdAt).fromNow()}
      </p>
    </article>
  );
};

export default Profile;

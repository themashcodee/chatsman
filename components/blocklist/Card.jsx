import React, { useEffect, useState } from "react";
import Image from "next/image";
import Profile from "../icons/User";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries/index";
import { UNBLOCK_USER } from "../../graphql/mutations/index";

const Card = ({ id, userId, setUser }) => {
  const { data, error } = useQuery(GET_USER, { variables: { id } });
  const [UnBlock, { error: UnBlockErr }] = useMutation(UNBLOCK_USER, {
    variables: { unBlockedBy: userId, unBlockedTo: id },
  });

  const [blockedUser, setBlockedUser] = useState(null);

  useEffect(() => {
    if (data && data.getUser.success) setBlockedUser(data.getUser.user);
  }, [data]);

  async function unBlockUser() {
    try {
      const result = await UnBlock();
      if (UnBlockErr) alert("There is some server, try again later.");

      const { message, success } = result.data.unBlockUser;
      if (!success) return alert(message);
      setUser((prev) => {
        return { ...prev, blocked: prev.blocked.filter((item) => item !== id) };
      });
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  if (error)
    return (
      <article className="flex flex-col w-full max-w-xs py-4 h-auto bg-cwhite-light dark:bg-cblack-3">
        There is an error, try again later.
      </article>
    );

  return (
    <article className="flex flex-col w-full max-w-xs h-auto bg-cwhite-light dark:bg-cblack-3 rounded-lg select-none">
      <div className="flex p-4">
        <div className="relative text-cblack-5 dark:text-cwhite-darker  w-20 h-20 rounded-2xl overflow-hidden p-2 bg-cwhite-medium dark:bg-cblack-4">
          {blockedUser?.image ? (
            <Image
              src={blockedUser.image}
              alt="profile image"
              layout="fill"
              objectFit="cover"
            ></Image>
          ) : (
            <Profile />
          )}
        </div>
        <div className="flex flex-col px-4 justify-center flex-grow">
          <h1 className="font-medium text-xl">
            {blockedUser &&
              (blockedUser.name.length > 15
                ? blockedUser.name.substr(0, 15) + "..."
                : blockedUser.name)}
          </h1>
          <h3 className="italic text-[#999999]">
            {blockedUser && blockedUser.username}
          </h3>
        </div>
      </div>
      <div className="p-2">
        <button
          onClick={unBlockUser}
          className="bg-green-400 font-medium w-full h-12 rounded-md"
        >
          Unblock
        </button>
      </div>
    </article>
  );
};

export default Card;

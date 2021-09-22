import React, { useState, useEffect } from "react";
import Back from "../icons/Back";
import Image from "next/image";
import Profile from "../icons/User";
import Menu from "../icons/Menu";
import Link from "next/link";

import { useMutation } from "@apollo/client";
import {
  DELETE_CONVERSATION,
  DELETE_WALLPAPER,
} from "../../graphql/mutations/index";

const Header = ({
  name,
  image,
  username,
  conversationId,
  setReceiver,
  userId,
}) => {
  const [modelVisible, setModelVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [DeleteConversation, { error }] = useMutation(DELETE_CONVERSATION);
  const [DeleteWallpaper, { error: WallpaperErr }] =
    useMutation(DELETE_WALLPAPER);

  async function deleteWallpaper() {
    try {
      setModelVisible(false);

      const result = await DeleteWallpaper({
        variables: { id: conversationId, userId },
      });

      if (WallpaperErr)
        return alert("There is some server error, try again later.");

      const { success, message } = result.data.deleteWallpaper;
      if (!success) return alert(message);
      setReceiver((prev) => ({ ...prev, wallpaper: null }));
    } catch (err) {
      alert("There is some server error, try again later");
    }
  }

  async function deleteConversation() {
    setModelVisible(false);
    const isAgree = confirm(
      "This will delete conversation from both side permanently!"
    );
    if (!isAgree) return;

    const result = await DeleteConversation({ variables: { conversationId } });

    if (error) return alert("There is some server error, try again later.");

    const { success, message } = result.data.deleteConversation;
    if (!success) return alert(message);

    setReceiver(null);
  }

  async function uploadWallpaper(file) {
    try {
      setModelVisible(false);
      if (!file) return alert("No Image selected");
      setUploading(true);
      alert("Be patient! It will take few seconds.");

      const data = new FormData();
      data.append("file", file);
      data.append("id", conversationId);

      const response = await (
        await fetch(process.env.API_URI_BACKGROUND_UPLOAD, {
          method: "POST",
          body: data,
        })
      ).json();

      if (!response.success) {
        setUploading(false);
        return alert(response.message);
      }
      setUploading(false);
    } catch (err) {
      setUploading(false);
      alert("There is some server error, try again later.");
    }
  }

  return (
    <header className="relative select-none px-4 flex flex-shrink-0 gap-3 justify-between items-center w-full h-14 border-b border-cwhite-light dark:border-cblack-3">
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
          {name.length > 11 ? name.substr(0, 11) + "." : name}
        </div>

        <div
          className={`w-3 h-3 rounded-full ${
            true ? "bg-cgreen" : "bg-cred-medium"
          }`}
        ></div>
      </div>

      <div
        className="h-6 w-8 cursor-pointer"
        onClick={() => setModelVisible(!modelVisible)}
      >
        <Menu />
      </div>

      {modelVisible && (
        <div className="absolute w-40 rounded-lg right-4 z-50 top-12 bg-cwhite-light border border-cwhite-medium dark:border-cblack-5 dark:bg-cblack-3 cursor-pointer">
          <Link href={`/user/${username}`} passHref={true} replace={true}>
            <div
              onClick={() => setModelVisible(false)}
              className="w-full h-10 font-medium flex justify-center items-center border-b border-cwhite-medium dark:border-cblack-5"
            >
              Profile
            </div>
          </Link>

          <div className="w-full h-10 border-b border-cwhite-medium dark:border-cblack-5">
            <label
              htmlFor="file"
              className="w-full h-full font-medium flex justify-center items-center cursor-pointer"
            >
              Set Wallpaper
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              className="h-0 w-0"
              required
              onChange={(e) => uploadWallpaper(e.target.files[0])}
              disabled={uploading ? true : false}
            />
          </div>

          <div
            onClick={deleteWallpaper}
            className="text-cred-dark w-full h-10 font-medium flex justify-center items-center border-b border-cwhite-medium dark:border-cblack-5"
          >
            Delete Wallpaper
          </div>

          <div
            onClick={deleteConversation}
            className="text-cred-dark w-full h-10 font-medium flex justify-center items-center"
          >
            Delete Chat
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

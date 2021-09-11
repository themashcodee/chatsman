import React, { useState, useContext } from "react";
import Option from "./Option";
import ImpOption from "./ImpOption";
import { getCurrenTheme, toggleTheme } from "../../helpers/theme";

import { useMutation } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations/index";

import { useRouter } from "next/router";

import { StoreContext } from "../../pages/_app";

const Options = () => {
  const {
    USER: { user },
  } = useContext(StoreContext);
  const router = useRouter();

  // THEME BUTTON SETUP
  const [isDark, setIsDark] = useState(false);
  useState(() => {
    const currentTheme = getCurrenTheme();
    setIsDark(currentTheme === "dark" ? true : false);
  }, [setIsDark]);

  // MUTATIONS
  const [logoutMutation, { data: logoutData, error: logoutError }] =
    useMutation(LOGOUT);

  // OPTIONS FUNCTIONS
  const resetPassword = () => console.log("reset password");
  const changeUsername = () => console.log("change username");
  const changeName = () => console.log("change name");
  const logout = async () => {
    const secret = prompt("Secret");
    if (secret.length > 6 || secret.length < 6 || !secret.match(/^[0-9]*$/))
      return alert("Wrong Secret!");

    const result = await logoutMutation({
      variables: { id: user._id, secret: +secret },
    });
    const { message, success } = result.data.logout;
    if (!success) return alert(message);

    sessionStorage.clear();
    router.reload();
  };
  const deleteAccount = () => console.log("account deleted");

  return (
    <section className="max-w-lg flex-grow w-full pb-8 flex flex-col gap-2 p-2">
      <Option
        label="Dark Mode"
        funtionOnClick={() => {
          toggleTheme();
          setIsDark(!isDark);
        }}
        stateLabel={isDark ? "Enabled" : "Disabled"}
      />
      <ImpOption
        label="Reset Password"
        special={false}
        funtionOnClick={resetPassword}
      />
      <ImpOption
        label="Change Username"
        special={false}
        funtionOnClick={changeUsername}
      />
      <ImpOption
        label="Change Name"
        special={false}
        funtionOnClick={changeName}
      />
      <ImpOption
        label="Logout"
        special={true}
        bg={"bg-cyellow"}
        funtionOnClick={logout}
      />
      <ImpOption
        label="Delete Account"
        special={true}
        bg={"bg-cred-dark"}
        funtionOnClick={deleteAccount}
      />
    </section>
  );
};

export default Options;

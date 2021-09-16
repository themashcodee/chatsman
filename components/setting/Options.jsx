import React, { useState, useContext } from "react";
import Option from "./Option";
import ImpOption from "./ImpOption";
import { getCurrenTheme, toggleTheme } from "../../helpers/theme";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { StoreContext } from "../../pages/_app";
import {
  LOGOUT,
  DELETE_ACCOUNT,
  CHANGE_BASIC_DETAILS,
  CHANGE_PASSWORD,
  RESET_SECRET_CODE,
  RESET_PASSWORD,
} from "../../graphql/mutations/index";

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
  const [changeBasicDetailsMutation, { error: changeBasicDetailsError }] =
    useMutation(CHANGE_BASIC_DETAILS);
  const [changePasswordMutation, { error: changePasswordError }] =
    useMutation(CHANGE_PASSWORD);
  const [resetSecretCodeMutation, { error: resetSecretCodeError }] =
    useMutation(RESET_SECRET_CODE);
  const [logoutMutation, { error: logoutError }] = useMutation(LOGOUT);
  const [deleteAccountMutation, { error: deleteAccountError }] =
    useMutation(DELETE_ACCOUNT);
  const [resetPasswordMutation, { error: resetPasswordError }] =
    useMutation(RESET_PASSWORD);

  // OPTIONS FUNCTIONS
  const changeUsername = async () => {
    const username = prompt("New Username");
    if (!username) return;
    if (
      username.length > 10 ||
      username.length < 3 ||
      !username.match(/^[a-zA-Z0-9]*$/)
    )
      return alert(
        "Username must be 3-10 characters long and only contain alphabets and numbers!"
      );

    try {
      const result = await changeBasicDetailsMutation({
        variables: { id: user._id, username },
      });
      if (changeBasicDetailsError)
        return alert("There is some error, try again later.");
      const { message, success } = result.data.changeBasicDetails;
      if (!success) return alert(message);
      alert(message);

      router.reload();
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  };

  const changeName = async () => {
    const name = prompt("New Name");
    if (!name) return;
    if (
      name.length > 20 ||
      name.length < 3 ||
      !name.match(/^[a-zA-Z][a-zA-Z\s]*$/)
    )
      return alert(
        "Username must be 3-20 characters long and only contain alphabets!"
      );

    try {
      const result = await changeBasicDetailsMutation({
        variables: { id: user._id, name },
      });
      if (changeBasicDetailsError)
        return alert("There is some error, try again later.");
      const { message, success } = result.data.changeBasicDetails;
      if (!success) return alert(message);
      alert(message);

      router.reload();
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  };

  const changeDescription = async () => {
    const description = prompt("New Description");
    if (!description) return;
    if (description.length > 100 || description.length < 10)
      return alert("Description must be 10-100 characters long");

    try {
      const result = await changeBasicDetailsMutation({
        variables: { id: user._id, description },
      });
      if (changeBasicDetailsError)
        return alert("There is some error, try again later.");
      const { message, success } = result.data.changeBasicDetails;
      if (!success) return alert(message);
      alert(message);

      router.reload();
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  };

  const changePassword = async () => {
    const oldPassword = prompt("Old Password");
    if (!oldPassword) return;
    if (
      oldPassword.length < 8 ||
      oldPassword.length > 20 ||
      !oldPassword.match(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "^*~`@]).*$/)
    )
      return alert("Wrong Password");

    const newPassword = prompt("New Password");
    if (!newPassword) return;
    if (newPassword.length < 8 || newPassword.length > 20)
      return alert("Password must be 8-20 characters long");
    if (!newPassword.match(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "^*~`@]).*$/))
      return alert(
        "Password must contain alphabets, numbers and special characters"
      );

    try {
      const result = await changePasswordMutation({
        variables: { oldPassword, newPassword, id: user._id },
      });
      if (changePasswordError)
        return alert("There is some error, try again later.");
      const { message, success } = result.data.changePassword;
      if (!success) return alert(message);
      alert(message);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  };

  const resetSecretCode = async () => {
    try {
      const isAgree = confirm("New Secret Code will be sent to you email.");
      if (!isAgree) return;

      const result = await resetSecretCodeMutation({
        variables: { email: user.email },
      });
      if (resetSecretCodeError)
        return alert("There is some server error, try again later");

      const { message, success } = result.data.resetSecretCode;
      if (!success) return alert(message);

      alert(message);
    } catch (err) {
      alert("There is some server error, try again later");
    }
  };

  const resetPassword = async () => {
    try {
      const secret = prompt("Secret Code");
      if (!secret) return;
      if (secret.length > 6 || secret.length < 6 || !secret.match(/^[0-9]*$/))
        return alert("Wrong Secret Code");

      const result = await resetPasswordMutation({
        variables: { email: user.email, secret: +secret },
      });

      if (resetPasswordError) {
        return alert("There is some server error, try again later.");
      }
      const { message, success } = result.data.resetPassword;

      if (!success) return alert(message);

      alert(message);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  };

  const logout = async () => {
    try {
      const result = await logoutMutation({
        variables: { id: user._id },
      });
      if (logoutError) return alert("There is some error, try again later.");
      const { message, success } = result.data.logout;
      if (!success) return alert(message);

      sessionStorage.clear();
      router.reload();
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  };

  const deleteAccount = async () => {
    const secret = prompt("Secret Code");
    if (!secret) return;
    if (secret.length > 6 || secret.length < 6 || !secret.match(/^[0-9]*$/))
      return alert("Wrong Secret Code!");

    try {
      const result = await deleteAccountMutation({
        variables: { id: user._id, secret: +secret },
      });
      if (deleteAccountError)
        return alert("There is some error, try again later.");
      const { message, success } = result.data.deleteAccount;
      if (!success) return alert(message);

      sessionStorage.clear();
      router.reload();
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  };

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
        label="Change Bio"
        special={false}
        funtionOnClick={changeDescription}
      />
      <ImpOption
        label="Change Password"
        special={false}
        funtionOnClick={changePassword}
      />
      <ImpOption
        label="Reset Secret Code"
        special={false}
        funtionOnClick={resetSecretCode}
      />
      <ImpOption
        label="Reset Password"
        special={false}
        funtionOnClick={resetPassword}
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

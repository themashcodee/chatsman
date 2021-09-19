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
  CHANGE_DETAILS,
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
  const [ChangeDetails, { error: DetailsErr }] = useMutation(CHANGE_DETAILS);
  const [ChangePassword, { error: PasswordErr }] = useMutation(CHANGE_PASSWORD);
  const [Logout, { error: logoutErr }] = useMutation(LOGOUT);
  const [DeleteAccount, { error: AccountErr }] = useMutation(DELETE_ACCOUNT);
  const [ResetSecretCode, { error: SecretCodeErr }] =
    useMutation(RESET_SECRET_CODE);
  const [ResetPassword, { error: ResetPasswordErr }] =
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
        "Username must be 3-10 characters long and only contain letters and numbers."
      );

    try {
      const result = await ChangeDetails({
        variables: { id: user.id, username },
      });
      if (DetailsErr) return alert("There is some error, try again later.");
      const { message, success } = result.data.changeDetails;
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
        "Username must be 3-20 characters long and only contain letters!"
      );

    try {
      const result = await ChangeDetails({
        variables: { id: user.id, name },
      });
      if (DetailsErr) return alert("There is some error, try again later.");
      const { message, success } = result.data.changeDetails;
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
      const result = await ChangeDetails({
        variables: { id: user.id, description },
      });
      if (DetailsErr) return alert("There is some error, try again later.");
      const { message, success } = result.data.changeDetails;
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
      return alert("Invalid Password");

    const newPassword = prompt("New Password");
    if (!newPassword) return;
    if (newPassword.length < 8 || newPassword.length > 20)
      return alert("Password must be 8-20 characters long");
    if (!newPassword.match(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "^*~`@]).*$/))
      return alert(
        "Password must contain letters, numbers and special characters"
      );

    try {
      const result = await ChangePassword({
        variables: { oldPassword, newPassword, id: user.id },
      });
      if (PasswordErr) return alert("There is some error, try again later.");
      const { message, success } = result.data.changePassword;
      if (!success) return alert(message);
      alert(message);
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  };

  const resetSecretCode = async () => {
    try {
      const isAgree = confirm("New Secret Code will be sent to your email.");
      if (!isAgree) return;

      const result = await ResetSecretCode({
        variables: { email: user.email },
      });
      if (SecretCodeErr)
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
        return alert("Invalid Secret Code");

      const result = await ResetPassword({
        variables: { email: user.email, secret: +secret },
      });

      if (ResetPasswordErr) {
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
      const result = await Logout({
        variables: { id: user.id },
      });
      if (logoutErr) return alert("There is some error, try again later.");
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
      return alert("Invalid Secret Code!");

    try {
      const result = await DeleteAccount({
        variables: { id: user.id, secret: +secret },
      });
      if (AccountErr) return alert("There is some error, try again later.");
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
        color={"text-[#333333]"}
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

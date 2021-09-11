import React, { useState, useContext } from "react";
import Input from "./Input";
import { useRouter } from "next/router";

import { StoreContext } from "../../pages/_app";

import { LOGIN_USER } from "../../graphql/mutations/index";
import { useMutation } from "@apollo/client";

// VALIDATIONS
import {
  emailValidation,
  passwordValidation,
  secretValidation,
} from "../../validations/form";

const SigninForm = () => {
  const router = useRouter();

  const {
    USER: { setUser },
  } = useContext(StoreContext);

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [secretError, setSecretError] = useState("");

  async function login(e) {
    e.preventDefault();
    if (emailError || passwordError || secretError) return;

    setEmail("");
    setPassword("");
    setSecret("");

    try {
      const result = await loginUser({
        variables: { email, password, secret: +secret },
      });

      if (error) {
        console.log("GRAPHQL TYPEERROR : ", error);
        return alert("There is some server error, try again later.");
      }

      const { message, success } = result.data.loginUser;
      if (!success) return alert(message);

      sessionStorage.setItem("token", result.data.loginUser.token);
      setUser(result.data.loginUser.user);

      router.reload();
    } catch (err) {
      console.log("SERVER ERROR", err);
      return alert("There is some server error, try again later");
    }
  }

  return (
    <form
      onSubmit={(e) => login(e)}
      className="w-full gap-2 max-w-sm flex flex-col items-center p-4 bg-white dark:bg-cblack-3 rounded-t-3xl"
    >
      <Input
        label="Email"
        type="email"
        value={email}
        setValue={setEmail}
        validation={emailValidation}
        setError={setEmailError}
        error={emailError}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
        maxLength={20}
        validation={passwordValidation}
        setError={setPasswordError}
        error={passwordError}
      />
      <Input
        label="Secret Code"
        type="text"
        value={secret}
        maxLength={6}
        setValue={setSecret}
        validation={secretValidation}
        setError={setSecretError}
        error={secretError}
      />
      <button
        className="h-10 flex-shrink-0 bg-cblue text-white w-full rounded-lg mt-3"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SigninForm;

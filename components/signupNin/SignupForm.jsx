import React, { useState } from "react";
import User from "../icons/User";
import Input from "./Input";
import { useRouter } from "next/router";

import { CREATE_USER } from "../../graphql/mutations/index";
import { useMutation } from "@apollo/client";

// VALIDATIONS
import {
  nameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "../../validations/form";

const SignupForm = () => {
  const [createUser, { error }] = useMutation(CREATE_USER);
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function register(e) {
    e.preventDefault();
    if (nameError || usernameError || emailError || passwordError) return;

    setName("");
    setUsername("");
    setEmail("");
    setPassword("");

    try {
      const result = await createUser({
        variables: { payload: { name, username, email, password } },
      });

      if (error) {
        console.log("GRAPHQL TYPEERROR : ", error);
        return alert("There is some server error, try again later.");
      }

      const { message, success } = result.data.createUser;
      if (!success) return alert(message);
      alert(message);

      router.replace("/signin");
    } catch (err) {
      console.log('"SERVER ERROR :', err);
      alert("There is some server error, try again later.");
    }
  }

  return (
    <form
      onSubmit={(e) => register(e)}
      className="w-full gap-2 max-w-sm flex flex-col items-center p-4 bg-white dark:bg-cblack-3 rounded-t-3xl"
    >
      <Input
        label="Name"
        type="text"
        value={name}
        setValue={setName}
        maxLength={20}
        validation={nameValidation}
        setError={setNameError}
        error={nameError}
      />
      <Input
        label="Username"
        type="text"
        value={username}
        setValue={setUsername}
        maxLength={10}
        validation={usernameValidation}
        setError={setUsernameError}
        error={usernameError}
      />
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
      <button
        className="h-10 flex-shrink-0 bg-cblue text-white w-full rounded-lg mt-3"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;

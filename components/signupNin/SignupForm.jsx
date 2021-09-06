import React, { useState } from "react";
import User from "../icons/User";
import Input from "./Input";

import { ADD_USER } from "../../graphql/mutations/index";
import { useMutation } from "@apollo/client";

// VALIDATIONS
import {
  nameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "../../validations/form";

const SignupForm = () => {
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitState, setSubmitState] = useState("Submit");

  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function registerUser(e) {
    e.preventDefault();
    if (!nameError && !usernameError && !emailError && !passwordError) {
      const isAlertAccepted = confirm(
        "you have to verify your email address to confirm your account"
      );
      if (!isAlertAccepted) return;

      setSubmitState("Submitting...");
      addUser({
        variables: {
          payload: {
            name,
            username,
            email,
            password,
          },
        },
      });
      if (data) console.log(data);

      setSubmitState("Submited");
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

      alert(
        "Verify your email and login (check spam folder if you are not able to find email)"
      );
    }
  }

  return (
    <form
      onSubmit={(e) => registerUser(e)}
      className="w-full gap-2 max-w-sm flex flex-col items-center p-4 bg-white dark:bg-cblack-3 rounded-t-3xl"
    >
      <div className="w-20 h-20 bg-cwhite-light dark:bg-cblack-4 rounded-full text-cblack-5 dark:text-cwhite-darker cursor-pointer p-4">
        <User />
      </div>
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
        {submitState}
      </button>
    </form>
  );
};

export default SignupForm;

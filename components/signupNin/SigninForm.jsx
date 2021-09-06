import React, { useState } from "react";
import Input from "./Input";

// VALIDATIONS
import { emailValidation, passwordValidation } from "../../validations/form";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitState, setSubmitState] = useState("Submit");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function loginUser(e) {
    e.preventDefault();
    if (!emailError && !passwordError) {
      setSubmitState("Submitting...");
      console.dir({
        email,
        password,
      });
      setSubmitState("Submited");
    }
  }

  return (
    <form
      onSubmit={(e) => loginUser(e)}
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
      <button
        className="h-10 flex-shrink-0 bg-cblue text-white w-full rounded-lg mt-3"
        type="submit"
      >
        {submitState}
      </button>
    </form>
  );
};

export default SigninForm;

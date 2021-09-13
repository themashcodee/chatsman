import React from "react";
import Link from "next/link";
import EmailValidator from "email-validator";
import { useMutation } from "@apollo/client";
import {
  RESET_SECRET_CODE,
  RESET_PASSWORD,
} from "../../graphql/mutations/index";

const RedirectSection = ({ label, link, line, switchTo }) => {
  const [resetPasswordMutation, { error: resetPasswordError }] =
    useMutation(RESET_PASSWORD);
  const [resetSecretCodeMutation, { error: resetSecretCodeError }] =
    useMutation(RESET_SECRET_CODE);

  async function resetPassword() {
    try {
      const secret = prompt("Secret Code");
      if (!secret) return;
      if (secret.length > 6 || secret.length < 6 || !secret.match(/^[0-9]*$/))
        return alert("Wrong Secret Code");

      const email = prompt("Email");
      if (!email) return;
      if (!EmailValidator.validate(email)) return alert("Wrong Email!");

      const result = await resetPasswordMutation({
        variables: { email, secret: +secret },
      });

      if (resetPasswordError)
        return alert("There is some server error, try again later.");
      const { message, success } = result.data.resetPassword;

      if (!success) return alert(message);

      alert(message);
    } catch (err) {
      console.log(err);
      alert("There is some server error, try again later.");
    }
  }

  const resetSecretCode = async () => {
    try {
      const email = prompt("Email");
      if (!email) return;
      if (!EmailValidator.validate(email)) return alert("Wrong Email!");

      const result = await resetSecretCodeMutation({
        variables: { email },
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

  return (
    <article className="w-full mt-auto py-5 flex flex-col gap-2 select-none">
      <h1 className="font-medium text-center text-3xl">{label}</h1>
      <p className="text-cblack-5 dark:text-cwhite-darker text-xs md:text-sm text-center">
        {line}
        <span className="font-medium text-cblack-3 dark:text-white">
          <Link href={link} replace={true}>
            {switchTo}
          </Link>
        </span>
      </p>
      {label === "Sign In" ? (
        <div>
          <p className="text-cblack-5 dark:text-cwhite-darker text-xs md:text-sm text-center">
            Forgot password?{" "}
            <span
              onClick={resetPassword}
              className="font-medium text-cblack-3 dark:text-white cursor-pointer"
            >
              Reset it.
            </span>
          </p>
          <p className="text-cblack-5 dark:text-cwhite-darker text-xs md:text-sm text-center">
            Forgot secret code?{" "}
            <span
              onClick={resetSecretCode}
              className="font-medium text-cblack-3 dark:text-white cursor-pointer"
            >
              Reset it.
            </span>
          </p>
        </div>
      ) : null}
    </article>
  );
};

export default RedirectSection;

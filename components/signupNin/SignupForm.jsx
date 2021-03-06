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

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function register(e) {
		e.preventDefault();
		if (nameError || usernameError || emailError || passwordError) return;
		setIsSubmitting(true);

		try {
			const result = await createUser({
				variables: { name, username, email, password },
			});

			if (error) {
				console.log("GRAPHQL TYPEERROR : ", error);
				setIsSubmitting(false);
				return alert("There is some server error, try again later.");
			}

			const { message, success } = result.data.createUser;
			if (!success) {
				setIsSubmitting(false);
				return alert(message);
			}

			alert(message);
			setIsSubmitting(false);

			router.replace("/signin");
		} catch (err) {
			setIsSubmitting(false);
			alert("There is some server error, try again later.");
		}
	}

	return (
		<form
			onSubmit={(e) => register(e)}
			className="w-[90%] mt-4 gap-2 max-w-sm flex flex-col items-center p-6 bg-white dark:bg-cblack-3 rounded-xl border border-cwhite-darker dark:border-transparent"
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
				className="h-10 select-none flex-shrink-0 bg-cblue text-white w-full rounded-lg mt-3"
				type="submit"
				disabled={isSubmitting ? true : false}
			>
				{isSubmitting ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
};

export default SignupForm;

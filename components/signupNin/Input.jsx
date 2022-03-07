import React, { useState } from "react";
import Eyeclose from "../icons/Eyeclose";
import Eyeopen from "../icons/Eyeopen";

const Input = ({
	label,
	type,
	value,
	setValue,
	maxLength,
	error,
	validation,
	setError,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex flex-col w-full gap-1 relative">
			<label
				htmlFor={label}
				className="text-cblack-5 select-none dark:text-cwhite-darker"
			>
				{label}
			</label>

			{type !== "password" ? (
				<input
					type={type}
					id={label}
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
						validation(e.target.value, setError);
					}}
					className="h-10 rounded-lg px-2 bg-cwhite-light dark:bg-cblack-4"
					required
					maxLength={maxLength || 35}
				/>
			) : (
				<>
					<label htmlFor={label} className="h-10 relative">
						<input
							type={showPassword ? "text" : type}
							id={label}
							value={value}
							onChange={(e) => {
								setValue(e.target.value);
								validation(e.target.value, setError);
							}}
							className="flex-grow h-full w-full rounded-lg px-2 bg-cwhite-light dark:bg-cblack-4"
							required
							maxLength={maxLength || 35}
						/>
						<label
							htmlFor={label}
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-0 top-0 h-10 w-10 p-2 flex justify-center items-center cursor-pointer rounded-lg"
						>
							{showPassword ? <Eyeopen /> : <Eyeclose />}
						</label>
					</label>
				</>
			)}

			<span className="text-xs text-cred-dark font-medium select-none">
				{error ? error : null}
			</span>
		</div>
	);
};

export default Input;

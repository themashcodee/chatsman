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
          <input
            type={showPassword ? "text" : type}
            id={label}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              validation(e.target.value, setError);
            }}
            className="flex-grow h-10 rounded-lg px-2 bg-cwhite-light dark:bg-cblack-4"
            required
            maxLength={maxLength || 35}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-9 h-6 w-6 z-10 flex justify-center items-center cursor-pointer bg-cwhite-light dark:bg-cblack-4"
          >
            {showPassword ? <Eyeopen /> : <Eyeclose />}
          </div>
        </>
      )}

      <span className="text-xs text-cred-dark font-medium select-none">
        {error ? error : null}
      </span>
    </div>
  );
};

export default Input;

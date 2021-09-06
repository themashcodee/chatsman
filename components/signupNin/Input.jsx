import React from "react";

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
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={label}
        className="text-cblack-5 select-none dark:text-cwhite-darker"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          validation(e.target.value, setError);
        }}
        className="text-cblack-3 dark:text-white h-10 rounded-lg px-2 bg-cwhite-light dark:bg-cblack-4"
        required
        maxLength={maxLength || 35}
      />
      <span className="text-xs text-cred-dark font-medium select-none">
        {error ? error : null}
      </span>
    </div>
  );
};

export default Input;

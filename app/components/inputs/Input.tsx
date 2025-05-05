"use client";

import clsx from "clsx"; //! ye ek library hai jo classnames ko combine karne ke liye use hoti hai.

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"; //! ye ek library hai jo form ko handle karne ke liye use hoti hai.

interface InputProps {
  id: string; // ye id hai jo humne define kiya hai ki ye sirf string hi ho sakta hai.
  label: string; // ye label hai jo humne define kiya hai ki ye sirf string hi ho sakta hai.
  type?: string; // ye type hai jo humne define kiya hai ki ye sirf string hi ho sakta hai.
  required?: boolean; // ye required hai jo humne define kiya hai ki ye sirf boolean hi ho sakta hai.
  register: UseFormRegister<FieldValues>; // ye register hai jo humne define kiya hai ki ye sirf UseFormRegister hi ho sakta hai.
  errors: FieldErrors; // ye errors hai jo humne define kiya hai ki ye sirf FieldErrors hi ho sakta hai.

  disabled?: boolean; // ye disabled hai jo humne define kiya hai ki ye sirf boolean hi ho sakta hai.
  placeholder?: string; // ye placeholder hai jo humne define kiya hai ki ye sirf string hi ho sakta hai.
}
const Input: React.FC<InputProps> = ({
  // yeha hamne jo uper types define kiya tha n aur jo uske andar props tha to usi props ko yeh per likh dia hai bass
  id,
  label,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm text-gray-900 leading-7 font-medium"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            "form-input block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 sm:text-sm sm:leading-6",
            "focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:outline-none",
            errors[id] && "focus:ring-rose-400",
            disabled && "cursor-default opacity-50"
          )} //! pta hai clsx ek only aise library hai jo hum freedom deta hai aap dynamically class bana sekte hai
        />
      </div>
    </div>
  );
};

export default Input;

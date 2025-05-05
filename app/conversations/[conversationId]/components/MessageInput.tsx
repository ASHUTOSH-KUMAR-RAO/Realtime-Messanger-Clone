"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id = "message",
  register,
  errors,
  required,
  placeholder = "Type a message...",
  type = "text",
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className={`
          w-full 
          py-2.5 
          px-4
          text-gray-800
          bg-white
          border
          rounded-xl
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:border-transparent
          transition
          ${errors[id] 
            ? "border-red-300 focus:ring-red-200" 
            : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }
        `}
      />
      
      {errors[id] && (
        <p className="mt-1 ml-1 text-sm text-red-500">
          {errors[id]?.message?.toString() || "Required"}
        </p>
      )}
    </div>
  );
};

export default MessageInput;
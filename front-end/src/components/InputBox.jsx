import React from "react";

const baseStyle =
  "w-full p-3 rounded-xl bg-gray-200 outline-none text-gray-800 focus:ring-2 focus:ring-blue-400 transition";

function Input({ type = "text", ...props }) {
  return (
    <input
      type={type}
      className={baseStyle}
      {...props}
    />
  );
}


export function TextInputBox(props) {
  return <Input type="text" {...props} />;
}

export function EmailInputBox(props) {
  return <Input type="email" {...props} />;
}

export function PhoneInputBox(props) {
  return <Input type="tel" {...props} />;
}

export function PasswordInputBox(props) {
  return <Input type="password" {...props} />;
}

export function DateInputBox(props) {
  return <Input type="date" {...props} />;
}
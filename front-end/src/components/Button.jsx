import React from "react";
export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg font-medium transition ${className}`}
    >
      {children}
    </button>
  );
}

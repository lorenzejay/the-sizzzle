import React from "react";

const Button = ({ children, type, disabled, className, onClick }) => {
  return (
    <button
      className={`bg-gray-900 text-white text-xl py-1 px-4 mx-auto rounded-md disabled:opacity-50 ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

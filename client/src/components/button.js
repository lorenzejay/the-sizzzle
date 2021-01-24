import React from "react";

const Button = ({ children, type, className }) => {
  return (
    <button
      className={`bg-gray-900 text-white text-xl py-3 px-4 mx-auto rounded-md ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

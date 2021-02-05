import React from "react";

const ErrorMessage = ({ children }) => {
  return <p className="mx-auto w-3/4 p-3 text-red-500 shadow">{children}</p>;
};

export default ErrorMessage;

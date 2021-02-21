import React from "react";

const Form = ({ title, children, handleSubmit, className }) => {
  return (
    <form className={`flex flex-col w-full ${className}`} onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-center text-5xl font-bold mb-6 ">{title}</h1>
      {children}
    </form>
  );
};

export default Form;

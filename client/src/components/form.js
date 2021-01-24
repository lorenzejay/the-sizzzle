import React from "react";

const Form = ({ title, children, handleSubmit }) => {
  return (
    <form className="border-1 p-5 flex flex-col" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-center text-5xl font-bold mb-6">{title}</h1>
      {children}
    </form>
  );
};

export default Form;

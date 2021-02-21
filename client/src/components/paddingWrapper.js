import React from "react";

const PaddingWrapper = ({ children, className }) => {
  return (
    <div
      className={`padding-wrapper w-full mx-auto px-5 pt-5 sm:px-24 md:px-40 lg:px-72 ${className}`}
    >
      {children}
    </div>
  );
};

export default PaddingWrapper;

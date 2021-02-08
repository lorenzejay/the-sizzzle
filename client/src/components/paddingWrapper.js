import React from "react";

const PaddingWrapper = ({ children }) => {
  return (
    <div className="w-full mx-auto px-5 pt-5 pb-10 sm:px-24 md:px-48 lg:px-72">{children}</div>
  );
};

export default PaddingWrapper;

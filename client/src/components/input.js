import React from "react";
import PropTypes from "prop-types";
const Input = ({ placeholder, type, name, value, onChange }) => {
  return (
    <input
      className="px-5 py-2 rounded outline-none w-3/4 md:w-1/2 mx-auto my-3 "
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
};

Input.defaultProps = {
  type: `text`,
};
export default Input;

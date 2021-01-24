import React, { useState } from "react";
import Header from "./header";
import SideBar from "./sidebar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <SideBar isOpen={isOpen} toggle={toggle} />
      <Header toggle={toggle} />
      <div className="mt-20">{children}</div>
    </>
  );
};

export default Layout;

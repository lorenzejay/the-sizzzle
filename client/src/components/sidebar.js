import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: black;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: pointer;
`;

export const SidebarWrapper = styled.div`
  color: #fff;
`;

export const SideBarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;
  margin-bottom: 5vh;
  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

const SideBar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon>
        <CloseIcon />
      </Icon>

      <SidebarWrapper>
        <SideBarMenu>
          <SidebarLink to="/">Home</SidebarLink>
          <SidebarLink to="/sign-up">Sign Up</SidebarLink>
          <SidebarLink to="/sign-in">Sign In</SidebarLink>
        </SideBarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default SideBar;

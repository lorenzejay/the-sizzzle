import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

export const Nav = styled.header`
  //handle transitions here
  background: #fff;
  height: 80px;
  margin-top: -80px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 60;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 12px;
  /* max-width: 1100px; */
`;

//we are grabbing the link from gatsby link
export const NavLink = styled(Link)`
  color: #000;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 6px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 85%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #000;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: 22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

//scroll links
export const NavLinks = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #01bf71;
  }
`;

const Header = ({ siteTitle, homePage, toggle }) => {
  return (
    <>
      <Nav>
        <NavContainer>
          <NavLink className="text-base" to="/">
            RecipeGram
          </NavLink>

          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>

          <NavMenu>
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>

            <NavItem>
              <NavLinks to="/sign-in">Sign In</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/sign-up">Sign Up</NavLinks>
            </NavItem>
          </NavMenu>
        </NavContainer>
      </Nav>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: `RecipeGram`,
  homePage: false,
};

export default Header;

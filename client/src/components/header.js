import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUserDetails,
  logout,
  getUserProfilePicture,
} from "../redux/Actions/userActions";
import { AiFillHome, AiOutlineUpload } from "react-icons/ai";
import DefaultPP from "../images/dpp.png";

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
  overflow: none;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;

  /* max-width: 1100px; */
`;

//logo
export const NavLink = styled(Link)`
  color: #000;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  margin-left: 6px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
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
  justify-content: center;
  list-style: none;
  text-align: center;
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

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;
  //user profile pic
  const userProfilePicture = useSelector((state) => state.userProfilePicture);
  const { profilePic } = userProfilePicture;

  const [searchedProfiles, setSearchedProfile] = useState([]);

  //search function
  const handleSearch = async (e) => {
    try {
      const data = await fetch(`http://localhost:5000/api/users/search/${e.target.value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const parsedData = await data.json();
      setSearchedProfile(parsedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getLoggedInUserDetails());
    }
  }, [dispatch, userInfo]);
  //get the logged in user profilePicture
  useEffect(() => {
    if (loggedInUserDetails) {
      dispatch(getUserProfilePicture(loggedInUserDetails.profilepic));
    }
  }, [dispatch, userInfo, loggedInUserDetails]);

  // console.log(loggedInUserProfileImage);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Nav>
        <NavContainer className="items-center px-5  lg:px-24">
          <NavLink className="text-base" to="/">
            RecipeGram
          </NavLink>

          <div>
            <input
              className="hidden md:block px-5 py-1 text-left"
              name="search"
              type="text"
              placeholder="Search User"
              onChange={handleSearch}
            />
            {searchedProfiles && (
              <div className="origin-top absolute top-12 mt-2 w-56 md:rounded-md md:shadow-lg bg-white md:ring-1 md:ring-black md:ring-opacity-5">
                <div
                  className={` overflow-y-auto ${
                    searchedProfiles.length === 0
                      ? "hidden"
                      : searchedProfiles && searchedProfiles.length === 0
                      ? "hidden"
                      : "block"
                  } max-h-28`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {searchedProfiles &&
                    searchedProfiles.map((user) => (
                      <Link
                        onClick={() => setSearchedProfile([])}
                        key={user.user_id}
                        to={`/dashboard/${user.username}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-500 ease-in-ou"
                      >
                        {user.username}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>

          {loggedInUserDetails ? (
            <NavMenu>
              <NavItem>
                <NavLinks to="/">
                  <AiFillHome size={26} />
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/upload">
                  <AiOutlineUpload size={26} />
                </NavLinks>
              </NavItem>

              <NavItem>
                {loggedInUserDetails && (
                  <NavLinks to={`/dashboard/${loggedInUserDetails.username}`}>
                    <img
                      src={profilePic || DefaultPP}
                      alt="profile of the user"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </NavLinks>
                )}
              </NavItem>
              <NavItem>
                <button className="mt-auto h-full" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </NavItem>
            </NavMenu>
          ) : (
            <NavMenu>
              <NavItem>
                <NavLinks to="/">
                  <AiFillHome size={24} />
                </NavLinks>
              </NavItem>

              <NavItem>
                <NavLinks to="/login">Sign In</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="/sign-up">Sign Up</NavLinks>
              </NavItem>
            </NavMenu>
          )}
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

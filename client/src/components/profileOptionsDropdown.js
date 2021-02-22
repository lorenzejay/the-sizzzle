import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Actions/userActions";
import DefaultPP from "../images/dpp.png";
import { Link } from "react-router-dom";

const ProfileOptionsDropdown = ({ profileDropdown, location }) => {
  const dispatch = useDispatch();
  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  const userProfilePicture = useSelector((state) => state.userProfilePicture);
  const { profilePic } = userProfilePicture;

  // console.log(loggedInUserProfileImage);
  const handleLogout = () => {
    dispatch(logout());
  };

  // console.log(loggedInUserDetails.username);

  return (
    <div
      className={`shadow-2xl absolute top-20 right-2 lg:right-24 min-h-48 w-72 transition-all duration-500 z-10 bg-white  ${
        profileDropdown ? "block" : "hidden"
      }`}
    >
      {loggedInUserDetails && (
        <div>
          <section className="flex items-center justify-between border-b-2 border-opacity-5 border-black w-full p-5 xl:px-8">
            <Link to={`/dashboard/${loggedInUserDetails.username}`}>
              <img
                src={profilePic || DefaultPP}
                alt="user profile thumnail"
                className="w-12 h-12 rounded-full object-cover"
              />
            </Link>
            <div className="flex flex-col items-start">
              <p>
                {loggedInUserDetails.first_name} {loggedInUserDetails.last_name}
              </p>
              <Link
                to={`/dashboard/${loggedInUserDetails.username}`}
                className="text-gray-500 hover:underline"
              >
                @{loggedInUserDetails.username}
              </Link>
            </div>
          </section>
          {loggedInUserDetails && (
            <ul className="flex flex-col justify-around items-start p-5 text-md font-medium text-gray-500   transition-all duration-500 profile-dropdown xl:px-8">
              <li>
                <Link to="/upload" className="hover:text-black">
                  Write a dish
                </Link>
              </li>
              <li>
                {loggedInUserDetails.username && (
                  <Link
                    to={`/dashboard/${loggedInUserDetails.username}`}
                    className="hover:text-black"
                  >
                    Profile
                  </Link>
                )}
              </li>
              <li>
                <Link
                  to={`/dashboard/${loggedInUserDetails.username}/edit-profile`}
                  className="hover:text-black"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-black">
                  Saved
                </Link>
              </li>
              <li>
                <button to="/saved" className="hover:text-black" onClick={handleLogout}>
                  Sign Out
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileOptionsDropdown;

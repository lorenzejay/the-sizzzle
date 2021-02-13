import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Actions/userActions";
import DefaultPP from "../images/dpp.png";
import { Link } from "react-router-dom";

const ProfileOptionsDropdown = ({ profileDropdown }) => {
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
  return (
    <div
      className={` shadow-lg absolute top-20 right-0 lg:right-24 min-h-48 w-72 transition-all duration-500 z-10 bg-white  ${
        profileDropdown ? "opacity-100" : "opacity-0"
      }`}
    >
      {loggedInUserDetails && (
        <div>
          <section className="flex items-center gap-5 border-b-2 border-opacity-5 border-black w-full p-5">
            <Link to={`/dashboard/${loggedInUserDetails.username}`}>
              <img
                src={profilePic || DefaultPP}
                alt="user profile thumnail"
                className="w-8 h-8 rounded-full object-cover"
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
          <ul className="flex flex-col justify-start items-start gap-3 p-5 text-md font-medium text-gray-500   transition-all duration-500">
            <li>
              <Link to="/upload" className="hover:text-black">
                Write a dish
              </Link>
            </li>
            <li>
              <Link to={`/dashboard/${loggedInUserDetails.username}`} className="hover:text-black">
                Profile
              </Link>
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
        </div>
      )}
    </div>
  );
};

export default ProfileOptionsDropdown;

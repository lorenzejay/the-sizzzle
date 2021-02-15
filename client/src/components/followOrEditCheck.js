import React, { useEffect } from "react";
import { FiUserCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkIfUserIsFollowingAlready, followThisUser } from "../redux/Actions/followersAction";
import Loader from "./loader";

const FollowOrEditCheck = ({ isLoggedInUserProfile, anyUserProfile }) => {
  const dispatch = useDispatch();

  const checkIfFollowing = useSelector((state) => state.checkIfFollowing);
  const { isFollowing } = checkIfFollowing;

  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  //follow a user action.
  const followUser = useSelector((state) => state.follow);
  const { loading: loadFollow, follow, error: followError } = followUser;

  //check if the user is following
  useEffect(() => {
    if (anyUserProfile && loggedInUserDetails && anyUserProfile !== loggedInUserDetails.user_id) {
      dispatch(checkIfUserIsFollowingAlready(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile, follow, loggedInUserDetails]);

  const followCommand = () => {
    //cannot follow yourself
    if (anyUserProfile.user.user_id !== loggedInUserDetails.user_id) {
      dispatch(followThisUser(anyUserProfile.user.user_id));
    }
  };

  return (
    <div className="my-10">
      {anyUserProfile && (
        <>
          {loadFollow && <Loader />}
          {isLoggedInUserProfile && loggedInUserDetails ? (
            <Link
              className="bg-gray-500 px-10 rounded text-white py-1 my-5"
              to={`/dashboard/${loggedInUserDetails.username}/edit-profile`}
            >
              Edit Profile
            </Link>
          ) : loggedInUserDetails ? (
            <button
              className={`px-10 rounded text-white py-1 my-5 focus:outline-none w-40 h-8 text-center transition duration-500 ease-in-out block ${
                isFollowing ? "bg-gray-300" : "bg-red-500"
              }`}
              onClick={followCommand}
            >
              {isFollowing ? <FiUserCheck className="mx-auto" size={16} /> : "Follow"}
            </button>
          ) : (
            <Link to="/login" className="bg-red-500 px-10 rounded text-white py-1 my-5 block">
              Login to follow
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default FollowOrEditCheck;

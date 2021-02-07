import React, { useEffect } from "react";
import { FiUserCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkIfUserIsFollowingAlready, followThisUser } from "../redux/Actions/followersAction";

const FollowOrEditCheck = ({ isLoggedInUserProfile, userInfo, anyUserProfile }) => {
  const dispatch = useDispatch();

  const checkIfFollowing = useSelector((state) => state.checkIfFollowing);
  const { isFollowing } = checkIfFollowing;

  //follow a user action.
  const followUser = useSelector((state) => state.follow);
  const { loading: loadFollow, follow, error: followError } = followUser;

  //check if the user is following
  useEffect(() => {
    if (anyUserProfile && userInfo && anyUserProfile !== userInfo.returnedUserId) {
      dispatch(checkIfUserIsFollowingAlready(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile, follow]);

  const followCommand = () => {
    //cannot follow yourself
    if (anyUserProfile.user.user_id !== userInfo.returnedUserId) {
      dispatch(followThisUser(anyUserProfile.user.user_id));
    }
  };

  return (
    <>
      {isLoggedInUserProfile && userInfo ? (
        <Link
          className="bg-gray-500 px-10 rounded text-white py-1 my-5"
          to={{
            pathname: `/dashboard/${anyUserProfile.user.username}/edit-profile`,
            state: {
              user: userInfo.returnedUserId,
            },
          }}
        >
          Edit Profile
        </Link>
      ) : userInfo && userInfo.returnedUsername ? (
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
  );
};

export default FollowOrEditCheck;

import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import ProfileWoman from "../images/profile_female.jpg";
import ProfileMan from "../images/profile_male.jpg";
import styled from "styled-components";
import { getAnyUserDetails } from "../redux/Actions/userActions";
import {
  getFollowers,
  followThisUser,
  checkIfUserIsFollowingAlready,
} from "../redux/Actions/followersAction";
import PostImage from "../images/steak.jpg";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import { FiCheckUs, FiUserCheck } from "react-icons/fi";

export const UserProfile = styled.div``;

export const PostThumnails = styled.div``;

const Dashboard = ({ location }) => {
  const [isLoggedInUserProfile, setIsLoggedInUserProfile] = useState(false);

  const path = location.pathname;
  const queriedUser = path.substring(11, path.length);

  const dispatch = useDispatch();

  //if there is a logged in user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //if its any other user
  const anyUserDetails = useSelector((state) => state.anyUserDetails);
  const { loading, anyUserProfile, error } = anyUserDetails;

  //get followers of queried user
  const getFollows = useSelector((state) => state.getFollows);
  const { loading: loadingFollowers, followers, error: getFollowersError } = getFollows;

  //follow a user action.
  const followUser = useSelector((state) => state.follow);
  const { loading: loadFollow, follow, error: followError } = followUser;

  //check if logged in user is already following the current dashboard user page they are on
  const checkIfFollowing = useSelector((state) => state.checkIfFollowing);
  const { isFollowing } = checkIfFollowing;

  //get the user info
  useEffect(() => {
    dispatch(getAnyUserDetails(queriedUser));

    if (userInfo && userInfo.returnedUsername === queriedUser) {
      setIsLoggedInUserProfile(true);
    } else {
      setIsLoggedInUserProfile(false);
    }
  }, [dispatch, queriedUser]);

  //get followers and following count
  useEffect(() => {
    if (anyUserProfile && anyUserProfile.user) {
      dispatch(getFollowers(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile, loading, follow]);

  //get followers and following count
  useEffect(() => {
    if (anyUserProfile && anyUserProfile.user) {
      dispatch(checkIfUserIsFollowingAlready(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile, loading, follow]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const followCommand = () => {
    //cannot follow yourself
    if (anyUserProfile.user.user_id !== userInfo.returnedUserId) {
      dispatch(followThisUser(anyUserProfile.user.user_id));
    }
  };

  console.log(follow);
  // console.log(userInfo);

  return (
    <Layout>
      {loading && <Loader />}
      {error && <h1>{error}</h1>}
      {!anyUserProfile && <h1>There is no user profile</h1>}
      {anyUserProfile && anyUserProfile.user && (
        <UserProfile className="px-10 flex flex-col">
          <div className="flex flex-col justify-center items-center mt-10">
            <img
              src={isLoggedInUserProfile ? ProfileWoman : ProfileMan}
              alt="woman"
              title="profile picture"
              className="rounded-full h-48 w-48 object-cover mb-10"
            />
            <div className="flex flex-row font-bold text-3xl gap-3">
              <h2>{`${anyUserProfile.user.first_name}  ${anyUserProfile.user.last_name}`}</h2> |{" "}
              <h2>
                {" "}
                <span className="text-xl">@</span>
                {anyUserProfile.user.username}
              </h2>
            </div>
            {followers && (
              <div className="followers flex flex-row gap-5">
                <p>Followers: {followers.followerCount}</p>
                <p>Following: {followers.followingCount}</p>
              </div>
            )}
            {isLoggedInUserProfile && userInfo ? (
              <Link
                className="bg-gray-500 px-10 rounded text-white py-1 my-5"
                to={`/dashboard/${userInfo.returnedUsername}/edit-profile`}
              >
                Edit Profile
              </Link>
            ) : userInfo && userInfo.returnedUsername ? (
              <button
                className={`px-10 rounded text-white py-1 my-5 focus:outline-none w-40 h-8 text-center ${
                  isFollowing ? "bg-gray-300" : "bg-red-500"
                }`}
                onClick={followCommand}
              >
                {isFollowing ? <FiUserCheck className="mx-auto" size={16} /> : "Follow"}
              </button>
            ) : (
              <Link to="/login" className="bg-red-500 px-10 rounded text-white py-1 my-5">
                Login to follow
              </Link>
            )}
          </div>

          <div className="post-grid grid grid-cols-3 gap-5 justify-center mt-10">
            <img src={PostImage} alt="Post thumnail" className="w-32 h-32" />
            <img src={PostImage} alt="Post thumnail" className="w-32 h-32" />
            <img src={PostImage} alt="Post thumnail" className="w-32 h-32" />
          </div>
        </UserProfile>
      )}
    </Layout>
  );
};

export default Dashboard;

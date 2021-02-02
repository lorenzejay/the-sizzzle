import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import DefaultPP from "../images/dpp.png";
import styled from "styled-components";
import { getAnyUserDetails } from "../redux/Actions/userActions";
import {
  getFollowers,
  followThisUser,
  checkIfUserIsFollowingAlready,
} from "../redux/Actions/followersAction";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import { getAllUserPosts } from "../redux/Actions/uploadActions";

export const UserProfile = styled.div``;

export const PostThumnails = styled.div``;

const Dashboard = ({ location }) => {
  const [isLoggedInUserProfile, setIsLoggedInUserProfile] = useState(false);

  const path = location.pathname;
  const queriedUser = path.substring(1, path.length);
  console.log(path);
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

  //get the users posts
  const allUserPosts = useSelector((state) => state.allUserPosts);
  const { allPosts, loading: loadPosts, error: errorPosts } = allUserPosts;

  //get the user info
  useEffect(() => {
    dispatch(getAnyUserDetails(queriedUser));

    if (userInfo && userInfo.returnedUsername === queriedUser) {
      setIsLoggedInUserProfile(true);
    } else {
      setIsLoggedInUserProfile(false);
    }
  }, [dispatch, queriedUser, userInfo]);

  //get followers and following count
  useEffect(() => {
    if (anyUserProfile && anyUserProfile.user) {
      dispatch(getFollowers(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile, loading, follow]);

  //check if the user is following
  useEffect(() => {
    if (anyUserProfile && userInfo && anyUserProfile !== userInfo.returnedUserId) {
      dispatch(checkIfUserIsFollowingAlready(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile, follow]);

  //get users posts
  useEffect(() => {
    if (anyUserProfile && anyUserProfile.user) {
      dispatch(getAllUserPosts(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const followCommand = () => {
    //cannot follow yourself
    if (anyUserProfile.user.user_id !== userInfo.returnedUserId) {
      dispatch(followThisUser(anyUserProfile.user.user_id));
    }
  };

  console.log(isFollowing);

  return (
    <Layout>
      {loading && <Loader />}
      {error && <h1>{error}</h1>}
      {!anyUserProfile && <h1>There is no user profile</h1>}
      {anyUserProfile && anyUserProfile.user && (
        <UserProfile className="px-10 flex flex-col">
          <div className="flex flex-col justify-center items-center mt-10">
            <img
              src={DefaultPP}
              alt="Profile Picture"
              title="profile picture"
              className="rounded-full h-52 w-52 object-cover mb-10"
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
          </div>

          <div className="post-grid grid grid-cols-3 gap-5 justify-center mt-10 md:mx-auto md:gap-32">
            {loadPosts && <Loader />}
            {errorPosts && <h1 className="text-red-600">{errorPosts}</h1>}
            {allPosts &&
              allPosts.map((post) => (
                <Link
                  to={{
                    pathname: `/post/${post.upload_id}`,
                    state: {
                      // title: post.title,
                      // description: post.description,
                      // cloudinaryId: post.cloudinary_id,
                      // uploadedBy: post.uploaded_by,
                      uploadId: post.upload_id,
                      // imageUrl: post.image_url,
                      // createdAt: post.created_at,
                    },
                  }}
                  key={post.upload_id}
                >
                  <img
                    src={post.image_url}
                    className="w-32 h-32 md:w-44 md:h-44 object-cover"
                    loading="lazy"
                    alt="post"
                  />
                </Link>
              ))}
            {allPosts && allPosts.length === 0 && (
              <h2 className="flex items-center">No Posts Yet </h2>
            )}
          </div>
        </UserProfile>
      )}
    </Layout>
  );
};

export default Dashboard;

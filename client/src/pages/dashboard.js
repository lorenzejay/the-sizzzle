import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import DefaultPP from "../images/dpp.png";
import styled from "styled-components";
import { getAnyUserDetails } from "../redux/Actions/userActions";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import { getAllUserPosts } from "../redux/Actions/uploadActions";
import ErrorMessage from "../components/errorMessage";
import FollowersTab from "../components/followersTab";
import FollowOrEditCheck from "../components/followOrEditCheck";

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

  // //follow a user action.
  // const followUser = useSelector((state) => state.follow);
  // const { loading: loadFollow, follow, error: followError } = followUser;

  //check if logged in user is already following the current dashboard user page they are on
  // const checkIfFollowing = useSelector((state) => state.checkIfFollowing);
  // const { isFollowing } = checkIfFollowing;

  //get the users posts
  const allUserPosts = useSelector((state) => state.allUserPosts);
  const { allPosts, loading: loadPosts, error: errorPosts } = allUserPosts;

  //get the user info
  useEffect(() => {
    dispatch(getAnyUserDetails(queriedUser));
  }, [dispatch, queriedUser, userInfo]);

  // //check if the user is following
  // useEffect(() => {
  //   if (anyUserProfile && userInfo && anyUserProfile !== userInfo.returnedUserId) {
  //     dispatch(checkIfUserIsFollowingAlready(anyUserProfile.user.user_id));
  //   }
  // }, [dispatch, anyUserProfile, follow]);

  useEffect(() => {
    if (anyUserProfile) {
      if (userInfo && userInfo.returnedUserId === anyUserProfile.user.user_id) {
        setIsLoggedInUserProfile(true);
      } else {
        setIsLoggedInUserProfile(false);
      }
    }
  }, [queriedUser, userInfo, anyUserProfile]);

  //get users posts
  useEffect(() => {
    if (anyUserProfile && anyUserProfile.user) {
      dispatch(getAllUserPosts(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Layout>
      {loading && <Loader />}
      {error && <h1>{error}</h1>}
      {!loading && !anyUserProfile && <ErrorMessage>There is no user profile</ErrorMessage>}
      {anyUserProfile && anyUserProfile.user && (
        <UserProfile className="px-10 flex flex-col">
          <div className="flex flex-col justify-center items-center mt-10">
            <img
              src={anyUserProfile.user.profilepic || DefaultPP}
              alt="Profile Picture"
              title="profile picture"
              className="rounded-full w-32 h-32 md:h-52 md:w-52 object-cover mb-10"
            />
            <div className="flex flex-row font-bold text-3xl gap-3">
              <h2>{`${anyUserProfile.user.first_name}  ${anyUserProfile.user.last_name}`}</h2> |{" "}
              <h2>
                {" "}
                <span className="text-xl">@</span>
                {anyUserProfile.user.username}
              </h2>
            </div>
            <FollowersTab anyUserProfile={anyUserProfile} userInfo={userInfo} />

            <FollowOrEditCheck
              isLoggedInUserProfile={isLoggedInUserProfile}
              userInfo={userInfo}
              anyUserProfile={anyUserProfile}
            />
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
                      uploadId: post.upload_id,
                      uploaded_by: post.uploaded_by,
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

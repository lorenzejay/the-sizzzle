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

export const PostThumnails = styled.div``;

const Dashboard = ({ location }) => {
  const [isLoggedInUserProfile, setIsLoggedInUserProfile] = useState(false);

  const path = location.pathname;
  const queriedUser = path.substring(11, path.length);

  const dispatch = useDispatch();

  //if its any other user
  const anyUserDetails = useSelector((state) => state.anyUserDetails);
  const { loading, anyUserProfile, error } = anyUserDetails;

  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  //get the users posts
  const allUserPosts = useSelector((state) => state.allUserPosts);
  const { allPosts, loading: loadPosts, error: errorPosts } = allUserPosts;

  //get the user info
  useEffect(() => {
    dispatch(getAnyUserDetails(queriedUser));
  }, [dispatch, queriedUser, loggedInUserDetails]);

  useEffect(() => {
    if (anyUserProfile) {
      if (loggedInUserDetails && loggedInUserDetails.user_id === anyUserProfile.user.user_id) {
        setIsLoggedInUserProfile(true);
      } else {
        setIsLoggedInUserProfile(false);
      }
    }
  }, [queriedUser, loggedInUserDetails, anyUserProfile]);

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
      {!anyUserProfile && <ErrorMessage>There is no user profile</ErrorMessage>}
      {anyUserProfile && anyUserProfile.user && (
        <div className="px-10 flex flex-col">
          <div className="flex flex-col justify-center items-center mt-10">
            <img
              src={anyUserProfile.user.profilepic || DefaultPP}
              alt="user profile thumnail"
              title="profile picture"
              className="rounded-full w-32 h-32 md:h-52 md:w-52 object-cover mb-10"
            />
            <div className="flex flex-row font-bold text-3xl gap-3">
              {/* <h2 className="lg:border-r-2">{`${anyUserProfile.user.first_name}  ${anyUserProfile.user.last_name}`}</h2>{" "} */}
              <h2>
                {" "}
                <span className="text-xl">@</span>
                {anyUserProfile.user.username}
              </h2>
            </div>
            <FollowersTab anyUserProfile={anyUserProfile} />

            <FollowOrEditCheck
              isLoggedInUserProfile={isLoggedInUserProfile}
              anyUserProfile={anyUserProfile}
            />
          </div>

          <div className="post-grid grid grid-cols-3 gap-5 justify-center mt-10 md:mx-auto md:gap-32">
            {loadPosts && <Loader />}
            {errorPosts && <h1 className="text-red-600">{errorPosts}</h1>}
            {allPosts &&
              allPosts.map((post) => (
                <Link to={`/post/${post.upload_id}`} key={post.upload_id}>
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
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;

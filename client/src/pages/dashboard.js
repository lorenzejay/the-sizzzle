import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getAnyUserDetails } from "../redux/Actions/userActions";
import Loader from "../components/loader";
import ErrorMessage from "../components/errorMessage";
import FollowersTab from "../components/followersTab";
import FollowOrEditCheck from "../components/followOrEditCheck";
import LoggedInUserProfilePicture from "../components/dashboardProfilePicture";
import DashboardPosts from "../components/dashboardPosts";

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

  //if user ever gets past 999 followers
  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  return (
    <Layout>
      {loading && <Loader />}
      {error && <h1>{error}</h1>}
      {!anyUserProfile && !loading && <ErrorMessage>There is no user profile</ErrorMessage>}
      {anyUserProfile && anyUserProfile.user && (
        <div className="px-10 flex flex-col">
          <div className="flex flex-col justify-center items-center mt-10">
            <LoggedInUserProfilePicture />
            <div className="flex flex-row font-bold text-3xl gap-3">
              <h2>
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
          <DashboardPosts />
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;

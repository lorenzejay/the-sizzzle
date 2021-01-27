import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import ProfileWoman from "../images/profile_female.jpg";
import ProfileMan from "../images/profile_male.jpg";
import styled from "styled-components";
import { getAnyUserDetails, getUserDetails } from "../redux/Actions/userActions";

import PostImage from "../images/steak.jpg";
import Loader from "../components/loader";
import { Link } from "react-router-dom";

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

  //get the user info
  useEffect(() => {
    dispatch(getAnyUserDetails(queriedUser));

    if (userInfo.returnedUsername === queriedUser) {
      setIsLoggedInUserProfile(true);
    } else {
      setIsLoggedInUserProfile(false);
    }
  }, [dispatch, queriedUser]);

  console.log(anyUserProfile);

  return (
    <Layout>
      {loading && <Loader />}
      {error && <h1>{error}</h1>}
      {!anyUserProfile && <h1>There is no user profile</h1>}
      {anyUserProfile && anyUserProfile.user && (
        <UserProfile className="px-10 flex flex-col">
          <div className="flex flex-col justify-center items-center">
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
            <div className="followers flex flex-row gap-5">
              <p>Followers: 10k</p>
              <p>Followers: 10k</p>
            </div>
            {isLoggedInUserProfile ? (
              <Link
                className="bg-gray-500 px-10 rounded text-white py-1 my-5"
                to={`/dashboard/${userInfo.returnedUsername}/edit-profile`}
              >
                Edit Profile
              </Link>
            ) : (
              <button className="bg-red-500 px-10 rounded text-white py-1 my-5">Follow</button>
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

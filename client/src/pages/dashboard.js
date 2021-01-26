import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import ProfileWoman from "../images/profile_female.jpg";
import styled from "styled-components";
import { getUserDetails } from "../redux/Actions/userActions";

import PostImage from "../images/steak.jpg";

export const UserProfile = styled.div``;

export const PostThumnails = styled.div``;

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, profile } = userDetails;

  //checks if user is logged in else redirect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  console.log(profile);
  return (
    <Layout>
      {profile && (
        <UserProfile className="px-10 flex flex-col">
          <div className="flex flex-col justify-center items-center">
            <img
              src={ProfileWoman}
              alt="woman"
              title="profile picture"
              className="rounded-full h-48 w-48 object-cover mb-10"
            />
            <div className="flex flex-row font-bold text-3xl gap-3">
              <h2>{`${profile.first_name}  ${profile.last_name}`}</h2> |{" "}
              <h2>
                {" "}
                <span className="text-xl">@</span>
                {profile.username}
              </h2>
            </div>
            <div className="followers flex flex-row gap-5">
              <p>Followers: 10k</p>
              <p>Followers: 10k</p>
            </div>
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

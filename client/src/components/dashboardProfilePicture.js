import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DefaultPP from "../images/dpp.png";
import Loader from "./loader";

const LoggedInUserProfilePicture = () => {
  const [dashboardUserProfilePicture, setDashboardUserProfilePicture] = useState("");
  const anyUserDetails = useSelector((state) => state.anyUserDetails);
  const { loading, anyUserProfile } = anyUserDetails;

  const getuserProfileImage = async () => {
    try {
      const data = await fetch(`/api/users/profile-pic/${anyUserProfile.user.profilepic}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parsedData = await data.json();
      setDashboardUserProfilePicture(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (anyUserProfile) {
      getuserProfileImage();
    }
  }, [anyUserProfile]);
  // console.log(dashboardUserProfilePicture);
  return (
    <>
      {loading && <Loader />}
      <img
        src={dashboardUserProfilePicture || DefaultPP}
        alt="user profile thumnail"
        title="profile picture"
        className="rounded-full w-32 h-32 md:h-52 md:w-52 object-cover mb-10"
      />
    </>
  );
};

export default LoggedInUserProfilePicture;

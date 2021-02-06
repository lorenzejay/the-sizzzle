import React, { useEffect, useState } from "react";
import DfProfile from "../images/dpp.png";
const UploaderProfileBar = ({ uploaded_by }) => {
  const [uploaderProfile, setUploaderProfile] = useState({});

  //get the profile pic and username from post
  const uploadsProfileAndUsername = async (uploaded_by) => {
    try {
      const data = await fetch("http://localhost:5000/api/upload/upload-username-profilepic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploaded_by }),
      });
      //returns the array of the random posts
      const parsedData = await data.json();
      return parsedData;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    uploadsProfileAndUsername(uploaded_by).then((res) => setUploaderProfile(res));
  }, [uploaded_by]);
  //   console.log(uploaderProfile);
  //   useEffect(() => {
  //     if (uploaderProfile) {
  //       console.log(uploaderProfile);
  //     }
  //   });

  return (
    <div>
      <div className="flex gap-3 px-5 mb-3 lg:p-0">
        <img
          src={uploaderProfile.profilepic || DfProfile}
          alt="poster profile picture"
          className="w-7 h-7 rounded-full object-cover"
        />
        <p>{uploaderProfile.username}</p>
      </div>
    </div>
  );
};

export default UploaderProfileBar;

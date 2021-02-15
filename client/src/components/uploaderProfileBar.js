import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DfProfile from "../images/dpp.png";
const UploaderProfileBar = ({ uploaded_by, className }) => {
  const [uploaderProfile, setUploaderProfile] = useState({});

  //get the profile pic and username from post
  const uploadsProfileAndUsername = async (uploaded_by) => {
    try {
      const data = await fetch("/api/upload/upload-username-profilepic", {
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
  // console.log(uploaderProfile);
  return (
    <div>
      {uploaded_by && uploaderProfile && (
        <>
          <Link
            to={`/dashboard/${uploaderProfile.username}`}
            className={`flex items-center gap-3 mb-3 lg:p-0 ${className}`}
          >
            <img
              src={uploaderProfile.imageUrl || DfProfile}
              alt="poster profile picture"
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="text-sm sm:text-lg lg:text-xl">{uploaderProfile.username}</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default UploaderProfileBar;

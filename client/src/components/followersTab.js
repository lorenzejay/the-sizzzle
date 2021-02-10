import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../redux/Actions/followersAction";
import ErrorMessage from "./errorMessage";

const FollowersTab = ({ anyUserProfile }) => {
  const dispatch = useDispatch();
  const getFollows = useSelector((state) => state.getFollows);
  const { followers, error } = getFollows;

  //if a follow action occured this will trigger a refresh on getFollowers
  const followUser = useSelector((state) => state.follow);
  const { follow } = followUser;

  useEffect(() => {
    if (anyUserProfile && anyUserProfile.user) {
      dispatch(getFollowers(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile, follow]);

  return (
    <div className="followers flex flex-row gap-5">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {followers && (
        <div className="text-xl flex gap-10 mt-5">
          <p>Followers: {followers.followerCount}</p>
          <p>Following: {followers.followingCount}</p>
        </div>
      )}
    </div>
  );
};

export default FollowersTab;

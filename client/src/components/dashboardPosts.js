import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUserPosts } from "../redux/Actions/uploadActions";
import ErrorMessage from "./errorMessage";

const DashboardPosts = () => {
  const dispatch = useDispatch();

  //if there is a logged in user
  //if its any other user
  const anyUserDetails = useSelector((state) => state.anyUserDetails);
  const { anyUserProfile } = anyUserDetails;

  //get the users posts
  const allUserPosts = useSelector((state) => state.allUserPosts);
  const { allPosts, error: errorPosts } = allUserPosts;

  //get users posts
  useEffect(() => {
    if (anyUserProfile && anyUserProfile.user) {
      dispatch(getAllUserPosts(anyUserProfile.user.user_id));
    }
  }, [dispatch, anyUserProfile]);

  return (
    <div className="post-grid grid grid-cols-3 my-10 justify-center md:mx-auto md:gap-32">
      {errorPosts && <ErrorMessage className="text-red-600 w-full">{errorPosts}</ErrorMessage>}
      {allPosts &&
        allPosts.map((post) => (
          <Link to={`/post/${post.upload_id}`} key={post.upload_id}>
            <img
              src={post.image_url}
              className="w-full h-40  md:w-48 md:h-48 xl:w-64 xl:h-64 object-cover"
              loading="lazy"
              alt="post"
            />
          </Link>
        ))}
      {allPosts && allPosts.length === 0 && <h2 className="w-full text-center">No Posts Yet </h2>}
    </div>
  );
};

export default DashboardPosts;

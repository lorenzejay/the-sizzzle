import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCurrentUserFollowingsPost } from "../redux/Actions/uploadActions";
import Loader from "../components/loader";
import PaddingWrapper from "../components/paddingWrapper";
import PostPreview from "../components/postPreview";

const Homepage = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;
  const userFollowingsPosts = useSelector((state) => state.userFollowingsPosts);
  const { loading, error, posts } = userFollowingsPosts;

  const [randomPosts, setRandomPosts] = useState([]);

  //if you are logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(getAllCurrentUserFollowingsPost());
    } else {
      getRandomPosts();
    }
  }, [dispatch, userInfo, loggedInUserDetails]);

  //if there is no user logged in get random posts
  const getRandomPosts = async () => {
    try {
      const data = await fetch("/api/upload/random", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      //returns the array of the random posts
      const parsedData = await data.json();
      setRandomPosts(parsedData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      {loading && <Loader />}
      {error && <h3>{error}</h3>}
      <div className="flex flex-col justify-center items-center gap-10 pt-5 md:gap-20 lg:gap-24">
        {posts &&
          posts.map((post) => {
            return (
              <PaddingWrapper key={post.upload_id}>
                <PostPreview post={post} />
              </PaddingWrapper>
            );
          })}
        {randomPosts &&
          randomPosts.map((post) => {
            return (
              <PaddingWrapper key={post.upload_id}>
                <PostPreview post={post} />
              </PaddingWrapper>
            );
          })}
      </div>
    </Layout>
  );
};

export default Homepage;

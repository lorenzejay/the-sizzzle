import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCurrentUserFollowingsPost } from "../redux/Actions/uploadActions";
import Loader from "../components/loader";
import PaddingWrapper from "../components/paddingWrapper";
import PostPreview from "../components/postPreview";
import FeaturedPost from "../components/featuredPost";

const Homepage = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;
  const userFollowingsPosts = useSelector((state) => state.userFollowingsPosts);
  const { loading, error, posts } = userFollowingsPosts;

  // const [randomPosts, setRandomPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  //if you are logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(getAllCurrentUserFollowingsPost());
    } else {
      getRandomPosts();
    }
  }, [dispatch, userInfo, loggedInUserDetails]);

  useEffect(() => {
    if (posts && posts.length === 0) {
      return getRandomPosts();
    }
    setDisplayedPosts(posts);
  }, [posts]);
  //if there is no user logged in get random posts
  const getRandomPosts = async () => {
    try {
      const data = await fetch("/api/upload/random", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      //returns the array of the random posts
      const parsedData = await data.json();

      return setDisplayedPosts(parsedData);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(posts);
  // console.log("displayedposts", displayedPosts);

  return (
    <Layout>
      <PaddingWrapper>
        {loading && <Loader />}
        {/* {error && <h3>{error}</h3>} */}
        <FeaturedPost />
        <div className="flex flex-col justify-center items-center gap-10 pt-5 md:gap-20 lg:gap-24">
          {displayedPosts &&
            displayedPosts.map((post) => {
              return <PostPreview post={post} key={post.upload_id} />;
            })}
          {/* {posts &&
            posts.map((post) => {
              return <PostPreview post={post} key={post.upload_id} />;
            })}
          {randomPosts &&
            randomPosts.map((post) => {
              return <PostPreview post={post} key={post.upload_id} />;
            })} */}
        </div>
      </PaddingWrapper>
    </Layout>
  );
};

export default Homepage;

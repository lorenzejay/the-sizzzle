import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCurrentUserFollowingsPost } from "../redux/Actions/uploadActions";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import UploaderProfileBar from "../components/uploaderProfileBar";
import PaddingWrapper from "../components/paddingWrapper";

const Homepage = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userFollowingsPosts = useSelector((state) => state.userFollowingsPosts);
  const { loading, error, posts } = userFollowingsPosts;

  const [randomPosts, setRandomPosts] = useState([]);

  //if you are logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(getAllCurrentUserFollowingsPost());
    }
  }, [dispatch, userInfo]);

  //if there is no user logged in get random posts
  const getRandomPosts = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/upload/random", {
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

  useEffect(() => {
    if (!userInfo) {
      getRandomPosts();
    }
  }, [userInfo]);

  //set the time
  const diffTime = (dt1, dt2) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    if (Math.abs(Math.round(diff)) < 24) {
      return `${Math.abs(Math.round(diff))} hours ago`;
    }
    var day_difference = (dt2.getTime() - dt1.getTime()) / 1000 / 60 / 60 / 24;
    return `${Math.round(day_difference)} days ago`;
  };

  return (
    <Layout>
      {loading && <Loader />}
      {error && <h3>{error}</h3>}
      <div className="flex flex-col justify-center items-center gap-10 pt-20 md:gap-20 lg:gap-24">
        {posts &&
          posts.map((post) => {
            const dt1 = new Date(post.created_at);
            const dt2 = new Date();

            return (
              <PaddingWrapper key={post.uploadId}>
                <UploaderProfileBar uploaded_by={post.uploaded_by} />
                <Link to={`/post/${post.upload_id}`} className="mx-auto" key={post.upload_id}>
                  <img src={post.image_url} loading="lazy" className="object-cover w-full " />
                  <div className=" lg:p-0 mt-3">
                    <h3 className="text-xl">{post.title}</h3>
                    <h3 className="text-lg">{post.caption}</h3>
                    <p className="text-sm text-gray-500">{diffTime(dt1, dt2)} </p>
                  </div>
                </Link>
              </PaddingWrapper>
            );
          })}
        {randomPosts &&
          randomPosts.map((post) => {
            const dt1 = new Date(post.created_at);
            const dt2 = new Date();

            return (
              <PaddingWrapper
                className="w-full mx-auto px-5 sm:px-24 md:px-48 lg:px-72"
                key={post.uploadId}
              >
                <UploaderProfileBar uploaded_by={post.uploaded_by} />
                <Link
                  to={{
                    pathname: `/post/${post.upload_id}`,
                    state: {
                      uploadId: post.upload_id,
                      uploaded_by: post.uploaded_by,
                    },
                  }}
                  className="w-full md:w-1/2 mx-auto"
                  key={post.upload_id}
                >
                  <img src={post.image_url} loading="lazy" className="object-cover w-full" />
                  <div className=" mt-3">
                    <h3 className="text-xl">{post.title}</h3>
                    <h3 className="text-lg">{post.description}</h3>
                    <p className="text-sm text-gray-400">{diffTime(dt1, dt2)} </p>
                  </div>
                </Link>
              </PaddingWrapper>
            );
          })}
      </div>
    </Layout>
  );
};

export default Homepage;

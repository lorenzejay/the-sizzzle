import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCurrentUserFollowingsPost } from "../redux/Actions/uploadActions";
import Loader from "../components/loader";
import { Link } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userFollowingsPosts = useSelector((state) => state.userFollowingsPosts);
  const { loading, error, posts } = userFollowingsPosts;

  //if you are logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(getAllCurrentUserFollowingsPost());
    }
  }, [dispatch, userInfo]);

  //get featured posts
  const diffTime = (dt1, dt2) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    if (Math.abs(Math.round(diff)) < 24) {
      return `${Math.abs(Math.round(diff))} hours ago`;
    }
    var day_difference = (dt2.getTime() - dt1.getTime()) / 1000 / 60 / 60 / 24;
    return `${Math.round(day_difference)} days ago`;
  };

  console.log(posts);
  return (
    <Layout>
      {loading && <Loader />}
      {error && <h3>{error}</h3>}
      <div className="flex flex-col gap-10 pt-20 md:gap-20 lg:gap-24">
        {posts &&
          posts.map((post) => {
            const dt1 = new Date(post.created_at);
            const dt2 = new Date();

            return (
              <Link
                to={{
                  pathname: `/post/${post.upload_id}`,
                  state: {
                    uploadId: post.upload_id,
                  },
                }}
                className="w-full md:w-1/2 mx-auto"
                key={post.upload_id}
              >
                <img src={post.image_url} loading="lazy" className=" object-cover" />
                <div className="p-5 lg:p-0 mt-3">
                  <h3 className="text-xl">{post.title}</h3>
                  <h3 className="text-md">{post.description}</h3>
                  <p>{diffTime(dt1, dt2)} </p>
                </div>
              </Link>
            );
          })}
      </div>
    </Layout>
  );
};

export default Homepage;

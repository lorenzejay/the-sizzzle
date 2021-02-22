import React, { useEffect, useState } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import convertDate from "./date";
import UploaderProfileBar from "./uploaderProfileBar";

const FeaturedPost = () => {
  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  const [featuredPosts, setFeaturedPosts] = useState([]);
  //gets the top 6 posts from the week based on the most likes
  const getFeaturedPosts = async () => {
    try {
      const data = await fetch("/api/upload/featured-posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await data.json();
      console.log(result);
      setFeaturedPosts(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeaturedPosts();
  }, []);

  return (
    <div className="pt-5 lg:pt-10">
      <h2 className="font-medium mb-3 flex items-center text-xl">
        <span>
          <BiTrendingUp className="mr-1" />
        </span>
        Trending on The Sizzzle
      </h2>
      <section>
        {loggedInUserDetails && (
          <ul className="lg:flex gap-7">
            {featuredPosts &&
              featuredPosts.map((post, i) => {
                return (
                  <li className="mb-8">
                    <Link to={`/post/${post.upload_id}`} className="featured-list-item flex ">
                      <div className="flex">
                        <span className="text-gray-400 text-3xl mr-3">0{i + 1}</span>
                      </div>
                      <div className="ml-3 pt-1">
                        <UploaderProfileBar uploaded_by={post.uploaded_by} />
                        <div>
                          <h3 className="font-bold">{post.title}</h3>
                          <div>
                            {convertDate(post.created_at)} ·{" "}
                            <span
                              className={`${post.difficulty === "easy" && "bg-green-300"} ${
                                post.difficulty === "medium" && "bg-yellow-300"
                              } ${post.difficulty === "hard" && "bg-red-300"} ${
                                post.difficulty === "extreme" && "bg-red-600"
                              } px-3 `}
                            >
                              {post.difficulty.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default FeaturedPost;

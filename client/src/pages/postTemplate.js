import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { getUploadDetails } from "../redux/Actions/uploadActions";

const PostTemplate = () => {
  const dispatch = useDispatch();
  const [isUserLoginPost, setIsUserLoginPost] = useState(false);

  const data = useLocation();
  const { state } = data;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const uploadDetails = useSelector((state) => state.uploadDetails);
  const { details, loading, error } = uploadDetails;

  //check if this is users post
  useEffect(() => {
    if (userInfo.returnedUserId === state.uploadedBy) {
      setIsUserLoginPost(true);
    }
  }, [userLogin]);

  useEffect(() => {
    dispatch(getUploadDetails(state.uploadId));
  }, [dispatch]);

  //   console.log(userInfo);
  console.log(details);
  //   console.log(state);

  return (
    <Layout>
      <div className="px-2 md:px-20 pt-10">
        {!isUserLoginPost ? (
          <span className="flex gap-3 justify-end">
            <AiOutlineHeart size={24} />
            <BsBookmark size={24} />
          </span>
        ) : (
          <Link to="/" className="flex gap-3 justify-end">
            Edit
          </Link>
        )}
      </div>
      {details && (
        <div className="md:px-20 py-5 flex flex-col items-center justify-center">
          <h1 className="text-4xl my-10">{details.title}</h1>
          <img src={details.image_url} className="lg:w-1/2 object-cover" />
          <p className="my-10 float-left w-full lg:w-1/2 px-5 md:px-0">{details.description}</p>
        </div>
      )}
    </Layout>
  );
};

export default PostTemplate;
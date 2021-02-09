import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { getUploadDetails } from "../redux/Actions/uploadActions";
import UploaderProfileBar from "../components/uploaderProfileBar";
import SavePostButton from "../components/savePostButton";
import * as Showdown from "showdown";
import dompurify from "dompurify";
import { FaTrash } from "react-icons/fa";
import PaddingWrapper from "../components/paddingWrapper";

const PostTemplate = ({ location }) => {
  const dispatch = useDispatch();
  const path = location.pathname;
  const uploadIdFromPath = path.substring(6, path.length);

  //converting markdown from description of upload to html
  const sanitizer = dompurify.sanitize;
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const [isUserLoginPost, setIsUserLoginPost] = useState(false);
  const [mdToHtml, setMdToHtml] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const uploadDetails = useSelector((state) => state.uploadDetails);
  const { details, loading, error } = uploadDetails;

  // console.log(state);
  // console.log(userInfo);
  //check if this is users post
  useEffect(() => {
    if (userInfo && details && userInfo.returnedUserId === details.uploaded_by) {
      setIsUserLoginPost(true);
    } else {
      setIsUserLoginPost(false);
    }
  }, [userLogin, details]);

  useEffect(() => {
    dispatch(getUploadDetails(uploadIdFromPath));
  }, [dispatch]);

  //   console.log(userInfo);
  // console.log(details.description);
  useEffect(() => {
    if (details) {
      var html = details && converter.makeHtml(details.description);
      setMdToHtml(html);
    }
  }, [details]);

  const convertDate = (date) => {
    // return new Date(date).toString().slice(4, 15).replaceAt(6, ", ");
    return new Date(date).toLocaleString().slice(0, 8);
  };
  details && console.log(details.description);
  return (
    <Layout>
      {details && (
        <>
          <PaddingWrapper className="px-5 lg:px-72 pt-10 padding-wrapper">
            {!isUserLoginPost ? (
              <span className="flex gap-3 justify-end">
                <AiOutlineHeart size={24} />
                <SavePostButton upload_id={details.upload_id} />
              </span>
            ) : (
              <div className="flex items-center gap-3 justify-end">
                <Link
                  to={`/edit-post/${details.upload_id}`}
                  className="px-5 py-0.5 bg-gray-600 rounded-md text-white "
                >
                  Edit
                </Link>
                <FaTrash className="cursor-pointer" />
              </div>
            )}
          </PaddingWrapper>
          {details && (
            <PaddingWrapper>
              <h2 className="text-5xl font-bold my-5">{details.title}</h2>
              <div className="flex items-center gap-5">
                <UploaderProfileBar uploaded_by={details.uploaded_by} className="w-full " />
                <p className="my-4 pb-3 text-gray-400">{convertDate(details.created_at)}</p>
              </div>
              <img src={details.image_url} className="relative object-cover max-h-screen w-full" />

              <div className=" md:px-0">
                <p className="mb-5">{details.caption}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizer(mdToHtml) }}
                  className="post-description text-xl"
                ></div>
              </div>
            </PaddingWrapper>
          )}
        </>
      )}
    </Layout>
  );
};

export default PostTemplate;

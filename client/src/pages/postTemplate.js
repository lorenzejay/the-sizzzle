import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUploadDetails } from "../redux/Actions/uploadActions";
import UploaderProfileBar from "../components/uploaderProfileBar";
import SavePostButton from "../components/savePostButton";
import * as Showdown from "showdown";
import dompurify from "dompurify";
import PaddingWrapper from "../components/paddingWrapper";
import Loader from "../components/loader";
import ErrorMessage from "../components/errorMessage";
import LikePostButton from "../components/likePostButton";
import NoUserInfoModalPopup from "../components/noUserInfoModal";

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

  //trigger when there is no userinfo but they are tryinhg to like or save post
  const [showModal, setShowModal] = useState(false);

  const [isUserLoginPost, setIsUserLoginPost] = useState(false);
  const [mdToHtml, setMdToHtml] = useState();

  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  const uploadDetails = useSelector((state) => state.uploadDetails);
  const { details, loading, error } = uploadDetails;

  // console.log(state);
  // console.log(userInfo);
  //check if this is users post
  useEffect(() => {
    if (loggedInUserDetails && details && loggedInUserDetails.user_id === details.uploaded_by) {
      setIsUserLoginPost(true);
    } else {
      setIsUserLoginPost(false);
    }
  }, [loggedInUserDetails, details]);

  useEffect(() => {
    dispatch(getUploadDetails(uploadIdFromPath));
  }, [dispatch, uploadIdFromPath]);

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
  details && console.log(showModal);
  return (
    <Layout>
      {showModal && <NoUserInfoModalPopup showModal={showModal} setShowModal={setShowModal} />}
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {details && (
        <>
          <PaddingWrapper className="padding-wrapper px-5 lg:px-72 padding-wrapper pb-0 pt-20">
            {!isUserLoginPost ? (
              <span className="flex gap-3 justify-end mt-5 xl:pt-20">
                <LikePostButton upload_id={details.upload_id} setShowModal={setShowModal} />
                <SavePostButton
                  upload_id={details.upload_id}
                  upload_post={uploadIdFromPath}
                  setShowModal={setShowModal}
                />
              </span>
            ) : (
              <div className="flex items-center gap-3 justify-end mt-5">
                <Link
                  to={`/edit-post/${details.upload_id}`}
                  className="px-5 py-0.5 bg-gray-600 rounded-md text-white "
                >
                  Edit
                </Link>
                {/* <DeleteUpload upload_id={details.upload_id} /> */}
              </div>
            )}
          </PaddingWrapper>
          {details && !showModal && (
            <PaddingWrapper>
              <h2 className="text-5xl font-bold my-5">{details.title}</h2>
              <div className="flex items-center gap-5">
                <UploaderProfileBar uploaded_by={details.uploaded_by} className="w-full " />
                <p className="my-4 pb-3 text-gray-400">{convertDate(details.created_at)}</p>
              </div>
              <img
                src={details.image_url}
                className="relative object-cover max-h-screen w-full"
                alt="Visual of the recipe posted."
              />

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

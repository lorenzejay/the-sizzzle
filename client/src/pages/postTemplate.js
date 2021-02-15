import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUploadDetails } from "../redux/Actions/uploadActions";
import SavePostButton from "../components/savePostButton";
import PaddingWrapper from "../components/paddingWrapper";
import Loader from "../components/loader";
import ErrorMessage from "../components/errorMessage";
import LikePostButton from "../components/likePostButton";
import NoUserInfoModalPopup from "../components/noUserInfoModal";
import UploadLayout from "../components/uploadLayout";

const PostTemplate = ({ location }) => {
  const dispatch = useDispatch();
  const path = location.pathname;
  const uploadIdFromPath = path.substring(6, path.length);

  //trigger when there is no userinfo but they are tryinhg to like or save post
  const [showModal, setShowModal] = useState(false);

  const [isUserLoginPost, setIsUserLoginPost] = useState(false);

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

  // details && console.log(details);
  return (
    <Layout>
      {showModal && <NoUserInfoModalPopup showModal={showModal} setShowModal={setShowModal} />}
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {details && (
        <>
          <PaddingWrapper className="padding-wrapper px-5 lg:px-72 padding-wrapper pb-0 pt-5">
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
              <div className="flex items-center gap-3 justify-end mt-1">
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
          {details && !showModal && <UploadLayout details={details} />}
        </>
      )}
    </Layout>
  );
};

export default PostTemplate;

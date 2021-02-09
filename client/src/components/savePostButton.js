import React, { useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { checkIfSavedAlready, saveUpload } from "../redux/Actions/saveUploadsActions";
import Loader from "../components/loader";
import ErrorMessage from "../components/errorMessage";
const SavePostButton = ({ upload_id }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const saveUploads = useSelector((state) => state.saveUploads);
  const { loading, isSaved, error } = saveUploads;
  const checkIfSaved = useSelector((state) => state.checkIfSaved);
  const { wasSaved, error: checkError } = checkIfSaved;

  useEffect(() => {
    if (userInfo) {
      dispatch(checkIfSavedAlready(upload_id));
    }
  }, [dispatch, isSaved]);

  const handleSave = () => {
    dispatch(saveUpload(upload_id));
  };

  return (
    <>
      {loading && <Loader />}
      {checkError && <ErrorMessage>{checkError}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!wasSaved ? (
        <BsBookmark
          size={24}
          onClick={handleSave}
          className="cursor-pointer"
          aria-disabled={!userInfo && "true"}
        />
      ) : (
        <BsBookmarkFill
          size={24}
          onClick={handleSave}
          className="cursor-pointer"
          aria-disabled={!userInfo && "true"}
        />
      )}
    </>
  );
};

export default SavePostButton;

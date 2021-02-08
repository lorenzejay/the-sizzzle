import React, { useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { checkIfSavedAlready, saveUpload } from "../redux/Actions/saveUploadsActions";
import Loader from "../components/loader";
import ErrorMessage from "../components/errorMessage";
const SavePostButton = ({ upload_id }) => {
  const dispatch = useDispatch();
  const saveUploads = useSelector((state) => state.saveUploads);
  const { loading, isSaved, error } = saveUploads;
  const checkIfSaved = useSelector((state) => state.checkIfSaved);
  const { wasSaved, error: checkError } = checkIfSaved;

  useEffect(() => {
    dispatch(checkIfSavedAlready(upload_id));
  }, [dispatch, isSaved]);

  const handleSave = () => {
    dispatch(saveUpload(upload_id));
  };

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {}
      {!isSaved && !wasSaved ? (
        <BsBookmark size={24} onClick={handleSave} className="cursor-pointer" />
      ) : (
        <BsBookmarkFill size={24} onClick={handleSave} className="cursor-pointer" />
      )}
    </>
  );
};

export default SavePostButton;

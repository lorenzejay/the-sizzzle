import React, { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { checkIfSavedAlready, saveUpload } from "../redux/Actions/saveUploadsActions";
import Loader from "../components/loader";
import ErrorMessage from "../components/errorMessage";
const SavePostButton = ({ upload_id, upload_post }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const saveUploads = useSelector((state) => state.saveUploads);
  const { loading, isSaved, error } = saveUploads;
  const checkIfSaved = useSelector((state) => state.checkIfSaved);
  const { wasSaved, error: checkError } = checkIfSaved;

  const [savedNumber, setSavedNumber] = useState(0);

  //get the amount of saves
  const fetchSavedUploadsNumber = async () => {
    const data = await fetch(
      `http://localhost:5000/api/save-uploads/count-amount-saved/${upload_post}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return data.json();
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(checkIfSavedAlready(upload_id));
      const amountOfUsersThatSaved = fetchSavedUploadsNumber();
      amountOfUsersThatSaved.then((res) => {
        console.log(res);
        setSavedNumber(res);
      });
    }
  }, [dispatch, isSaved, upload_id, userInfo]);

  const handleSave = () => {
    dispatch(saveUpload(upload_id));
  };

  return (
    <>
      {loading && <Loader />}
      {checkError && <ErrorMessage>{checkError}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!wasSaved ? (
        <>
          <BsBookmark
            size={24}
            onClick={handleSave}
            className="cursor-pointer"
            aria-disabled={!userInfo && "true"}
          />
          <p>{savedNumber}</p>
        </>
      ) : (
        <>
          <BsBookmarkFill
            size={24}
            onClick={handleSave}
            className="cursor-pointer"
            aria-disabled={!userInfo && "true"}
          />
          <p>{savedNumber}</p>
        </>
      )}
    </>
  );
};

export default SavePostButton;

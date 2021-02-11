import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProfilePicture } from "../redux/Actions/userActions";

const RemoveProfilePictureButton = ({ setShowModal }) => {
  const dispatch = useDispatch();
  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  const handleRemovePhoto = () => {
    if (loggedInUserDetails) {
      const response = window.confirm("Are you sure?");
      if (response) {
        dispatch(removeProfilePicture());
        return setShowModal(false);
      } else return;
    }
  };

  return (
    <button onClick={handleRemovePhoto} className="w-full text-red-500 outline-none border-none">
      Remove Current Photo
    </button>
  );
};

export default RemoveProfilePictureButton;

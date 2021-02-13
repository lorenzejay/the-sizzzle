import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteUpload } from "../redux/Actions/uploadActions";

const DeleteUpload = ({ upload_id, className }) => {
  const dispatch = useDispatch();

  const handleDeletePost = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your amazing post?");
    if (confirmDelete) {
      dispatch(deleteUpload(upload_id));
    } else return;
  };
  return (
    <button
      className={`cursor-pointer px-7 py-1.5 rounded-md bg-red-600 outline-none ${className}`}
      onClick={handleDeletePost}
    >
      <FaTrash size={16} className="text-white" />
    </button>
  );
};

export default DeleteUpload;

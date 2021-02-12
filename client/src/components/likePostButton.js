import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { checkIfLikedAlready, likePost } from "../redux/Actions/likeUploadAction";

const LikePostButton = ({ upload_id }) => {
  const dispatch = useDispatch();
  const [postLikesCount, setPostLikesCount] = useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const likeUpload = useSelector((state) => state.likeUpload);
  const { loading, isLiked, error } = likeUpload;
  const checkIfLiked = useSelector((state) => state.checkIfLiked);
  const { wasLiked, error: checkError } = checkIfLiked;

  //fetch number of likes this post has

  const fetchSavedUploadsNumber = async (id) => {
    const data = await fetch(`http://localhost:5000/api/like-uploads/count-amount-saved/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return data.json();
  };

  //check how loggedInUser liked it already for the start
  useEffect(() => {
    if (userInfo) {
      dispatch(checkIfLikedAlready(upload_id));
      const amountLiked = fetchSavedUploadsNumber(upload_id);
      amountLiked.then((res) => {
        setPostLikesCount(res);
      });
    }
  }, [dispatch, isLiked, upload_id, userInfo]);
  console.log(postLikesCount);
  const handleLikingTheUpload = () => {
    dispatch(likePost(upload_id));
  };
  return (
    <div className="flex gap-5">
      {!wasLiked ? (
        <AiOutlineHeart size={24} onClick={handleLikingTheUpload} className="cursor-pointer" />
      ) : (
        <AiFillHeart size={24} onClick={handleLikingTheUpload} className="cursor-pointer" />
      )}
      {postLikesCount}
    </div>
  );
};

export default LikePostButton;
import {
  LIKE_UPLOAD_REQUEST,
  LIKE_UPLOAD_SUCCESS,
  LIKE_UPLOAD_FAIL,
  CHECK_IF_LIKED_REQUEST,
  CHECK_IF_LIKED_SUCCESS,
  CHECK_IF_LIKED_FAIL,
} from "../Types/likedUploads";

export const likePost = (upload_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIKE_UPLOAD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch("/api/like-uploads/", {
      method: "POST",
      headers: { token: `${userInfo.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ upload_id }),
    });
    const parsedData = await data.json();
    dispatch({ type: LIKE_UPLOAD_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: LIKE_UPLOAD_FAIL, payload: error.message });
  }
};

export const checkIfLikedAlready = (upload_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHECK_IF_LIKED_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch(`/api/like-uploads/check/${upload_id}`, {
      method: "GET",
      headers: { token: `${userInfo.token}`, "Content-Type": "application/json" },
    });
    const parsedData = await data.json();
    dispatch({ type: CHECK_IF_LIKED_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: CHECK_IF_LIKED_FAIL, payload: error.message });
  }
};

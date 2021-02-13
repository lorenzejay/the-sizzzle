import {
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAIL,
  GET_ALL_USER_UPLOADS_REQUEST,
  GET_ALL_USER_UPLOADS_SUCCESS,
  GET_ALL_USER_UPLOADS_FAIL,
  GET_LOGGED_IN_USER_FOLLOWING_POSTS_REQUEST,
  GET_LOGGED_IN_USER_FOLLOWING_POSTS_SUCCESS,
  GET_LOGGED_IN_USER_FOLLOWING_POSTS_FAIL,
  GET_UPLOAD_DETAILS_REQUEST,
  GET_UPLOAD_DETAILS_SUCCESS,
  GET_UPLOAD_DETAILS_FAIL,
  UPDATE_UPLOAD_REQUEST,
  UPDATE_UPLOAD_SUCCESS,
  UPDATE_UPLOAD_FAIL,
  DELETE_UPLOAD_SUCCESS,
  DELETE_UPLOAD_REQUEST,
  DELETE_UPLOAD_FAIL,
} from "../Types/uploadTypes";

export const uploadUsersPost = (title, caption, description, base64EncodedImage) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: UPLOAD_POST_REQUEST });
    const data = await fetch("/api/upload", {
      method: "POST",
      headers: { token: `${userInfo.token}`, "Content-type": "application/json" },
      body: JSON.stringify({ data: base64EncodedImage, title, caption, description }),
    });
    const parsedData = await data.json();
    dispatch({ type: UPLOAD_POST_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: UPLOAD_POST_FAIL, payload: error.message });
  }
};

export const getAllUserPosts = (user_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_UPLOADS_REQUEST });
    const data = await fetch(`/api/upload/get-user-post/${user_id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const parsedData = await data.json();
    dispatch({ type: GET_ALL_USER_UPLOADS_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_ALL_USER_UPLOADS_FAIL, payload: error.message });
  }
};

export const getAllCurrentUserFollowingsPost = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_LOGGED_IN_USER_FOLLOWING_POSTS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch(`/api/upload/user-following-post`, {
      method: "GET",
      headers: { token: userInfo.token, "Content-type": "application/json" },
    });
    const parsedData = await data.json();

    dispatch({ type: GET_LOGGED_IN_USER_FOLLOWING_POSTS_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_LOGGED_IN_USER_FOLLOWING_POSTS_FAIL, payload: error.message });
  }
};

export const getUploadDetails = (upload_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_UPLOAD_DETAILS_REQUEST });
    const data = await fetch(`/api/upload/details/${upload_id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const parsedData = await data.json();
    dispatch({ type: GET_UPLOAD_DETAILS_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_UPLOAD_DETAILS_FAIL, payload: error.message });
  }
};

export const updateUpload = (title, caption, description, upload_id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_UPLOAD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const data = await fetch(`/api/upload/update/${upload_id}`, {
      method: "PUT",
      headers: { token: userInfo.token, "Content-type": "application/json" },
      body: JSON.stringify({ title, caption, description }),
    });

    const parsedData = await data.json();
    if (parsedData.success === true) {
      return dispatch({ type: UPDATE_UPLOAD_SUCCESS, payload: parsedData });
    } else if (parsedData.success === false) {
      dispatch({ type: UPDATE_UPLOAD_FAIL, payload: parsedData });
    }
  } catch (error) {
    console.log(error.message);
    dispatch({ type: UPDATE_UPLOAD_FAIL, payload: error.message });
  }
};

export const deleteUpload = (upload_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_UPLOAD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const data = await fetch(`/api/upload/delete-post/${upload_id}`, {
      method: "DELETE",
      headers: { token: userInfo.token, "Content-type": "application/json" },
    });

    const parsedData = await data.json();
    dispatch({ type: DELETE_UPLOAD_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_UPLOAD_FAIL, payload: error });
  }
};

import {
  CHECK_IF_SAVED_FAIL,
  CHECK_IF_SAVED_REQUEST,
  CHECK_IF_SAVED_SUCCESS,
  GET_USER_SAVED_UPLOADS_FAIL,
  GET_USER_SAVED_UPLOADS_REQUEST,
  GET_USER_SAVED_UPLOADS_SUCCESS,
  SAVE_UPLOAD_FAIL,
  SAVE_UPLOAD_REQUEST,
  SAVE_UPLOAD_SUCCESS,
} from "../Types/savedUploadTypes";

export const saveUpload = (upload_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_UPLOAD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch("/api/save-uploads/", {
      method: "POST",
      headers: { token: `${userInfo.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ upload_id }),
    });
    const parsedData = await data.json();
    dispatch({ type: SAVE_UPLOAD_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SAVE_UPLOAD_FAIL, payload: error.message });
  }
};

export const checkIfSavedAlready = (upload_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHECK_IF_SAVED_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch(`/api/save-uploads/check/${upload_id}`, {
      method: "GET",
      headers: { token: `${userInfo.token}`, "Content-Type": "application/json" },
    });
    const parsedData = await data.json();
    dispatch({ type: CHECK_IF_SAVED_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: CHECK_IF_SAVED_FAIL, payload: error.message });
  }
};
export const getSavedUploads = (upload_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_SAVED_UPLOADS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch(`/api/save-uploads/retrieve-saved-posts`, {
      method: "GET",
      headers: { token: `${userInfo.token}`, "Content-Type": "application/json" },
    });
    const parsedData = await data.json();
    dispatch({ type: GET_USER_SAVED_UPLOADS_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: GET_USER_SAVED_UPLOADS_FAIL, payload: error.message });
  }
};

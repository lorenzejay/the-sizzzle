import {
  CHECK_IF_SAVED_FAIL,
  CHECK_IF_SAVED_REQUEST,
  CHECK_IF_SAVED_SUCCESS,
  GET_USER_SAVED_UPLOADS_FAIL,
  GET_USER_SAVED_UPLOADS_REQUEST,
  GET_USER_SAVED_UPLOADS_RESET,
  GET_USER_SAVED_UPLOADS_SUCCESS,
  SAVE_UPLOAD_FAIL,
  SAVE_UPLOAD_REQUEST,
  SAVE_UPLOAD_SUCCESS,
} from "../Types/savedUploadTypes";

export const saveUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_UPLOAD_REQUEST:
      return { loading: true };
    case SAVE_UPLOAD_SUCCESS:
      return { loading: false, isSaved: action.payload };
    case SAVE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const checkIfSavedRedcuer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_IF_SAVED_REQUEST:
      return { loading: true };
    case CHECK_IF_SAVED_SUCCESS:
      return { loading: false, wasSaved: action.payload };
    case CHECK_IF_SAVED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserSavedUploadsReducer = (state = { savedPosts: [] }, action) => {
  switch (action.type) {
    case GET_USER_SAVED_UPLOADS_REQUEST:
      return { loading: true };
    case GET_USER_SAVED_UPLOADS_SUCCESS:
      return { loading: false, savedPosts: action.payload };
    case GET_USER_SAVED_UPLOADS_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_SAVED_UPLOADS_RESET:
      return {};
    default:
      return state;
  }
};

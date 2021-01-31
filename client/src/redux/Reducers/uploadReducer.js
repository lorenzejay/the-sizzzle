import {
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAIL,
  GET_ALL_USER_UPLOADS_REQUEST,
  GET_ALL_USER_UPLOADS_SUCCESS,
  GET_ALL_USER_UPLOADS_FAIL,
} from "../Types/uploadTypes";

export const uploadPostReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_POST_REQUEST:
      return { loading: true };
    case UPLOAD_POST_SUCCESS:
      return { loading: false, postResult: action.payload };
    case UPLOAD_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getAllUserUploadsReducer = (state = { allPosts: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USER_UPLOADS_REQUEST:
      return { loading: true };
    case GET_ALL_USER_UPLOADS_SUCCESS:
      return { loading: false, allPosts: action.payload };
    case GET_ALL_USER_UPLOADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

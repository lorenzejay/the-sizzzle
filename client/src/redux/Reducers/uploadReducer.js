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
  GET_LOGGED_IN_USER_FOLLOWING_POSTS_RESET,
  GET_UPLOAD_DETAILS_REQUEST,
  GET_UPLOAD_DETAILS_SUCCESS,
  GET_UPLOAD_DETAILS_FAIL,
  UPDATE_UPLOAD_REQUEST,
  UPDATE_UPLOAD_SUCCESS,
  UPDATE_UPLOAD_FAIL,
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

export const getLoggedInUserFollowingPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_LOGGED_IN_USER_FOLLOWING_POSTS_REQUEST:
      return { loading: true };
    case GET_LOGGED_IN_USER_FOLLOWING_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_LOGGED_IN_USER_FOLLOWING_POSTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_LOGGED_IN_USER_FOLLOWING_POSTS_RESET:
      return {};
    default:
      return state;
  }
};

export const postDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_UPLOAD_DETAILS_REQUEST:
      return { loading: true };
    case GET_UPLOAD_DETAILS_SUCCESS:
      return { loading: false, details: action.payload };
    case GET_UPLOAD_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUploadReaducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_UPLOAD_REQUEST:
      return { loading: true };
    case UPDATE_UPLOAD_SUCCESS:
      return { loading: false, updateStatus: action.payload };
    case UPDATE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

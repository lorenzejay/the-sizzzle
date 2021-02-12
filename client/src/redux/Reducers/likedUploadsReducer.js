import {
  LIKE_UPLOAD_REQUEST,
  LIKE_UPLOAD_SUCCESS,
  LIKE_UPLOAD_FAIL,
  CHECK_IF_LIKED_REQUEST,
  CHECK_IF_LIKED_SUCCESS,
  CHECK_IF_LIKED_FAIL,
} from "../Types/likedUploads";

export const likeUploadsReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_UPLOAD_REQUEST:
      return { loading: true };
    case LIKE_UPLOAD_SUCCESS:
      return { loading: false, isLiked: action.payload };
    case LIKE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const checkIfUploadLikedReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_IF_LIKED_REQUEST:
      return { loading: true };
    case CHECK_IF_LIKED_SUCCESS:
      return { loading: false, wasLiked: action.payload };
    case CHECK_IF_LIKED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

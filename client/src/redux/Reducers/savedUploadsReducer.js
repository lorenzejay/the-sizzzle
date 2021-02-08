import {
  CHECK_IF_SAVED_FAIL,
  CHECK_IF_SAVED_REQUEST,
  CHECK_IF_SAVED_SUCCESS,
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

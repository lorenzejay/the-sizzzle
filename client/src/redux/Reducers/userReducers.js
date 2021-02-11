import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  ANY_USER_DETAILS_REQUEST,
  ANY_USER_DETAILS_SUCCESS,
  ANY_USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_PICTURE_REQUEST,
  USER_UPDATE_PROFILE_PICTURE_SUCCESS,
  USER_UPDATE_PROFILE_PICTURE_FAIL,
  USER_UPDATE_NAMES_REQUEST,
  USER_UPDATE_NAMES_SUCCESS,
  USER_UPDATE_NAMES_FAIL,
  LOGGED_IN_USER_DETAILS_REQUEST,
  LOGGED_IN_USER_DETAILS_SUCCESS,
  LOGGED_IN_USER_DETAILS_FAIL,
  LOGGED_IN_USER_DETAILS_RESET,
  USER_GET_PROFILE_PIC_REQUEST,
  USER_GET_PROFILE_PIC_SUCCESS,
  USER_GET_PROFILE_PIC_FAIL,
  USER_GET_PROFILE_PIC_RESET,
} from "../Types/userTypes";

export const userLogInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_USER_DETAILS_REQUEST:
      return { loading: true };
    case LOGGED_IN_USER_DETAILS_SUCCESS:
      return { loading: false, loggedInUserDetails: action.payload };
    case LOGGED_IN_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case LOGGED_IN_USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const anyUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ANY_USER_DETAILS_REQUEST:
      return { loading: true };
    case ANY_USER_DETAILS_SUCCESS:
      return { loading: false, anyUserProfile: action.payload };
    case ANY_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateProfilePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_PICTURE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_PICTURE_SUCCESS:
      return { loading: false, profilePic: action.payload };
    case USER_UPDATE_PROFILE_PICTURE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateNamesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_NAMES_REQUEST:
      return { loading: true };
    case USER_UPDATE_NAMES_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_UPDATE_NAMES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfilePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_PROFILE_PIC_REQUEST:
      return { loading: true };
    case USER_GET_PROFILE_PIC_SUCCESS:
      return { loading: false, profilePic: action.payload };
    case USER_GET_PROFILE_PIC_FAIL:
      return { loading: false, error: action.payload };
    case USER_GET_PROFILE_PIC_RESET:
      return {};
    default:
      return state;
  }
};

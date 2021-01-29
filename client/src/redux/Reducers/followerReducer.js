import {
  CHECK_IF_FOLLOWING_FAIL,
  CHECK_IF_FOLLOWING_REQUEST,
  CHECK_IF_FOLLOWING_SUCCESS,
  FOLLOWERS_GET_FAIL,
  FOLLOWERS_GET_REQUEST,
  FOLLOWERS_GET_SUCCESS,
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
} from "../Types/followerTypes";

export const followersReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOWERS_GET_REQUEST:
      return { loading: true };
    case FOLLOWERS_GET_SUCCESS:
      return { loading: false, followers: action.payload };
    case FOLLOWERS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const followUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_USER_REQUEST:
      return { loading: true };
    case FOLLOW_USER_SUCCESS:
      return { loading: false, follow: action.payload };
    case FOLLOW_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const followCheckerReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_IF_FOLLOWING_REQUEST:
      return { loading: true };
    case CHECK_IF_FOLLOWING_SUCCESS:
      return { loading: false, isFollowing: action.payload };
    case CHECK_IF_FOLLOWING_FAIL:
      return { loading: false, error: action.message };
    default:
      return state;
  }
};

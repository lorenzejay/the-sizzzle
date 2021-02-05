import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  anyUserDetailsReducer,
  updateNamesReducer,
  updateProfilePictureReducer,
  userDetailsReducer,
  userLogInReducer,
  userRegisterReducer,
} from "./Reducers/userReducers";
import {
  followCheckerReducer,
  followersReducer,
  followUserReducer,
} from "./Reducers/followerReducer";
import {
  getAllUserUploadsReducer,
  getLoggedInUserFollowingPostsReducer,
  postDetailsReducer,
  uploadPostReducer,
} from "./Reducers/uploadReducer";

const reducers = combineReducers({
  userLogin: userLogInReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  anyUserDetails: anyUserDetailsReducer,
  userUpdateProfilePicture: updateProfilePictureReducer,
  userUpdateNames: updateNamesReducer,

  getFollows: followersReducer,
  follow: followUserReducer,
  checkIfFollowing: followCheckerReducer,

  uploadPost: uploadPostReducer,
  allUserPosts: getAllUserUploadsReducer,
  userFollowingsPosts: getLoggedInUserFollowingPostsReducer,
  uploadDetails: postDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

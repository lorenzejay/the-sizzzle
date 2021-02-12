import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  anyUserDetailsReducer,
  loggedInUserReducer,
  updateNamesReducer,
  updateProfilePictureReducer,
  userLogInReducer,
  userProfilePictureReducer,
  userRegisterReducer,
  userRemoveProfilePicReducer,
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
  updateUploadReaducer,
  uploadPostReducer,
} from "./Reducers/uploadReducer";
import { checkIfSavedRedcuer, saveUploadReducer } from "./Reducers/savedUploadsReducer";
import { likeUploadsReducer, checkIfUploadLikedReducer } from "./Reducers/likedUploadsReducer";

const reducers = combineReducers({
  userLogin: userLogInReducer,
  userLoggedInDetails: loggedInUserReducer,
  userRegister: userRegisterReducer,
  anyUserDetails: anyUserDetailsReducer,
  userUpdateProfilePicture: updateProfilePictureReducer,
  userUpdateNames: updateNamesReducer,
  userProfilePicture: userProfilePictureReducer,
  userRemoveProfilePicture: userRemoveProfilePicReducer,

  getFollows: followersReducer,
  follow: followUserReducer,
  checkIfFollowing: followCheckerReducer,

  uploadPost: uploadPostReducer,
  allUserPosts: getAllUserUploadsReducer,
  userFollowingsPosts: getLoggedInUserFollowingPostsReducer,
  uploadDetails: postDetailsReducer,
  updateUpload: updateUploadReaducer,

  saveUploads: saveUploadReducer,
  checkIfSaved: checkIfSavedRedcuer,

  likeUpload: likeUploadsReducer,
  checkIfLiked: checkIfUploadLikedReducer,
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

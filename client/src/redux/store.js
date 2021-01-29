import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  anyUserDetailsReducer,
  userDetailsReducer,
  userLogInReducer,
  userRegisterReducer,
} from "./Reducers/userReducers";
import {
  followCheckerReducer,
  followersReducer,
  followUserReducer,
} from "./Reducers/followerReducer";

const reducers = combineReducers({
  userLogin: userLogInReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  anyUserDetails: anyUserDetailsReducer,

  getFollows: followersReducer,
  follow: followUserReducer,
  checkIfFollowing: followCheckerReducer,
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

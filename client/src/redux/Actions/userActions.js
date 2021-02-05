import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ANY_USER_DETAILS_REQUEST,
  ANY_USER_DETAILS_SUCCESS,
  ANY_USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_PICTURE_REQUEST,
  USER_UPDATE_PROFILE_PICTURE_SUCCESS,
  USER_UPDATE_PROFILE_PICTURE_FAIL,
  USER_UPDATE_NAMES_REQUEST,
  USER_UPDATE_NAMES_SUCCESS,
  USER_UPDATE_NAMES_FAIL,
} from "../Types/userTypes";
// import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const data = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const parsedData = await data.json();
    if (parsedData.success) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: parsedData });
      localStorage.setItem("userInfo", JSON.stringify(parsedData));
    } else if (parsedData.success === false) {
      dispatch({ type: USER_LOGIN_FAIL, payload: parsedData.message });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT_SUCCESS });
};

export const register = (email, username, first_name, last_name, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const data = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        first_name,
        last_name,
        password,
      }),
    });

    const parsedData = await data.json();

    if (parsedData.success) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: parsedData });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: parsedData });
      localStorage.setItem("userInfo", JSON.stringify(parsedData));
    } else if (parsedData.success === false) {
      dispatch({ type: USER_REGISTER_FAIL, payload: parsedData.message });
    }
  } catch (error) {
    console.log(error.message);
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch("http://localhost:5000/api/dashboard/", {
      method: "GET",
      headers: { token: `${userInfo.token}`, "Content-Type": "application/json" },
    });
    const parsedData = await data.json();
    dispatch({ type: USER_DETAILS_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: USER_DETAILS_FAIL, error: error.message });
  }
};

export const getAnyUserDetails = (username) => async (dispatch) => {
  try {
    dispatch({ type: ANY_USER_DETAILS_REQUEST });

    const data = await fetch(`http://localhost:5000/api/users/${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const parsedData = await data.json();
    dispatch({ type: ANY_USER_DETAILS_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ANY_USER_DETAILS_FAIL, error: error.message });
  }
};

export const udpateUserProfilePic = (base64EncodedImage) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: USER_UPDATE_PROFILE_PICTURE_REQUEST });
    const data = await fetch("http://localhost:5000/api/users/profile-pic-upload", {
      method: "PUT",
      headers: { token: `${userInfo.token}`, "Content-type": "application/json" },
      body: JSON.stringify({ data: base64EncodedImage }),
    });
    const parsedData = await data.json();
    dispatch({ type: USER_UPDATE_PROFILE_PICTURE_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: USER_UPDATE_PROFILE_PICTURE_FAIL, payload: error.message });
  }
};

export const updateNames = (first_name, last_name, username) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: USER_UPDATE_NAMES_REQUEST });
    const data = await fetch("http://localhost:5000/api/dashboard/update-names", {
      method: "PUT",
      headers: { token: `${userInfo.token}`, "Content-type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
        username,
      }),
    });
    const parsedData = await data.json();
    dispatch({ type: USER_UPDATE_NAMES_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: USER_UPDATE_NAMES_FAIL, payload: error.message });
  }
};

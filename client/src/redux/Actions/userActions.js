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
} from "../Types/userTypes";
// import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const { data } = await axios.post("/users/login", JSON.stringify({ email, password }), config);
    const data = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const parsedData = await data.json();
    dispatch({ type: USER_LOGIN_SUCCESS, payload: parsedData });

    localStorage.setItem("userInfo", JSON.stringify(parsedData));
  } catch (error) {
    console.log(error.message);
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT_SUCCESS });
};

export const register = (email, username, first_name, last_name, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const data = await fetch("http://localhost:5000/users/register", {
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

    // dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: parsedData });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: parsedData });
    localStorage.setItem("userInfo", JSON.stringify(parsedData));
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

    const data = await fetch("http://localhost:5000/dashboard/", {
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

    const data = await fetch(`http://localhost:5000/users/${username}`, {
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

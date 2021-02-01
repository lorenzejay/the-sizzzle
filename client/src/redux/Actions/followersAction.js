import {
  CHECK_IF_FOLLOWING_REQUEST,
  CHECK_IF_FOLLOWING_SUCCESS,
  FOLLOWERS_GET_FAIL,
  FOLLOWERS_GET_REQUEST,
  FOLLOWERS_GET_SUCCESS,
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
} from "../Types/followerTypes";

export const getFollowers = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOWERS_GET_REQUEST });
    const data = await fetch(`http://localhost:5000/api/followers/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const parsedData = await data.json();
    dispatch({ type: FOLLOWERS_GET_SUCCESS, payload: parsedData });
  } catch (error) {
    dispatch({ type: FOLLOWERS_GET_FAIL, payload: error.message });
    console.log(error.message);
  }
};

export const followThisUser = (userTo) => async (dispatch, getState) => {
  try {
    dispatch({ type: FOLLOW_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch(`http://localhost:5000/api/followers/follow/${userTo}`, {
      method: "POST",
      headers: {
        token: userInfo.token,
        logged_in_user_id: `${userInfo.returnedUserId}`,
        "Content-Type": "application/json",
      },
    });
    const parsedData = await data.json();
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: FOLLOW_USER_FAIL, payload: error.message });
  }
};

export const checkIfUserIsFollowingAlready = (user_to) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHECK_IF_FOLLOWING_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = await fetch("http://localhost:5000/api/followers/check-if-following", {
      method: "POST",
      headers: {
        token: `${userInfo.token}`,
        logged_in_user_id: userInfo.returnedUserId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_to,
      }),
    });
    const parsedData = await data.json();

    dispatch({ type: CHECK_IF_FOLLOWING_SUCCESS, payload: parsedData });
  } catch (error) {
    console.log(error.message);
  }
};

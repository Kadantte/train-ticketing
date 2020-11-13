import { Dispatch } from "redux";
import { getUserData, sendLogOutSignal } from "../api";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants";

/**
 * Action to update the user instance in the store 
 */
export const checkUserAuthStatus = () => async (dispatch: Dispatch) => {
  let res = await getUserData();
  if (res.data.error === false) {
    // user is logged in
    console.log("User is authenticated")
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user })
  } else {
    console.log("User not authenticated")
  }
}



/**
 * Action to logout the user
 */
export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    let res = await sendLogOutSignal();
    console.log(res.data)
    if (res.data.error === false) {
      // user is successfully logged out
      dispatch({ type: LOGOUT_SUCCESS })
    } else {
      throw Error(res.data.message)
    }
  } catch (err) {
    console.log(err);
  }
}
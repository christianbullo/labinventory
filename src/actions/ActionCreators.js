import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import * as ActionTypes from "./ActionsTypes";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );

};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: ActionTypes.USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// REQUESTS

// Get requests 
export const fetchRequests = () => dispatch => {
  dispatch(requestsLoading()); 

  axios
    .get("/api/stock/requests")
    .then(response => {
      return response.data;
    })
    .then(requests => dispatch(getRequests(requests)))
    .catch(error => dispatch(requestsFailed(error.message)));
};

export const requestsLoading = () => ({
  type: ActionTypes.REQUESTS_LOADING
});

export const getRequests = requests => ({
  type: ActionTypes.GET_REQUESTS,
  payload: requests
}); 

export const requestsFailed = errMess => ({
  type: ActionTypes.REQUESTS_FAILED,
  payload: errMess
});

// Add request 
export const addRequest = (requestData, history) => dispatch => {
  axios
    .post("/api/stock/addrequest", requestData)
    .then(res => history.push("/requests"))
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};
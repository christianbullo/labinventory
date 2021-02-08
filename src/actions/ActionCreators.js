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

// Get last ID
export const fetchLastRequest = () => dispatch => {
  axios
    .get("/api/stock/lastrequest")
    .then(response => {
      return response.data;
    })
    .then(lastRequest => dispatch(getLastRequest(lastRequest)))
    .catch(error => dispatch(requestsFailed(error.message)));
}

export const getLastRequest = lastRequest => ({
  type: ActionTypes.GET_LAST_REQUEST,
  payload: lastRequest
}); 

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
export const addRequest = (requestData) => dispatch => {
  axios
    .post("/api/stock/addrequest", requestData)
    .then(response => {
      return response.data;
    })
    .then(request => {
      alert('request is === ' + request);
      dispatch(addNewRequest(request));
    })
    //.then(res => history.push("/requests"))
    //.then(res => alert('res is ' + res))
    .catch(err =>
      {
        alert('errore in add request!!!!! err = ' + err);
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payload: err.response.data
        })  
      }
    );
};

export const addNewRequest = request => ({
  type: ActionTypes.ADD_REQUEST,
  payload: request
});
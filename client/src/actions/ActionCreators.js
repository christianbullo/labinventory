import axios from "axios";
//import url from "url";
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
export const fetchRequests = (pageDataReq) => dispatch => {
  dispatch(requestsLoading()); 

  axios
    .get(`/api/stock/requests/requests?page=${pageDataReq}`)
    .then(response => {
      return response.data;
    })
    .then(data => {
      dispatch(getRequestPages(data.pages));
      dispatch(getRequests(data.requests));
    })
    .catch(error => dispatch(requestsFailed(error.message)));
};

export const requestsLoading = () => ({
  type: ActionTypes.REQUESTS_LOADING
});

export const getRequests = requests => ({
  type: ActionTypes.GET_REQUESTS,
  payload: requests
}); 

export const getRequestPages = pages => ({
  type: ActionTypes.GET_REQUESTS_PAGES,
  payload: pages
}); 

export const requestsFailed = errMess => ({
  type: ActionTypes.REQUESTS_FAILED,
  payload: errMess
});

// Add request 
export const addRequest = (requestData) => dispatch => {
  axios
    .post("/api/stock/requests/addrequest", requestData)
    .then(response => {
      return response.data;
    })
    .then(request => {
      dispatch(addNewRequest(request));
    })
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


// ORDERS

// Get orders 
export const fetchOrders = (pageDataOrder) => dispatch => {
  dispatch(ordersLoading()); 

  axios
    .get(`/api/stock/orders/orders?page=${pageDataOrder}`)
    .then(response => {
      return response.data;
    })
    .then(data => {
      dispatch(getOrderPages(data.pages));
      dispatch(getOrders(data.orders));
    })
    .catch(error => dispatch(ordersFailed(error.message)));
};

export const ordersLoading = () => ({
  type: ActionTypes.ORDERS_LOADING
});

export const getOrders = orders => ({
  type: ActionTypes.GET_ORDERS,
  payload: orders
}); 

export const getOrderPages = pages => ({
  type: ActionTypes.GET_ORDERS_PAGES,
  payload: pages
});

export const ordersFailed = errMess => ({
  type: ActionTypes.ORDERS_FAILED,
  payload: errMess
});

// Add order 
export const addOrder = (orderData) => dispatch => {
  axios
    .post("/api/stock/orders/addorder", orderData)
    .then(response => {
      return response.data;
    })
    .then(order => {
      dispatch(addNewOrder(order));
    })
    .catch(err =>
      {
        alert('errore in add order!!!!! err = ' + err);
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payload: err.response.data
        })  
      }
    );
};

export const addNewOrder = order => ({
  type: ActionTypes.ADD_ORDER,
  payload: order 
});

// delete old request 
export const deleteRequest = (oldRequest_Id) => dispatch => {
  // Remove old request after updating as an order 
  dispatch(deleteOldRequest(oldRequest_Id));
};

export const deleteOldRequest = oldRequest_Id => ({
  type: ActionTypes.DELETE_REQUEST,
  payload: oldRequest_Id 
});

// Edit order 
export const editOrder = (formData) => dispatch => {
  
  axios
    .post("/api/stock/orders/editorder", formData)
    .then(response => {
      return response.data;
    })
    .then(order => {
      dispatch(editedOrder(order));
    })
    .catch(err =>
      {
        alert('errore in edit order!!!!! err = ' + err);
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payload: err.response.data
        })  
      }
    );
};

export const editedOrder = order => ({
  type: ActionTypes.EDIT_ORDER,
  payload: order 
});

// IN STOCK 

// Get in stock  
export const fetchInStock = (pageDataInstock) => dispatch => {
  dispatch(instockLoading()); 

  axios
    .get(`/api/stock/instock/instock?page=${pageDataInstock}`)
    .then(response => {
      return response.data;
    })
    .then(data => {
      dispatch(getInstockPages(data.pages));
      dispatch(getInStock(data.instock));
    })
    .catch(error => dispatch(instockFailed(error.message)));
};

export const instockLoading = () => ({
  type: ActionTypes.INSTOCK_LOADING
});

export const getInStock = instock => ({
  type: ActionTypes.GET_INSTOCK, 
  payload: instock
}); 

export const getInstockPages = pages => ({
  type: ActionTypes.GET_INSTOCK_PAGES,
  payload: pages
}); 

export const instockFailed = errMess => ({
  type: ActionTypes.INSTOCK_FAILED,
  payload: errMess
});

// Add in stock  
export const addInStock = (stockData) => dispatch => {
  axios
    .post("/api/stock/instock/addinstock", stockData)
    .then(response => {
      return response.data;
    })
    .then(instock => {
      dispatch(addNewInstock(instock));
    })
    .catch(err =>
      {
        alert('errore in add in stock!!!!! err = ' + err);
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payload: err.response.data
        })  
      }
    );
};

export const addNewInstock = instock => ({
  type: ActionTypes.ADD_INSTOCK,  
  payload: instock 
});

// delete old request 
export const deleteOrder = (oldOrder_Id) => dispatch => {
  // Remove old order after updating as in stock 
  dispatch(deleteOldOrder(oldOrder_Id));
};

export const deleteOldOrder = oldOrder_Id => ({
  type: ActionTypes.DELETE_ORDER,
  payload: oldOrder_Id  
});

// delete old in stock  
export const deleteInStock = (oldInstock_Id) => dispatch => {
  // Remove old request after updating as an order 
  dispatch(deleteOldInstock(oldInstock_Id));
};

export const deleteOldInstock = oldInstock_Id => ({
  type: ActionTypes.DELETE_INSTOCK, 
  payload: oldInstock_Id 
});

// Edit stock location 
export const editLocation = (formData) => dispatch => {
  
  axios
    .post("/api/stock/instock/editlocation", formData)
    .then(response => {
      return response.data;
    })
    .then(stock => {
      dispatch(editedLocation(stock));
    })
    .catch(err =>
      {
        alert('errore in edit LOCATION!!!!! err = ' + err);
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payload: err.response.data
        })  
      }
    );
};

export const editedLocation = stock => ({
  type: ActionTypes.EDIT_LOCATION,
  payload: stock  
});

// Edit stock details 
export const editDetails = (formData) => dispatch => {
  
  axios
    .post("/api/stock/instock/editdetails", formData)
    .then(response => {
      return response.data;
    })
    .then(stock => {
      dispatch(editedDetails(stock));
    })
    .catch(err =>
      {
        alert('errore in edit DETAILS!!!!! err = ' + err);
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payload: err.response.data
        })  
      }
    );
};

export const editedDetails = stock => ({
  type: ActionTypes.EDIT_DETAILS,
  payload: stock  
});



// OUT OF STOCK 

// Get out of stock  
export const fetchOutStock = (pageData) => dispatch => {
  dispatch(outstockLoading()); 
  
  const params = new URLSearchParams(pageData);
  //console.log("params is " + params);

  axios
    .get(`/api/stock/outstock/outstock?page=${pageData}`)
    .then(response => {
      return response.data;
    })
    .then(data => {
      dispatch(getOutstockPages(data.pages));
      dispatch(getOutStock(data.outstock));
    })
    .catch(error => dispatch(outstockFailed(error.message)));
};

export const outstockLoading = () => ({
  type: ActionTypes.OUTSTOCK_LOADING
});

export const getOutStock = outstock => ({
  type: ActionTypes.GET_OUTSTOCK, 
  payload: outstock
}); 

export const getOutstockPages = pages => ({
  type: ActionTypes.GET_OUTSTOCK_PAGES,
  payload: pages
}); 

export const outstockFailed = errMess => ({
  type: ActionTypes.OUTSTOCK_FAILED,
  payload: errMess
});

// Add out of stock  
export const addOutStock = (stockData) => dispatch => {
  axios
    .post("/api/stock/outstock/addoutstock", stockData)
    .then(response => {
      return response.data;
    })
    .then(outstock => {
      dispatch(addNewOutstock(outstock));
    })
    .catch(err =>
      {
        alert('errore in add out of stock!!!!! err = ' + err);
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payload: err.response.data
        })  
      }
    );
};

export const addNewOutstock = outstock => ({
  type: ActionTypes.ADD_OUTSTOCK,  
  payload: outstock 
});

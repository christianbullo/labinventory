import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { LastId } from "./lastIdReducer";
import { Requests } from "./requestsReducer";
import { Orders } from "./ordersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  lastId: LastId,  
  requests: Requests,
  orders: Orders
});

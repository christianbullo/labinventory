import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { Requests } from "./requestsReducer";
import { Orders } from "./ordersReducer";
import { Instock } from "./inStockReducer";
import { Outstock } from "./outStockReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  requests: Requests,
  orders: Orders,
  instock: Instock,
  outstock: Outstock
});

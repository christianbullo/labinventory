import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { LastId } from "./lastIdReducer";
import { Requests } from "./requestsReducer";
import { Orders } from "./ordersReducer";
import { Instock } from "./inStockReducer";
import { Outstock } from "./outStockReducer";
import { Files } from "./filesReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  lastId: LastId,  
  requests: Requests,
  orders: Orders,
  instock: Instock,
  outstock: Outstock,
  files: Files 
});

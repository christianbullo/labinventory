import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import {Requests} from "./requestsReducer";
import { LastId } from "./lastIdReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  requests: Requests,
  lastId: LastId 
});

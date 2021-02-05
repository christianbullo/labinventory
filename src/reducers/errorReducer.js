import * as ActionTypes from "../actions/ActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ERRORS: 
      return action.payload;
    default:
      return state;
  }
}

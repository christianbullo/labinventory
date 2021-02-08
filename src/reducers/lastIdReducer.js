import * as ActionTypes from "../actions/ActionsTypes";

export const LastId = (state = {
        lastRequest: {},
        lastOrder: {},
        lastInStock: {},
        lastOutOfStock: {}
    }, action) => {
    switch (action.type) {  
        case ActionTypes.GET_LAST_REQUEST:
            return {...state, 
                lastRequest: action.payload};
        default:
            return state; 
            break;
    }
}


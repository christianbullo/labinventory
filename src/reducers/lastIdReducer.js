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
        case ActionTypes.GET_LAST_ORDER:      
            return {...state, 
                lastOrder: action.payload};
        case ActionTypes.GET_LAST_INSTOCK:    
            return {...state, 
                lastInStock: action.payload};
        default:
            return state; 
            break;
    }
}


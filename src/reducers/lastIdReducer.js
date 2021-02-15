import * as ActionTypes from "../actions/ActionsTypes";

export const LastId = (state = {
        lastRequest: { id: 0 },
        lastOrder: { id: 0 },
        lastInStock: { id: 0 },
        lastOutOfStock: { id: 0 }
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
        case ActionTypes.GET_LAST_OUTSTOCK:    
            return {...state, 
                lastOutOfStock: action.payload};
        default:
            return state; 
            break;
    }
}


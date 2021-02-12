import * as ActionTypes from "../actions/ActionsTypes";

export const Files = (state = {
        //fileRequest: {},
        fileOrder: [],
        //fileInStock: {},
        //fileOutOfStock: {}
    }, action) => {
    switch (action.type) {  
        // case ActionTypes.GET_LAST_REQUEST:
        //     return {...state, 
        //         lastRequest: action.payload};
        case ActionTypes.GET_FILE_ORDER:      
            return {...state, 
                fileOrder: action.payload};
        // case ActionTypes.GET_LAST_INSTOCK:    
        //     return {...state, 
        //         lastInStock: action.payload};
        // case ActionTypes.GET_LAST_OUTSTOCK:    
        //     return {...state, 
        //         lastOutOfStock: action.payload};
        default:
            return state; 
            break;
    }
}


import * as ActionTypes from "../actions/ActionsTypes";

export const Requests = (state = {
        isLoading: true, 
        errMess: null,
        requests: [] 
    }, action) => {
    switch (action.type) {
        case ActionTypes.GET_REQUESTS:
            return {...state, 
                    isLoading: false, 
                    errMess: null, 
                    requests: action.payload};            
        case ActionTypes.REQUESTS_FAILED:
            return {...state, 
                isLoading: false,
                errMess: action.payload};           
        default:
            return state; 
            break;
    }
}


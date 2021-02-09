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
        case ActionTypes.ADD_REQUEST:
            const request = action.payload;
            return {...state, 
                    requests: state.requests.concat(request)}; 
            break;
        case ActionTypes.DELETE_REQUEST:
            const toDeleteId = action.payload;
            return {...state, 
                    requests: state.requests.filter(request => request._id !== toDeleteId)}; 
            break;
        default:
            return state; 
            break;
    }
}


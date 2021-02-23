import * as ActionTypes from "../actions/ActionsTypes";

export const Requests = (state = {
        isLoading: true, 
        errMess: null,
        page: 1,
        pages: 0,
        requests: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.GET_REQUESTS_PAGES: 
            const pages = action.payload;
            return {...state, 
                    page: pages.page, 
                    pages: pages.totalPages}
        case ActionTypes.GET_REQUESTS:
            const requests = action.payload;
            //alert('case ActionTypes.GET_REQUESTS: ' + JSON.stringify(requests));
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
            //alert('case ActionTypes.ADD_REQUEST : ' + JSON.stringify(request));
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


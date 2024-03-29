import * as ActionTypes from "../actions/ActionsTypes";

export const Outstock = (state = {
        isLoading: true, 
        errMess: null,
        page: 1,
        pages: 0,
        outstock: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.GET_OUTSTOCK_PAGES: 
            const pages = action.payload;
            return {...state, 
                    page: pages.page, 
                    pages: pages.totalPages}
        case ActionTypes.GET_OUTSTOCK:
            return {...state, 
                    isLoading: false, 
                    errMess: null, 
                    outstock: action.payload};            
        case ActionTypes.OUTSTOCK_FAILED: 
            return {...state, 
                isLoading: false,
                errMess: action.payload};     
        case ActionTypes.ADD_OUTSTOCK:
            const outstock = action.payload;
            return {...state, 
                    outstock: state.outstock.concat(outstock)}; 
            break;
        default:
            return state; 
            break;
    }
}


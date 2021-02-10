import * as ActionTypes from "../actions/ActionsTypes";

export const Instock = (state = {
        isLoading: true, 
        errMess: null,
        instock: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.GET_INSTOCK:
            return {...state, 
                    isLoading: false, 
                    errMess: null, 
                    instock: action.payload};            
        case ActionTypes.INSTOCK_FAILED: 
            return {...state, 
                isLoading: false,
                errMess: action.payload};     
        case ActionTypes.ADD_INSTOCK:
                const instock = action.payload;
            return {...state, 
                    instock: state.instock.concat(instock)}; 
            break;
        default:
            return state; 
            break;
    }
}


import * as ActionTypes from "../actions/ActionsTypes";

export const Orders = (state = {
        isLoading: true, 
        errMess: null,
        orders: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.GET_ORDERS:
            return {...state, 
                    isLoading: false, 
                    errMess: null, 
                    orders: action.payload};            
        case ActionTypes.ORDERS_FAILED:
            return {...state, 
                isLoading: false,
                errMess: action.payload};     
        case ActionTypes.ADD_ORDER:
                const order = action.payload;
            return {...state, 
                    orders: state.orders.concat(order)}; 
            break;
        default:
            return state; 
            break;
    }
}


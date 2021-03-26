import * as ActionTypes from "../actions/ActionsTypes";

export const Instock = (state = {
        isLoading: true, 
        errMess: null,
        page: 1,
        pages: 0,
        instock: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.GET_INSTOCK_PAGES:
            const pages = action.payload;
            return {...state, 
                    page: pages.page, 
                    pages: pages.totalPages}
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
        case ActionTypes.DELETE_INSTOCK:
            const toDeleteId = action.payload;
            return {...state, 
                instock: state.instock.filter(o => o._id !== toDeleteId)};
        case ActionTypes.EDIT_LOCATION:
            const toChangeItem = action.payload;
            return {...state, 
                instock: state.instock.filter(o => o._id !== toChangeItem._id).concat(toChangeItem)}; 
        case ActionTypes.EDIT_DETAILS:
            const toChangeDetails = action.payload;
            return {...state, 
                instock: state.instock.filter(o => o._id !== toChangeDetails._id).concat(toChangeDetails)};         
        case ActionTypes.SAVE_ITEM:
            const saveinstock = action.payload;
        return {...state, 
            instock: state.instock.concat(saveinstock)}; 
        break;
        default:
            return state; 
            break;
    }
}


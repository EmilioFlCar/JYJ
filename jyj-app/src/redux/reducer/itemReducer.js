import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, GET_ITEMS } from "../types/itemTypes";

const initialState = {
    items: []
}

const itemReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch(type){

        case GET_ITEMS:
            return{
                ...state,
                items: payload
            }
        case ADD_ITEM:
            return{
                ...state,
                items: payload
            }
        
        case EDIT_ITEM: 
            return{
                ...state,
                items: payload
            }
        case DELETE_ITEM:
            return{
                ...state,
                items: payload
            }
            default:
                return{
                    ...state
                }
    }
}
export default itemReducer
import { ADD_CLIENT, EDIT_CLIENT, DELETE_CLIENT, GET_CLIENT, GET_CLIENTS } from "../types/clientTypes";

const initialState = {
    clients: [],
}

const clientReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_CLIENT:
            return {
                ...state,
                clients: payload
            }
        case EDIT_CLIENT:
            return {
                ...state,
                clients: payload
            }
        case DELETE_CLIENT:
            return {
                ...state,
                clients: payload
            }
        case GET_CLIENT:
            return {
                ...state,
                client: payload
            }
        case GET_CLIENTS:
            return {
                ...state,
                clients: payload
            }
        default:
            return{
                ...state
            }
    }
}

export default clientReducer;
import { CREATE_INVOICE, DELETE_EQUIPMENT, GET_INVOICES, PUSH_EQUIPMENT, RESET_INVOICE, SET_INVOICE_CLIENT, UPDATE_INVOICE } from "../types/invoiceTypes";

const initialState = {
    client: {},
    clientID: null,
    equipmentData: [],
    invoices: []
}

const invoiceReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_INVOICES:
            return {
                ...state,
                invoices: payload
            }
               
        case CREATE_INVOICE:
            return {
                ...state,
                invoices: payload
            }
        case SET_INVOICE_CLIENT:
            return {
                ...state,
                client: payload,
                clientID: payload.id
            }
        case PUSH_EQUIPMENT:
            return {
                ...state,
                equipmentData: [...state.equipmentData, payload]
            }
        case DELETE_EQUIPMENT:
            return {
                ...state,
                equipmentData: payload
            }
        case RESET_INVOICE:
            return {
                ...state,
                client: {},
                clientID: null,
                equipmentData: [],
            }
        case UPDATE_INVOICE:
            return{
                ...state,
                invoices: payload.data
            }

        default:
            return {
                ...state
            }
    }
}

export default invoiceReducer
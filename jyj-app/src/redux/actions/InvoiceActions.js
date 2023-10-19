import axios from "axios";
import { CREATE_INVOICE, DELETE_EQUIPMENT, GET_INVOICES, PUSH_EQUIPMENT, RESET_INVOICE, SET_INVOICE_CLIENT, UPDATE_INVOICE } from "../types/invoiceTypes";
import generatePDF from "../../functions/generatePDF";

export function getInvoices(){

    return async function (dispatch){
        try {
            const invoices = await axios.get('https://jyj-api.onrender.com/jyj/invoice')
            dispatch({
                type: GET_INVOICES,
                payload: invoices.data
            })
        } catch (error) {
            alert(error)
        }

    }
}



export function createInvoice(data) {
    return async function (dispatch) {
        try {
            const response = await axios.post('https://jyj-api.onrender.com/jyj/invoice', data)
            dispatch({
                type: CREATE_INVOICE,
                payload: response.data.allInvoices
            })
            alert("¡Factura creada con éxito!")
            dispatch(resetInvoice());
        } catch (error) {
            alert("Error al crear la factura")
        }
    }
}

export function setInvoiceClient(id) {
    return {
        type: SET_INVOICE_CLIENT,
        payload: id
    }
}

export function pushEquipment(equipment) {
    return {
        type: PUSH_EQUIPMENT,
        payload: equipment
    }
}

export function deleteEquipment(equipment) {
    return {
        type: DELETE_EQUIPMENT,
        payload: equipment
    }
}

export function resetInvoice() {
    return {
        type: RESET_INVOICE,
    }
}

export function updateInvoice(id, state){
    return async function(dispatch){
        try {
            const update = await axios.put('https://jyj-api.onrender.com/jyj/invoice/update', {id, state})
            dispatch({
                type: UPDATE_INVOICE,
                payload: update
            })     
        } catch (error) {
            alert(error)
        }
    }
}
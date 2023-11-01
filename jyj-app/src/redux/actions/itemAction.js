import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, GET_ITEMS } from "../types/itemTypes";
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export function getItems() {
    return async function (dispatch) {
        try {
            const items = await axios.get(`${API_URL}/equipment`)
            dispatch({
                type: GET_ITEMS,
                payload: items.data
            })
        } catch (error) {
            alert(error)
        }
    }
}


export function addItem(item) {

    return async function (dispatch) {
        try {
            const { name, amount, price } = item

            const newItem = await axios.post(`${API_URL}/equipment`, { name, amount, price })
            dispatch({
                type: ADD_ITEM,
                payload: newItem.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function editItem(item) {
    return async function (dispatch) {
        try {   
            const items = await axios.put(`${API_URL}/equipment` + item.id, item)
            dispatch({
                type: EDIT_ITEM,
                payload: items.data.equipment
            })
        } catch (error) {
            alert(error)
        }
    }

}

export function deleteItem(id) {
    return async function (dispatch) {
        try {
            const deleted = await axios.delete(`${API_URL}/equipment/${id}`)
            dispatch({
                type: DELETE_ITEM,
                payload: deleted.data.equipment
            })
        } catch (error) {
            alert(error)
        }

    }
}
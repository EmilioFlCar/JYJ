import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, GET_ITEMS } from "../types/itemTypes";
import axios from 'axios'

export function getItems(){
    return async function (dispatch){
        try {
            const items = await axios.get('https://jyj-api.onrender.com/jyj/equipment')
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
            const newItem = await axios.post('https://jyj-api.onrender.com/jyj/equipment/',
            {name, amount, price})
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
    return async function(dispatch){
        try {
            const items = await axios.put('https://jyj-api.onrender.com/jyj/equipment/'+item.id, item)
            dispatch ({
                type: EDIT_ITEM,
                payload: items.data.equipment
            })
        } catch (error) {
            alert(error)            
        }
    }

}

export function deleteItem(id) {
    return async function (dispatch){
        try {
            const deleted = await axios.delete('https://jyj-api.onrender.com/jyj/equipment/'+id)
            dispatch({
                type: DELETE_ITEM,
                payload: deleted.data.equipment
            })
        } catch (error) {
            alert(error)
        }

    }
}
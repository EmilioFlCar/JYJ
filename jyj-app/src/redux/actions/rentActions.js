import { SET_DATA, SET_END_DATE, SET_ITEMS_TO_RENT, SET_ITEM_ID, SET_START_DATE } from "../types/rentTypes";


export function setData(data){
    return {
        type: SET_DATA,
        payload: data
    }
}
export function setItemID(id){
    return{
        type: SET_ITEM_ID,
        payload: id
    }
}

export function setItemsToRent(n){
    return{
        type: SET_ITEMS_TO_RENT,
        payload: n
    }
}

export function setStartDate(date){
    return{
        type: SET_START_DATE,
        payload: date
    }
}

export function setEndDate(date){
    return{
        type: SET_END_DATE,
        payload: date
    }
}
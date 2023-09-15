import { SET_DATA, SET_END_DATE, SET_ITEMS_TO_RENT, SET_ITEM_ID, SET_START_DATE } from "../types/rentTypes";

const initialState = {
    itemID: null,
    itemsToRent: null,
    startDate: null,
    endDate: null
}

const rentReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_DATA:
            return {
                ...state,
                itemID: payload.itemID,
                itemsToRent: payload.itemsToRent,
                startDate: payload.startDate,
                endDate: payload.endDate

            }
        case SET_ITEM_ID:
            return {
                ...state,
                itemID: payload
            }
        case SET_ITEMS_TO_RENT:
            return {
                ...state,
                itemsToRent: payload
            }
        case SET_START_DATE:
            return {
                ...state,
                startDate: payload
            }
        case SET_END_DATE:
            return {
                ...state,
                endDate: payload
            }
        default:
            return {
                ...state
            }
    }
}

export default rentReducer
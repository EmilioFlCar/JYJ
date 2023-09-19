import { ADD_CLIENT, EDIT_CLIENT, DELETE_CLIENT, GET_CLIENT, GET_CLIENTS } from "../types/clientTypes";
import axios from 'axios'


export function addClient(client) {
    return async function (dispatch) {
        try {
            const { id, name, phoneNumber, address, email } = client
            const newUser = await axios.post('https://jyj-api.onrender.com/jyj/clients/', {
                id, name, phoneNumber, address, email
            })
            if (newUser) {
                dispatch({
                    type: ADD_CLIENT,
                    payload: newUser.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export function editClient(client) {
    return async function (dispatch) {
        try {
            const updatedClients = await axios.put('https://jyj-api.onrender.com/jyj/clients/' + client.id, client)
            console.log(updatedClients);
            dispatch({
                type: EDIT_CLIENT,
                payload: updatedClients.data.clients
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteClient(id) {
    return async function (dispatch) {
        try {
            const deleted = await axios.delete('https://jyj-api.onrender.com/jyj/clients/' + id)
            if (deleted.data.deleted === 1) {
                dispatch({
                    type: DELETE_CLIENT,
                    payload: deleted.data.clients
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function getClient(id) {
    return async function (dispatch) {
        try {
            const client = await axios.get('https://jyj-api.onrender.com/jyj/clients?id=' + id)
            dispatch({
                type: GET_CLIENT,
                payload: client.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getClients() {
    return async function (dispatch) {
        try {
            const clients = await axios.get('https://jyj-api.onrender.com/jyj/clients/')
            dispatch({
                type: GET_CLIENTS,
                payload: clients.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
import axios from 'axios';
import { apiUrl } from '../api/api-config'

// Create

export const AddNewOrder = (order) => {
    const addOr = apiUrl('newOrder')
    return axios.post(addOr, order).then(response => response.data)
}

// Read

export const GetAllOrders = () => {
    const getAll = apiUrl('getOrders')
    return axios.get(getAll).then(response => response.data)
}

// Update

export const UpdateOrder = (order) => {
    const update = apiUrl('updateOrder')
    return axios.put(update, order).then(response => response.data)
}

// Delete

export const RemoveOrder = (id) => {
    const deleteOr = apiUrl(`deleteOrder/${id}`)
    return axios.delete(deleteOr).then(response => response.data);
}
import axios from 'axios';
import { apiUrl } from '../api/api-config'

// Create

export const AddNewProd = (prod) => {
    const addProd = apiUrl('saveProduct')
    return axios
        .post(addProd, prod, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => response.data)
}

// Read

export const GetProducts = () => {
    const getAll = apiUrl('getProducts')
    return axios.get(getAll).then(response => response.data)
}

export const GetSpecificProducts = (prods) => {
    if (prods !== undefined || prods.length >= 0) {
        const getSome = apiUrl('getConcretProducts')
        return axios.post(getSome, prods).then(response => response.data)
    }

    return null
}

// Update

export const UpdateDataProd = (id, prod) => {
    const update = apiUrl(`updateProduct/${id}`)
    return axios
        .put(update, prod, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => response.data)
};

// Delete

export const RemoveProd = (idProd) => {
    const deleteProd = apiUrl(`deleteProduct/${idProd}`)
    return axios.delete(deleteProd).then(response => response.data);
}
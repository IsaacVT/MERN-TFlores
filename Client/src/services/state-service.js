import axios from 'axios';
// API-URL
import { apiUrl } from '../api/api-config';

// Read

export const GetStates = () => {
    const getAll = apiUrl(`getStates`);
    return axios.get(getAll).then(response => response.data)
}
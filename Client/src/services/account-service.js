import axios from 'axios';
// API-URL
import { apiUrl } from '../api/api-config';

// Create
export const AddNewAccount = (account) => {
  const addAc = apiUrl('saveAccount');
  return axios.post(addAc, account).then((response) => response.data);
};

// Read
export const CheckData = (account) => {
  const signin = apiUrl('singin');
  return axios.post(signin, account).then((res) => res.data);
};

export const GetAccountByUser = (idUser) => {
  const getAccount = apiUrl(`getAccountUser/${idUser}`);
  return axios.get(getAccount).then((response) => response.data[0]);
};

// Update
export const UpdateDataAccount = (id, account) => {
  const update = apiUrl(`updateAccount/${id}`);
  return axios.put(update, account).then((response) => response.data);
};

// Delete
export const DeleteUserAccount = (id) => {
  const deleteAcc = apiUrl(`deleteAccount/${id}`);
  return axios.delete(deleteAcc).then((response) => response.data);
};

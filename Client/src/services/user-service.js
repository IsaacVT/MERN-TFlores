import axios from 'axios';
import { apiUrl } from '../api/api-config';

// Create

export const AddNewUser = (user) => {
  const addUser = apiUrl('saveUser');
  return axios.post(addUser, user).then((response) => response.data);
};

export const InsertNewData = (form) => {
  const insertExcel = apiUrl('insertData');
  return axios
    .post(insertExcel, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);
};

// Read

export const GetUsers = () => {
  console.log('🚀 ~ file: account-service.js:4 ~ apiUrl:', apiUrl);
  const getAll = apiUrl('getUsers');
  return axios.get(getAll).then((response) => response.data);
};

export const GetInfoUser = (data) => {
  const getData = apiUrl(`getUser/${data}`);
  return axios.get(getData).then((user) => user.data);
};

// Update

export const UpdateDataUser = (id, user) => {
  const update = apiUrl(`updateUser/${id}`);
  return axios.put(update, user).then((response) => response.data);
};

// Delete

export const RemoveUser = (idUser) => {
  const deleteUs = apiUrl(`deleteUser/${idUser}`);
  return axios.delete(deleteUs).then((response) => response.data);
};

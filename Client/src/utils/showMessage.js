// SweetAlert
import { forEach } from 'lodash';
import Swal from 'sweetalert2';

export const ShowError = (err) => {
    const { data } = err.response;
    const { errors } = data;
    let listErrors = ''

    forEach(errors, (error) => {
        if (listErrors.length === 0) {
            listErrors = error.msg
        } else {
            listErrors += `<br><br>${error.msg}`
        }
    })

    Swal.fire({
        title: 'ATENTION!',
        html: listErrors,
        icon: 'error',
        confirmButtonText: 'Return',
    });
};

export const ShowMsg = (msg) => {
    Swal.fire({
        title: 'WARNING!',
        html: msg,
        icon: 'warning',
        confirmButtonText: 'Return',
    });
};

export const NewRegister = (msg) => {
    Swal.fire({
        title: 'APP-MERN says hello!',
        html: msg,
        icon: 'success',
        confirmButtonText: 'Continue',
    });
};

export const Success = (msg) => {
    Swal.fire({
        title: 'APP-MERN says:',
        html: msg,
        icon: 'success',
        confirmButtonText: 'Continue',
    });
};
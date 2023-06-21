import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Grid, Modal, Button, MenuItem, Stack, Typography } from '@mui/material';
// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import Iconify from '../../../components/iconify';
// Services
import { DeleteUserAccount, GetAccountByUser } from '../../../services/account-service';
import { DeleteUserCart } from '../../../services/cart-service';
import { RemoveUser } from '../../../services/user-service';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '25px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

UserModalDelete.propTypes = {
    row: PropTypes.object,
};

export default function UserModalDelete({ row }) {

    const user = row.row;

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const deleteProcess = () => {
        Promise.resolve(
            GetAccountByUser(user.id)
        ).then((res) => {
            deleteAccount(res._id)
        }).catch((err) => {
            console.log("🚀 ~ file: UserModalDelete.js:48 ~ ).then ~ err:", err)
        })
    }

    const deleteAccount = (accountId) => {
        Promise.resolve(
            DeleteUserAccount(accountId)
        ).then((res) => {
            console.log("🚀 ~ file: UserModalDelete.js:60 ~ ).then ~ res:", res.status)
            deleteCart(user.id)
        }).catch((err) => {
            console.log("🚀 ~ file: UserModalDelete.js:62 ~ ).then ~ err:", err)
        })
    }

    const deleteCart = (userId) => {
        console.log("🚀 ~ file: UserModalDelete.js:67 ~ deleteCart ~ userId:", userId)
        Promise.resolve(
            DeleteUserCart(userId)
        ).then((res) => {
            console.log("🚀 ~ file: UserModalDelete.js:70 ~ ).then ~ res:", res.status)
            deleteUser(userId)
        }).catch((err) => {
            console.log("🚀 ~ file: UserModalDelete.js:72 ~ ).then ~ err:", err)
        })
    }

    const deleteUser = (idUser) => {
        Promise.resolve(
            RemoveUser(idUser)
        ).then((res) => {
            console.log("🚀 ~ file: UserModalDelete.js:82 ~ ).then ~ res:", res)
            setOpen(false);
            window.location.reload(true)
        }).catch((err) => {
            console.log("🚀 ~ file: UserModalDelete.js:85 ~ ).then ~ err:", err)
        })
    }

    return (
        <>
            <MenuItem onClick={handleOpen} sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Delete
            </MenuItem>

            <Modal open={open} >
                <Grid sx={{ ...style, width: 400 }} container spacing={1}>

                    <Grid item xs={12} >
                        <Stack alignItems={'center'} spacing={8} sx={{ mt: 5, mb: 6 }}>

                            <Typography variant="h4">
                                ¿Delete user?
                            </Typography>

                            <Typography variant="h5">
                                {user.names} {user.lastName}
                            </Typography>

                            <Stack direction={'row'} spacing={6}>
                                <Button onClick={handleClose} variant="contained" color="warning" startIcon={<KeyboardReturnRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />} sx={{ width: 'auto' }}>
                                    Cancel
                                </Button>

                                <Button onClick={deleteProcess} variant="contained" color="error" endIcon={<DeleteRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />} sx={{ width: 'auto' }}>
                                    Delete
                                </Button>
                            </Stack>
                        </Stack>

                    </Grid>
                </Grid>
            </Modal>
        </ >
    );
}
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Grid, Modal, Button, MenuItem, Stack, Typography } from '@mui/material';
// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import Iconify from '../../../components/iconify';
import { RemoveOrder } from '../../../services/order-service';
// Services

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

OrderModalDelete.propTypes = {
    row: PropTypes.object,
};

export default function OrderModalDelete({ row }) {

    const order = row.row;

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        Promise.resolve(
            RemoveOrder(order.id)
        ).then((res) => {
            console.log("🚀 ~ file: UserModalDelete.js:82 ~ ).then ~ res:", res)
            setOpen(false);
            window.location.reload(true)
        }).catch((err) => {
            console.log("🚀 ~ file: UserModalDelete.js:48 ~ ).then ~ err:", err)
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
                                ¿Delete order?
                            </Typography>

                            <Typography variant="h6">
                                Order: {order.id}
                            </Typography>

                            <Stack direction={'row'} spacing={6}>
                                <Button onClick={handleClose} variant="contained" color="warning" startIcon={<KeyboardReturnRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />} sx={{ width: 'auto' }}>
                                    Cancel
                                </Button>

                                <Button onClick={handleDelete} variant="contained" color="error" endIcon={<DeleteRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />} sx={{ width: 'auto' }}>
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
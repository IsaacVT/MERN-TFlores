import { useState } from 'react';
import { Grid, Modal, Button } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Iconify from '../../../components/iconify';
import UserGridNew from './UserGridNew';

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

const styleBtn = {
    position: 'absolute',
    top: '0',
    left: '0',
    borderRadius: '100%',
    transform: 'translate(-35%, -35%)',
    bgcolor: 'background.default',
    p: 1.5,
    width: 'auto',
};

export default function UserModalNew() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New User
            </Button>

            <Modal open={open} >
                <Grid sx={{ ...style, width: 900 }} container spacing={1}>
                    <Button sx={{ ...styleBtn }} onClick={handleClose} variant="contained" color="error">
                        <CancelRoundedIcon sx={{ fontSize: 'h1.fontSize' }} color="error" />
                    </Button>

                    <UserGridNew />
                </Grid>
            </Modal>
        </ >
    );
}
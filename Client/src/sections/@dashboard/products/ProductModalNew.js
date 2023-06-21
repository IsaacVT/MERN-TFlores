import { useState } from 'react';
import { Grid, Modal, Button, IconButton } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ProductGridNew from './ProductGridNew'

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
    boxShadow: 24,
    p: 1,
    width: 'auto',
};

export default function ProductModalNew() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOpen} startIcon={<AddCircleOutlineRoundedIcon />} > Agregar producto </Button>

            <Modal open={open} >
                <Grid sx={{ ...style, width: 800 }} container spacing={1}>
                    <Button sx={{ ...styleBtn }} onClick={handleClose} variant="contained" color="error">
                        <IconButton color="error">
                            <CancelRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />
                        </IconButton>
                    </Button>

                    <ProductGridNew />
                </Grid>
            </Modal>
        </ >
    );
}
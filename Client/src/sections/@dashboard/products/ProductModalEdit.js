import PropTypes from 'prop-types';
import { useState } from 'react';
import { Grid, Modal, Button, MenuItem } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Iconify from '../../../components/iconify';
import ProductGridEdit from './ProductGridEdit';

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

ProductModalEdit.propTypes = {
    product: PropTypes.object,
};

export default function ProductModalEdit({ product }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MenuItem onClick={handleOpen} sx={{ backgroundColor: 'success.main', width: '100%', pl: '10%' }} >
                Edit
                <Iconify icon={'eva:edit-fill'} sx={{ ml: 2 }} />
            </MenuItem>

            <Modal open={open} >
                <Grid sx={{ ...style, width: 800 }} container spacing={1}>
                    <Button sx={{ ...styleBtn }} onClick={handleClose} variant="contained" color="error">
                        <CancelRoundedIcon sx={{ fontSize: 'h1.fontSize' }} color="error" />
                    </Button>

                    <ProductGridEdit product={product} />
                </Grid>
            </Modal>
        </ >
    );
}
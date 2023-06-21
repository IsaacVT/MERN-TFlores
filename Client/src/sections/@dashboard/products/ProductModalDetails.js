import PropTypes from 'prop-types';
import { useState } from 'react';
import { Grid, Modal, Button, MenuItem, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ProductGridDetails from './ProductGridDetails';

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
    p: 1.5,
    width: 'auto',
};

ProductModalDetails.propTypes = {
    product: PropTypes.object,
};

export default function ProductModalDetails({ product }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MenuItem onClick={handleOpen} sx={{ width: '100%', alignSelf: 'center', backgroundColor: 'warning.light', borderRadius: '25px', mt: '25px' }}>
                <Typography sx={{ paddingLeft: '33%', paddingRight: '33%' }}>
                    Details
                </Typography>
            </MenuItem>

            <Modal open={open} >
                <Grid sx={{ ...style, width: 800 }} container spacing={1}>
                    <Button sx={{ ...styleBtn }} onClick={handleClose} variant="contained" color="error">
                        <CancelRoundedIcon sx={{ fontSize: 'h1.fontSize' }} color="error" />
                    </Button>

                    <ProductGridDetails product={product} />
                </Grid>
            </Modal>
        </ >
    );
}
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Grid, Modal, Button, Box, Typography, Stack, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Iconify from '../../../components/iconify';
import { RemoveProd } from '../../../services/product-service';

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

const StyledProductImg = styled('img')({
    top: 0,
    width: '90%',
    height: '115%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '25px',
    filter: 'grayscale(100%)',
});

ProductModalDelete.propTypes = {
    product: PropTypes.object,
};

export default function ProductModalDelete({ product }) {
    const [open, setOpen] = useState(false);

    const [id] = useState(product.id);
    const [preview] = useState(product.cover);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const deleteProd = () => {
        console.log('Prod id: ', id);
        try {
            Promise.resolve(
                RemoveProd(id)
            ).then((res) => {
                console.log("🚀 ~ file: ProductModalDelete.js:57 ~ ).then ~ res:", res)
                setOpen(false);
                window.location.reload(true)
            })
        } catch (err) {
            console.log("🚀 ~ file: ProductModalDelete.js:64 ~ deleteProd ~ err:", err)
        }
    }

    return (
        <>
            <MenuItem onClick={handleOpen} sx={{ backgroundColor: 'error.main', width: '100%', pr: '10%' }}>
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Delete
            </MenuItem>

            <Modal open={open} >
                <Grid sx={{ ...style, width: '600px' }} container spacing={1}>

                    <Grid item xs={6}>
                        <Box sx={{ pt: '100%', position: 'relative', mt: 1 }}>
                            <StyledProductImg src={preview} alt='imagePreview' />
                        </Box>
                    </Grid>

                    <Grid item xs={6} >
                        <Stack alignItems={'center'} spacing={8} sx={{ mt: 5, mb: 6 }}>

                            <Typography variant="h4">
                                ¿Delete?
                            </Typography>

                            <Typography variant="h5">
                                {product.name}
                            </Typography>

                            <Stack direction={'row'} spacing={6}>
                                <Button onClick={handleClose} variant="contained" color="warning" startIcon={<KeyboardReturnRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />} sx={{ width: 'auto' }}>
                                    Cancel
                                </Button>

                                <Button onClick={deleteProd} variant="contained" color="error" endIcon={<DeleteRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />} sx={{ width: 'auto' }}>
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
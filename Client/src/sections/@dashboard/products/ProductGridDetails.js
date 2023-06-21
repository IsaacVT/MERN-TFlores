import PropTypes from 'prop-types';
// @mui
import { Grid, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// Utils
import { fCurrency } from '../../../utils/formatNumber';

const StyledProductImg = styled('img')({
    top: 0,
    width: '80%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '25px'
});

ProductGridDetails.propTypes = {
    product: PropTypes.object,
};

export default function ProductGridDetails({ product }) {
    const { id, name, cover, price, send, description, type } = product;
    const priceBefore = price + (price * 0.2)

    return (
        <>
            <Grid item xs={6}>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    <StyledProductImg alt={name} src={cover} />
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Stack spacing={3}>
                    <Typography sx={{ fontSize: 'h2.fontSize' }}>
                        {name}
                    </Typography>

                    <Typography sx={{ fontSize: 'h4.fontSize' }} >
                        {description}
                    </Typography>

                    <Typography sx={{ fontSize: 'h5.fontSize', color: 'warning.dark', fontWeight: 'bold' }}>
                        Tipo de producto: {type}
                    </Typography>

                    <Stack spacing={1}>

                        <Stack direction={'row'} spacing={1}>

                            <Typography sx={{ fontSize: 'h5.fontSize', color: 'success.dark', fontWeight: 'bold' }}>
                                Precio ahora: {fCurrency(price)}
                            </Typography>

                            <Typography sx={{ fontSize: 'h5.fontSize', textDecoration: 'line-through', color: 'error.main', fontWeight: 'bold' }}>
                                {fCurrency(priceBefore)}
                            </Typography>

                        </Stack>

                        <Typography sx={{ fontSize: 'h5.fontSize', color: 'success.main', fontWeight: 'bold' }} >
                            Ahorra 20% en esta compra
                        </Typography>

                        <Typography sx={{ fontSize: 'h5.fontSize', color: 'success.dark', fontWeight: 'bold' }}>
                            Costo de envio: {fCurrency(send)}
                        </Typography>

                    </Stack>
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Typography pt={3} sx={{ color: 'error.dark', fontSize: '13px' }} textAlign='center' >
                    CLAVE: {id}
                </Typography>
            </Grid>
        </>
    )
}
import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Grid, Button, Stack, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
// Icon
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { UpdateOrder } from '../../../services/order-service';
// Services

OrderGridEdit.propTypes = {
    order: PropTypes.object,
};

export default function OrderGridEdit({ order }) {

    const [statusUpdate, setStatusUpdate] = useState(order.status);
    const [paymentUpdate, setPaymentUpdate] = useState(order.payment);
    const [shipmentUpdate, setShipmentUpdate] = useState(order.shipment);

    const handleUpdate = () => {
        const { id, name, direction, products, total } = order
        const newOrder = { id, name, direction, products, total, statusUpdate, paymentUpdate, shipmentUpdate }

        Promise.resolve(
            UpdateOrder(newOrder)
        ).then((res) => {
            console.log("🚀 ~ file: OrderGridEdit.js:27 ~ ).then ~ res:", res)
            window.location.reload(true);
        }).catch((error) => {
            console.log("🚀 ~ file: OrderGridEdit.js:29 ~ ).then ~ error:", error)
        })
    }

    const getUpdate = () => {
        if (order.status !== statusUpdate || order.payment !== paymentUpdate || order.shipment !== shipmentUpdate) {
            return false
        }

        return true
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} sx={{ mt: 3, mb: 3 }}>
                    <Stack alignItems='center' justifyContent='center' sx={{ mb: 5 }}>
                        <Typography variant="h6">
                            Updating order: {order.id}
                        </Typography>
                    </Stack>

                    <Stack direction='row' spacing={5} alignItems='center' justifyContent='center'>
                        <FormControl required sx={{ width: '20%' }}>
                            <InputLabel id="status-label">Status order</InputLabel>
                            <Select
                                labelid="status-label"
                                label="Status order"
                                name="status"
                                value={statusUpdate}
                                onChange={(event) => setStatusUpdate(event.target.value)}
                            >
                                <MenuItem value="order_placed">Placed</MenuItem>
                                <MenuItem value="order_shipped">Shipped</MenuItem>
                                <MenuItem value="order_canceled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required sx={{ width: '20%' }}>
                            <InputLabel id="payment-label">Status shipment</InputLabel>
                            <Select
                                labelid="payment-label"
                                label="Status payment"
                                name="payment"
                                value={paymentUpdate}
                                onChange={(event) => setPaymentUpdate(event.target.value)}
                            >
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="SUCCESS">Completed</MenuItem>
                                <MenuItem value="REFUNDED">Refunded</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required sx={{ width: '20%' }}>
                            <InputLabel id="shipment-label">Status shipment</InputLabel>
                            <Select
                                labelid="shipment-label"
                                label="Status shipment"
                                name="shipment"
                                value={shipmentUpdate}
                                onChange={(event) => setShipmentUpdate(event.target.value)}
                            >
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="IN TRANSIT">In transit</MenuItem>
                                <MenuItem value="DELIVERED">Delivered</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            endIcon={<AddCircleOutlineRoundedIcon />}
                            onClick={handleUpdate}
                            sx={{ width: 'auto' }}
                            disabled={getUpdate()}
                        >
                            Actualizar
                        </Button>
                    </Stack>
                </Grid>
            </Grid >
        </>
    );
}

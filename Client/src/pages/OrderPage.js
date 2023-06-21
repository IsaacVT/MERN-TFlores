import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
// @mui
import { Paper, Button, IconButton, Typography, Container, Table, TableContainer, TableBody, TableRow, TableCell, TableHead, Card, Divider, Stack, Popover, TableFooter } from '@mui/material';
// Icons
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import Iconify from '../components/iconify';
// Seccion
import { OrderModalDelete, OrderModalEdit } from '../sections/@dashboard/order';
// Utils
import { fCurrency } from '../utils/formatNumber';
// Service
import { GetAllOrders } from '../services/order-service';

// ----------------------------------------------------------------------

export default function OrderPage() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([])
    const [orderSelected, setOrderSelected] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        Promise.resolve(
            GetAllOrders()
        ).then((response) => {
            setOrders(response.map((order) => ({
                id: order._id,
                user: order.user,
                name: order.name,
                direction: order.direction,
                products: order.products,
                total: order.total,
                status: order.status,
                payment: order.payment,
                shipment: order.shipment,
                comment: order.comment
            })))
        })
    }, [])

    const data = orders

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleReturn = () => {
        navigate('/dashboard/products', { replace: true });
    }

    return (
        <>
            <Helmet>
                <title> Orders | Minimal UI </title>
            </Helmet>

            <Container>
                <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' colSpan={10} sx={{ fontSize: '15px' }}>Orders</TableCell>
                                </TableRow>
                            </TableHead>

                            {data.length === 0 ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                                            <Paper
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography variant="h3" paragraph>
                                                    Not orders found
                                                </Typography>

                                                <Typography variant="body1">
                                                    Please return to the store <br />
                                                    to choose one of our products <br />
                                                    and create a new order
                                                </Typography>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (data.map((row) => {
                                const { id, name, direction, products, total, status, payment, shipment } = row;

                                return (
                                    <TableBody key={id}>

                                        <TableRow>
                                            <TableCell colSpan={10}>
                                                <Divider>ORDER: {id}</Divider>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={4} align='left'>Client<br />{name}</TableCell>
                                            <TableCell colSpan={5} align='left'>Shipping address<br />{direction}</TableCell>
                                            <TableCell colSpan={1} align='right'>
                                                <IconButton size="large" color="inherit" onClick={(event) => {
                                                    setOpen(event.currentTarget)
                                                    setOrderSelected({ row })
                                                }}>
                                                    <Iconify icon={'eva:more-vertical-fill'} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={10}>
                                                <Divider>PRODUCT DETAILS</Divider>
                                            </TableCell>
                                        </TableRow>

                                        {Object.values(products).map((product) => (
                                            <TableRow key={product.name}>
                                                <TableCell colSpan={2} align='left'>{product.name}</TableCell>
                                                <TableCell colSpan={2} align='center'>{product.amount}</TableCell>
                                                <TableCell colSpan={2} align='center'>{fCurrency(product.price)}</TableCell>
                                                <TableCell colSpan={2} align='center'>{fCurrency(product.send)}</TableCell>
                                                <TableCell colSpan={2} align='center'>{fCurrency(product.total)}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={8} />
                                            <TableCell colSpan={2} align='center' sx={{ fontWeight: 'bold' }}>
                                                Total to pay: {fCurrency(total)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={10}>
                                                <Divider>STATUS ORDER DETAILS</Divider>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={10} align='center' >
                                                <Stack direction='row' spacing={20} alignItems='center' justifyContent='center'>
                                                    <Typography sx={{ fontSize: '15px' }}>
                                                        Status: {noCase(status)}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '15px' }}>
                                                        Payment status: {noCase(payment)}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '15px' }}>
                                                        Shipment status: {noCase(shipment)}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={10}>&nbsp;</TableCell>
                                        </TableRow>
                                    </TableBody>
                                );
                            }))}

                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={12} align='center'>
                                        <Button variant='contained' color='warning' sx={{ width: '25%', fontSize: 'h6.fontSize' }} onClick={handleReturn} startIcon={<KeyboardReturnRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />}>
                                            Return to store
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >

                <OrderModalEdit row={orderSelected} />
                <OrderModalDelete row={orderSelected} />
            </Popover>
        </>
    )
}

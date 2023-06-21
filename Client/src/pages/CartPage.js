import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Paper, Button, Typography, Container, Table, TableContainer, TableBody, TableRow, TableCell, TableHead, IconButton, Card, TableFooter } from '@mui/material';
import { styled } from '@mui/material/styles';
// Icons
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
// Utils
import { fCurrency } from '../utils/formatNumber';
// Service
import { GetSpecificProducts } from '../services/product-service';
import { UpdateDataCart } from '../services/cart-service';
import { AddNewOrder } from '../services/order-service';
import { FormatData, FormatOrderData, GetIdProds, GetLocalUser, GetProdsData, UpdateLocalProd } from '../utils/localData';
import { CreateNotification } from '../utils/notification';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
    top: 0,
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '25px'
});

const styleBtn = {
    borderRadius: '100%',
    p: 3,
    width: 'auto',
};

// ----------------------------------------------------------------------

export default function CartPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([])

    let totalPrice = 0
    let totalSend = 0

    function getTotal(price, amount) {
        const p1 = Number(price)
        const p2 = Number(amount)
        const p3 = p1 * p2;
        return (p3.toFixed(2))
    }

    useEffect(() => {
        const idList = GetIdProds()
        const mapList = GetProdsData()

        if (idList.length > 0) {
            Promise.resolve(
                GetSpecificProducts(idList)
            ).then((response) => {
                setProducts(response.map((product) => ({
                    id: product._id,
                    name: product.name,
                    stock: product.stock,
                    price: product.price,
                    send: product.priceSend,
                    description: product.description,
                    type: product.prodType,
                    cover: product.cover.secure_url,
                    amount: mapList.get(product._id),
                    total: getTotal(product.price, mapList.get(product._id))
                })))
            })
        }
    }, [])

    const handleRemove = (e) => {
        let finalUpdate = null;
        const index = products.findIndex(product => product.id === e.id)
        const prodUpdate = { ...products[index] }

        if (prodUpdate.amount > 1) {
            prodUpdate.amount -= 1;
            prodUpdate.total -= Number(prodUpdate.price)
            const newList = [...products]
            newList[index] = prodUpdate;
            finalUpdate = newList;
        } else {
            const updateList = products.filter(product => product.id !== prodUpdate.id)
            finalUpdate = updateList;
        }

        setProducts(finalUpdate)
    }

    const handleAdd = (e) => {
        const index = products.findIndex(product => product.id === e.id)
        const prodUpdate = { ...products[index] }

        if (prodUpdate.amount < prodUpdate.stock) {
            prodUpdate.amount += 1;
            prodUpdate.total = getTotal(prodUpdate.price, prodUpdate.amount)
            const newList = [...products]
            newList[index] = prodUpdate;
            setProducts(newList)
        }
    }

    function getList() {
        const listProd = products;

        listProd.forEach(product => {
            totalPrice += Number(product.total)
            totalSend += Number(product.send)
        })

        return listProd;
    }

    const getTotalFinal = () => totalPrice + totalSend;

    let data = getList();

    const handleReturn = () => {
        returnStore()
    }

    const returnStore = () => {
        const dataFormated = FormatData(data)
        const idUser = GetLocalUser()

        const dataFinal = {
            'user': idUser,
            'products': dataFormated
        }

        Promise.resolve(
            UpdateDataCart(dataFinal)
        ).then(() => {
            UpdateLocalProd(dataFormated)
            navigate('/dashboard/products', { replace: true });
            window.location.reload();
        })
    };

    const handleCreateOrder = () => {
        const user = GetLocalUser()

        const prods = FormatOrderData(data)

        const totalTmp = getTotalFinal()
        const final = totalTmp.toFixed(2)

        const order = { user, prods, final }

        Promise.resolve(
            AddNewOrder(order)
        ).then((res) => {
            CreateNotification(res)
            data = []
            returnStore()
        }).catch((err) => {
            console.log("🚀 ~ file: CartPage.js:154 ~ ).then ~ err:", err)
        })
    }

    return (
        <>
            <Helmet>
                <title> Dashboard: Cart | Minimal UI </title>
            </Helmet>

            <Container>
                <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' colSpan={2} sx={{ fontSize: 'h6.fontSize' }}>Product</TableCell>
                                    <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>Price</TableCell>
                                    <TableCell align='center' colSpan={3} sx={{ fontSize: 'h6.fontSize' }}>Amount</TableCell>
                                    <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>Total</TableCell>
                                    <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>Price send</TableCell>
                                </TableRow>
                            </TableHead>

                            {data.length === 0 ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                                            <Paper
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography variant="h3" paragraph>
                                                    Not products found
                                                </Typography>

                                                <Typography variant="body1">
                                                    Please return to the store <br />
                                                    to choose one of our products
                                                </Typography>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {data.map((row) => {
                                        const { id, name, price, send, cover, amount, total } = row

                                        return (
                                            <TableRow key={id}>
                                                <TableCell align='center'>
                                                    <Container sx={{ width: '150px' }}>
                                                        <StyledProductImg alt={name} src={cover} />
                                                    </Container>
                                                </TableCell>
                                                <TableCell align='left' sx={{ fontSize: 'h6.fontSize' }}>{name}</TableCell>
                                                <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>{fCurrency(price)}</TableCell>


                                                <TableCell align='right'>
                                                    <IconButton sx={{ ...styleBtn }} color="error" onClick={() => {
                                                        handleRemove({ id });
                                                    }}>
                                                        <RemoveCircleRoundedIcon sx={{ fontSize: 'h2.fontSize' }} color="error" />
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell align='center'>
                                                    <Typography variant='h6'>
                                                        {amount < 10 ? `0${amount}` : amount}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align='left'>
                                                    <IconButton sx={{ ...styleBtn }} color='success' onClick={() => {
                                                        handleAdd({ id })
                                                    }}>
                                                        <AddCircleRoundedIcon sx={{ fontSize: 'h2.fontSize' }} color={row.amount < row.stock ? 'success' : 'disabled'} />
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>{fCurrency(total)}</TableCell>
                                                <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>{fCurrency(send)}</TableCell>
                                            </TableRow>
                                        );
                                    })}

                                    <TableRow>
                                        <TableCell colSpan={4} rowSpan={2} />

                                        <TableCell align='center' colSpan={2} rowSpan={2}>
                                            <Typography variant='h6'>
                                                Total
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='h6'>
                                                {fCurrency(totalPrice)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='h6'>
                                                {fCurrency(totalSend)}
                                            </Typography>
                                        </TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center' colSpan={2}>
                                            <Typography variant='h6'>
                                                {fCurrency(getTotalFinal())}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}

                            <TableFooter>
                                <TableRow>
                                    <TableCell align='center'>
                                        <Button variant='contained' color='warning' sx={{ width: '100%', fontSize: 'h6.fontSize' }} onClick={handleReturn} startIcon={<KeyboardReturnRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />}>
                                            See products
                                        </Button>
                                    </TableCell>
                                    <TableCell colSpan={5} />
                                    <TableCell align='center' colSpan={2}>
                                        <Button variant='contained' color='success' sx={{ width: '100%', fontSize: 'h6.fontSize' }} onClick={handleCreateOrder} endIcon={<ShoppingCartCheckoutRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />} disabled={data.length === 0}>
                                            Request order
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </>
    )
}
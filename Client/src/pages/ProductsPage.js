import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Button, Stack } from '@mui/material';
// Services
import { GetProducts } from '../services/product-service';
import { GetCartUser } from '../services/cart-service';
// components
import { ProductList, ProductCartWidget, ProductModalNew } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Promise.resolve(
      GetProducts()
    ).then((response) => {
      setList(response.map((product) => ({
        id: product._id,
        name: product.name,
        stock: product.stock,
        price: product.price,
        send: product.priceSend,
        description: product.description,
        type: product.prodType,
        cover: product.cover.secure_url
      })))
    })
  }, [setList]);

  useEffect(() => {
    const data = window.localStorage.getItem('infoUser');
    const info = JSON.parse(data);
    const { role, user } = info
    if (role === 'ADMIN') {
      setVisible(true)
    }

    Promise.resolve(
      GetCartUser(user)
    ).then((res) => {
      window.localStorage.setItem('prodList', JSON.stringify(res.products))
    })
  }, [])

  const props = {
    products: list,
    editable: edit
  }

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction={"row"} justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>

          <Typography variant="h4">
            Productos
          </Typography>

          {visible && (
            <Stack direction={'row'} spacing={2}>
              {edit && <ProductModalNew className={edit ? "show-element" : null} />}

              <Button onClick={() => setEdit(!edit)} variant="outlined">
                {edit ? `Cerrar editor` : `Abrir editor`}
              </Button>
            </Stack>
          )}
        </Stack>

        <ProductList {...props} />

        <ProductCartWidget />
      </Container>
    </>
  );
}

import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
import ProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  editable: PropTypes.bool.isRequired
};

export default function ProductList({ products, editable }) {

  function getList() {
    const listProd = products;
    return listProd;
  }

  const list = getList();

  return (
    <Stack spacing={1}>
      <Grid container spacing={3}>
        {list.map((product) => {
          const props = { product, editable }

          return (
            <Grid key={product.id} item xs={12} sm={6} md={3}>
              <ProductCard {...props} />
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  );
}
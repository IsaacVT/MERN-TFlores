import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Grid, Box, Button, Stack, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { UpdateDataProd } from '../../../services/product-service';

const StyledProductImg = styled('img')({
    top: 0,
    width: '90%',
    height: '115%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '25px'
});

ProductGridEdit.propTypes = {
    product: PropTypes.object,
};

export default function ProductGridEdit({ product }) {

    // Product elements
    const [id] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [stock, setStock] = useState(product.stock);
    const [price, setPrice] = useState(product.price);
    const [priceSend, setPriceSend] = useState(product.send);
    const [description, setDescription] = useState(product.description);
    const [prodType, setProdType] = useState(product.type);
    const [cover, setCover] = useState(product.cover);
    const [preview, setPreview] = useState(product.cover);
    // Changes in prod
    const [changeList, setChangeList] = useState([]);
    const [changes, setChanges] = useState([]);
    // Button Property
    const [isEnabled, setIsEnabled] = useState(true);

    function getChanges() {
        if (name !== product.name) {
            changeList.push('name');
        }

        if (stock !== product.stock) {
            changeList.push('stock');
        }

        if (price !== product.price) {
            changeList.push('price');
        }

        if (priceSend !== product.send) {
            changeList.push('priceSend');
        }

        if (description !== product.description) {
            changeList.push('description');
        }

        if (prodType !== product.type) {
            changeList.push('prodType');
        }

        if (cover !== product.cover) {
            changeList.push('cover');
        }

        if (changeList.length > 0) {
            changes.push({ mod: changeList });
        } else {
            changes.push({ mod: '' });
        }
    }

    // Update Product
    const prepareProduct = () => {
        getChanges();
        console.log("🚀 ~ file: ProductGridEdit.js:81 ~ prepareProduct ~ changes:", changes[0])

        if (changes[0].mod.length > 0) {
            const productSend = { id, name, stock, price, priceSend, description, prodType, cover, preview }

            updateProduct(productSend);
        }

        setChangeList([]);
        setChanges([]);
    }

    const updateProduct = (product) => {
        setIsEnabled(false);
        const prodId = product.id;

        try {
            Promise.resolve(
                UpdateDataProd(prodId, product)
            ).then((response) => {
                console.log("🚀 ~ file: ProductGridEdit.js:98 ~ ).then ~ response:", response)
                window.location.reload(true)
            })
        } catch (err) {
            console.log("🚀 ~ file: ProductGridEdit.js:102 ~ updateProduct ~ err:", err.message)
        }
    }

    return (
        <>
            <Grid item xs={5}>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    <StyledProductImg src={preview} alt='imagePreview' />
                </Box>
            </Grid>

            <Grid item xs={7}>
                <Stack spacing={3} sx={{ mb: 3 }}>
                    <TextField
                        required
                        name="name"
                        label="Name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />

                    <TextareaAutosize
                        placeholder="Description*"
                        required
                        name="description"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                        style={{
                            minWidth: '100%',
                            maxWidth: '100%',
                            minHeight: '100px',
                            maxHeight: '100px',
                            resize: 'none',
                            fontSize: '1.2em',
                            borderRadius: '5px'
                        }}
                    />

                    <Stack spacing={3} direction='row'>
                        <TextField
                            required
                            name="stock"
                            label="Stock"
                            value={stock}
                            onChange={(event) => {
                                setStock(event.target.value);
                            }}
                        />

                        <TextField
                            required
                            name="price"
                            label="Price"
                            value={price}
                            onChange={(event) => {
                                setPrice(event.target.value);
                            }}
                        />

                        <TextField
                            required
                            name="priceSend"
                            label="Price send"
                            value={priceSend}
                            onChange={(event) => {
                                setPriceSend(event.target.value);
                            }}
                        />
                    </Stack>

                    <FormControl required>
                        <InputLabel id="type-label">Product type</InputLabel>
                        <Select
                            labelid="type-label"
                            label="Product type"
                            name="prodType"
                            value={prodType}
                            onChange={(event) => {
                                setProdType(event.target.value);
                            }}
                        >
                            <MenuItem value={'RAMO'}>RAMO</MenuItem>
                            <MenuItem value={'ARREGLO'}>ARREGLO</MenuItem>
                            <MenuItem value={'CANASTA'}>CANASTA</MenuItem>
                            <MenuItem value={'KIT'}>KIT</MenuItem>
                            <MenuItem value={'SET'}>SET</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>
            </Grid>

            <Grid item xs={4.5}>
                <Stack direction={'row'} justifyContent="center">
                    <Button variant="contained" component='label' color="secondary" startIcon={<UploadFileRoundedIcon />} onChange={(event) => {
                        setCover(event.target.files[0]);
                        setPreview(URL.createObjectURL(event.target.files[0]));
                    }} sx={{ width: 'auto' }}>
                        Change image
                        <input hidden accept="image/*" type="file" />
                    </Button>
                </Stack>
            </Grid>

            <Grid item xs={7.5} textAlign='right'>
                <Button type="submit" variant="contained" color="secondary" endIcon={<AddCircleOutlineRoundedIcon />} onClick={prepareProduct} sx={{ width: 'auto' }} disabled={!isEnabled}>
                    Actualizar
                </Button>
            </Grid>
        </>
    )
}
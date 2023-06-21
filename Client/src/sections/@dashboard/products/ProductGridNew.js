import { useState } from 'react';
// @mui
import { Grid, Box, Button, Stack, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import { AddNewProd } from '../../../services/product-service';

const StyledProductImg = styled('img')({
    top: 0,
    width: '90%',
    height: '115%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '25px'
});

export default function ProductGridNew() {

    // Product elements
    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0.0);
    const [priceSend, setPriceSend] = useState(0.0);
    const [description, setDescription] = useState('');
    const [prodType, setProdType] = useState('');
    const [cover, setCover] = useState(null);
    const [preview, setPreview] = useState('/assets/illustrations/illustration_flower.png');

    function resetInfo() {
        setName('');
        setStock(0);
        setPrice(0.0);
        setPriceSend(0.0);
        setDescription('');
        setProdType('');
        setCover(null);
        setPreview('/assets/illustrations/illustration_flower.png')
    }

    // Add Product
    const addProduct = () => {
        const newProduct = { name, stock, price, priceSend, description, prodType, cover }

        try {
            Promise.resolve(
                AddNewProd(newProduct)
            ).then((res) => {
                console.log("🚀 ~ file: ProductGridNew.js:52 ~ ).then ~ res:", res)
                window.location.reload(true)
                resetInfo();
            })
        } catch (err) {
            console.log("🚀 ~ file: ProductGridNew.js:57 ~ addProduct ~ err:", err)
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
                <Stack direction={'row'} justifyContent="space-between">
                    <Button variant="contained" component='label' color="secondary" startIcon={<UploadFileRoundedIcon />} onChange={(event) => {
                        setCover(event.target.files[0]);
                        setPreview(URL.createObjectURL(event.target.files[0]));
                    }} disabled={cover != null}>
                        Upload
                        <input hidden accept="image/*" type="file" />
                    </Button>

                    <Button variant="contained" color="error" endIcon={<ChangeCircleRoundedIcon />} onClick={() => {
                        setCover(null);
                        setPreview("/assets/illustrations/illustration_flower.png");
                    }} disabled={cover === null}>
                        Change
                    </Button>
                </Stack>
            </Grid>

            <Grid item xs={7.5} textAlign='right'>
                <Button type="submit" variant="contained" color="secondary" endIcon={<AddCircleOutlineRoundedIcon />}
                    disabled={name.length === 0 || description.length === 0 || stock === 0 || price === 0 || priceSend === 0 || prodType.length === 0 || cover === null} onClick={addProduct}>
                    Agregar
                </Button>
            </Grid>
        </>
    )
}
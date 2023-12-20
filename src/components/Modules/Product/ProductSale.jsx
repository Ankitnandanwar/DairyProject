import React, { useState, useEffect } from 'react'
import "./Product.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import { FiEdit } from "react-icons/fi";
// import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios'



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const ProductSale = () => {
    // product dropdown
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    const [productData, setProductData] = useState({
        openingBalance:"",
        rate:"",
        date:"",
        creammilk:"",
        addQty:"",
        mix:"",
        paymentPending:"",
        sahiwalGhee:"",
        waiveeoff:"",
        convertProd:"",
        saleCash:"",
        saleOnline:"",
        cashTotal:"",
        onlineTotal:"",
        totalAmt:"",
        closingBal:"",
        pending:"",
        remark:""
    })




    // to fetch current date 
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://103.38.50.113:8080/DairyApplication/getProduct');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
        // Fetch product data when a product is selected
    };


    const handleSave = async () => {
        try {
            const reqdata = {
                productId: selectedProduct,
            }

            const response = await axios.post(
                'http://103.38.50.113:8080/DairyApplication/saveProductAddSale',
                reqdata
            );

            if (response.status === 200) {
                alert('Data saved successfully');
                // You can reset the form or perform other actions after successful save
            } else {
                alert('Failed to save data. Please try again.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('An error occurred while saving data. Please try again.');
        }

    }


    return (
        <div className='mt-5 container'>
            <div className='pt-5'>
                <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Product Sale</h3>
            </div>
            <div className='row mt-4'>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id="demo-simple-select-standard-label" className='selectP'>Products</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Products"
                            MenuProps={MenuProps}
                            value={selectedProduct}
                            onChange={handleProductChange}
                        >

                            {
                                products.map((product, index) => (
                                    <MenuItem key={index} value={product}>
                                        {product}
                                    </MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        autoComplete="off"
                    >
                        <TextField label="Opening Balance" variant="standard" aria-readonly />
                    </Box>
                </div>

                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        autoComplete="off"
                    >
                        <TextField label="Rate" variant="standard" aria-readonly />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        autoComplete="off"
                    >
                        <TextField variant="standard" type='date' />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Cream Milk" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Add Qty" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Mix" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Payment Pending" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Sahiwal Ghee" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Waivee off" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Convert Product" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Sale Cash" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Sale Online" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Cash Total" variant="standard" aria-readonly />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Online Total" variant="standard" aria-readonly />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Total Amount" variant="standard" aria-readonly />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Closing Balance" variant="standard" aria-readonly />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Pending" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        type="text"
                        autoComplete="off"
                    >
                        <TextField label="Remark" variant="standard" />
                    </Box>
                </div>
                <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                    <button className='savebtn' onClick={() => { handleSave() }}>Save</button>
                    <button className='tabelbtn'>Show table</button>
                    <button className='savebtn' style={{ backgroundColor: 'green' }}>Export</button>
                </div>
            </div>
        </div>
    )
}

export default ProductSale
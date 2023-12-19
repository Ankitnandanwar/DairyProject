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
    const [currentDate, setCurrentDate] = useState("")
    const [productDetails, setProductDetails] = useState("");
    const [creammilk, setCreamMilk] = useState("");



    // to fetch current date 
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://103.38.50.113:8080/DairyApplication/getProductData?productName=${selectedProduct}`);
            const details = response.data[0];
            setProductDetails({
                openingBalance: details.openBalance,
                rate: details.rate
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://103.38.50.113:8080/DairyApplication/getProduct');
                setProducts(response.data);
                setCurrentDate(getCurrentDate())
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [])


    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    useEffect(() => {
        if (selectedProduct) {
            fetchProductDetails();
        }
    }, [selectedProduct]);

    const handleSave = async () => {
        try {
            const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveProductEntry", {
                productName: selectedProduct, 
                openBalance: productDetails.openingBalance,
                rate: productDetails.rate,
                creammilk: creammilk,
                currentDate,
                
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
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

                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                products.map((prod, index) => (
                                    <MenuItem  key={`${prod}-${index}`} value={prod}>{prod}</MenuItem>
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
                        <TextField label="Opening Balance" variant="standard" value={productDetails.openingBalance} readOnly/>
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
                        <TextField label="Rate" variant="standard" value={productDetails.rate} readOnly/>
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
                        <TextField variant="standard" type='date' value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
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
                        <TextField label="Cream Milk" variant="standard" value={creammilk} onChange={(e) => setCreamMilk(e.target.value)} />
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
                        <TextField label="Mix" variant="standard"/>
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
                        <TextField label="Cash Total" variant="standard" aria-readonly/>
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
                    <button className='savebtn' onClick={() => handleSave()}>Save</button>
                    <button className='tabelbtn'>Show table</button>
                    <button className='savebtn' style={{ backgroundColor: 'green' }}>Export</button>
                </div>
            </div>
        </div>
    )
}

export default ProductSale

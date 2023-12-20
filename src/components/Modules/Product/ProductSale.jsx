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

    // get api fetch data using date
    // const [currentDate, setCurrentDate] = useState('');
    const [tableData, setTableData] = useState([]);



    // to fetch current date 
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedProductData, setSelectedProductData] = useState({
        openingBalance: "",
        rate: ""
    });


    // using product name, opening bal and rate fetch
    const fetchProductData = async (productId) => {
        try {
            const response = await axios.get(`http://103.38.50.113:8080/DairyApplication/getProduct/${productId}`);
            const productData = response.data;

            // Update the state with the fetched data
            setSelectedProductData({
                openingBalance: productData.openBalance,
                rate: productData.rate
            });
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://103.38.50.113:8080/DairyApplication/getProduct');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    // Show table data 
    const fetchByCurrentDate = async () => {
        try {
          const apiUrl = 'http://103.38.50.113:8080/DairyApplication/findProductDataByCurrentDate';
          const currentDate = '20/12/2023';
    
          // Making the API call using axios
          const response = await axios.get(apiUrl, {
            params: {
              currentDate: currentDate,
            },
          });
    
          // Logging the response to the console
          console.log('API Response:', response.status);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    

    useEffect(() => {
        fetchProducts()
        fetchByCurrentDate()
    }, [])


    const handleProductChange = (event) => {
        const selectedProductId = event.target.value;
        setSelectedProduct(selectedProductId);
        fetchProductData(selectedProductId);
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
                        <TextField label="Opening Balance" variant="standard" value={selectedProductData.openingBalance} aria-readonly />
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
                        <TextField label="Rate" variant="standard" value={selectedProductData.rate} aria-readonly />
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
                    <button className='savebtn'>Save</button>
                    <button className='savebtn' style={{ backgroundColor: 'green' }}>Export</button>
                </div>

                <div className='mt-5'>
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
                </div>

                <div className='container tableMaster mt-3 mb-3 p-0'>
                    <table className='table productTableMAster table-stripped'>
                        <thead className='tableheading'>
                            <tr>
                                <th style={{ width: "180px" }}>SrNo</th>
                                <th style={{ width: "180px" }}>Product</th>
                                <th style={{ width: "180px" }}>Opening Balance</th>
                                <th style={{ width: "180px" }}>Rate</th>
                                <th style={{ width: "180px" }}>Cream Milk</th>
                                <th style={{ width: "180px" }}>Add Qty</th>
                                <th style={{ width: "180px" }}>Mix</th>
                                <th style={{ width: "180px" }}>Payment Pending</th>
                                <th style={{ width: "180px" }}>Sahiwal Ghee</th>
                                <th style={{ width: "180px" }}>Waivee Off</th>
                                <th style={{ width: "180px" }}>Converted Product</th>
                                <th style={{ width: "180px" }}>Sale Cash</th>
                                <th style={{ width: "180px" }}>Sale Online</th>
                                <th style={{ width: "180px" }}>Cash Total</th>
                                <th style={{ width: "180px" }}>Online Total</th>
                                <th style={{ width: "180px" }}>Total Amt</th>
                                <th style={{ width: "180px" }}>Closing Balance</th>
                                <th style={{ width: "180px" }}>Pending</th>
                                <th style={{ width: "180px" }}>Remark</th>
                            </tr>
                        </thead>
                        <tbody className='border'>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductSale
import React, { useEffect, useState } from 'react'
import "./Product.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios'
import Form from 'react-bootstrap/Form';



const ProductSale = () => {
    const [age, setAge] = React.useState('');
    const [showtable, setshowtable] = useState(false)
    const [arrayy, setArrayy] = useState([])
    const [subarray, setSubArray] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({});
    const [openingBalance, setOpeningBalance] = useState('');
    const [rate, setRate] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        const selectedProduct = arrayy.find(product => product.productName === event.target.value);
        setSelectedProduct(selectedProduct);
    };

    useEffect(() => {
        axios.get("http://103.38.50.113:8080/DairyApplication/getAllProductEntryData")
            .then(response => {
                setArrayy(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setOpeningBalance(selectedProduct.openBalance);
            setRate(selectedProduct.rate);
        }
    }, [selectedProduct]);

    

    useEffect(() => {
        axios.get("http://103.38.50.113:8080/DairyApplication/getProduct", subarray)
            .then((response) => console.log(setSubArray((response.data))))
            .catch(err => console.log(err))
    }, [])


    return (
        <Form>
            <div className='mt-5 container '>

                <div className='pt-5'>
                    <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Product Sale</h3>
                </div>
                <div>
                    <div className='row mt-4'>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
                                <InputLabel id="demo-simple-select-standard-label">Products</InputLabel>


                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={age}
                                    onChange={handleChange}
                                    label="Age"
                                >
                                    {
                                        subarray.map((itemVal, ind)=>{
                                            return(
                                                <MenuItem value={itemVal}>{itemVal}</MenuItem>
                                            )
                                        })
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
                                <TextField label="Opening Balance" variant="standard" value={openingBalance} disabled/>
                            </Box>
                        </div>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                type="number"
                                autoComplete="off"
                            >
                                <TextField label="Rate" variant="standard"  value={rate} disabled/>
                            </Box>
                        </div>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                type="number"
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
                                type="number"
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
                                type="number"
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
                                type="number"
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
                                type="number"
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
                                type="number"
                                autoComplete="off"
                            >
                                <TextField label="Waive Off" variant="standard" />
                            </Box>
                        </div>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                type="number"
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
                                type="number"
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
                                type="number"
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
                                type="number"
                                autoComplete="off"
                            >
                                <TextField label="Cash Total" variant="standard" />
                            </Box>
                        </div>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                type="number"
                                autoComplete="off"
                            >
                                <TextField label="Online Total" variant="standard" />
                            </Box>
                        </div>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                type="number"
                                autoComplete="off"
                            >
                                <TextField label="Total Amount" variant="standard" />
                            </Box>
                        </div>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                type="number"
                                autoComplete="off"
                            >
                                <TextField label="Closing Balance" variant="standard" />
                            </Box>
                        </div>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                type="number"
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
                                type="number"
                                autoComplete="off"
                            >
                                <TextField label="Remark" variant="standard" />
                            </Box>
                        </div>
                        <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                            <button className='savebtn'>Save</button>
                            <button className='tabelbtn' onClick={() => setshowtable(!showtable)}>Show table</button>
                            <button className='savebtn' style={{ backgroundColor: 'green' }}>Export</button>
                        </div>
                        {
                            showtable ?
                                <div className='container tableMaster mt-5 mb-3 p-0'>
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
                                                <th style={{ width: "180px" }}>Waive Off</th>
                                                <th style={{ width: "180px" }}>Converted Product</th>
                                                <th style={{ width: "180px" }}>Sale Cash</th>
                                                <th style={{ width: "180px" }}>Sale Online</th>
                                                <th style={{ width: "180px" }}>Cash Total</th>
                                                <th style={{ width: "180px" }}>Online Total</th>
                                                <th style={{ width: "180px" }}>Total Amount</th>
                                                <th style={{ width: "180px" }}>Closing Balance</th>
                                                <th style={{ width: "180px" }}>Pending</th>
                                                <th style={{ width: "180px" }}>Remark</th>
                                                <th style={{ width: "180px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='border'>

                                            <tr>
                                                <th scope='row' className='text-center'>1</th>
                                                <td>
                                                    paneer
                                                </td>
                                                <td>2.3</td>
                                                <td>500</td>
                                                <td>2.3</td>
                                                <td>500</td>
                                                <td>2.3</td>
                                                <td>500</td>
                                                <td>2.3</td>
                                                <td>500</td>
                                                <td>2.3</td>
                                                <td>500</td>
                                                <td>2.3</td>
                                                <td>500</td>
                                                <td>2.3</td>
                                                <td>500</td>
                                                <td>2.3</td>
                                                <td>500</td>
                                                <td>200</td>
                                                <td>
                                                    <button className='btn'><FiEdit className='editicon' /></button>
                                                    <button className='btn'><MdDeleteOutline className='delicon' /></button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div> : null
                        }
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default ProductSale

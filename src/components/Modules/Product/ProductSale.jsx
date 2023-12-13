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



const ProductSale = () => {
    const [age, setAge] = React.useState('');
    const [showtable, setshowtable] = useState(false)
    const [arrayy, setArrayy] = useState([])
    const [subarray, setSubArray] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({});
    const [openBalance, setOpeningBalance] = useState('');
    const [rate, setRate] = useState('');

    const [creammilk, setCreamMilk] = useState('');
    const [addQty, setAddQty] = useState('');
    const [mix, setMix] = useState('');
    const [paymentPending, setPaymentPending] = useState('');
    const [sahiwalGhee, setSahiwalGhee] = useState('');
    const [waiveOff, setWaiveOff] = useState('');
    const [convertedProduct, setConvertedProduct] = useState('');
    const [saleCash, setSaleCash] = useState('');
    const [saleOnline, setSaleOnline] = useState('');
    const [cashTotal, setCashTotal] = useState('');
    const [onlineTotal, setOnlineTotal] = useState('');
    const [totalAmt, setTotalAmt] = useState('');
    const [closingBalance, setClosingBalance] = useState('');
    const [pending, setPending] = useState('');
    const [remark, setRemark] = useState('');

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
    },[setSubArray])

    const calculateCashTotal = () => {
        // Assuming rate and saleCash are numbers
        const calculatedCashTotal = parseFloat(rate) * parseFloat(saleCash);
        setCashTotal(isNaN(calculatedCashTotal) ? '' : calculatedCashTotal.toFixed(2));
    };



    const handleSave = async () =>{
        const postData = {
            product: age,
            openBalance: openBalance,
            creammilk:"",
            addQty:"",
            mix:"",
            paymentPending:"",
            sahiwalGhee:"",
            waiveOff:"",
            convertedProduct:"",
            saleCash:"",
            saleOnline:"",
            rate:rate,
            cashTotal:"",
            onlineTotal:"",
            totalAmt:"",
            closingBalance:"",
            pending:"",
            remark:""
        }

        await axios.post("http://103.38.50.113:8080/DairyApplication/saveProductAddSale", postData)
        .then(response=>{
            console.log("Data saved successfully:", response.data);
        })
        .catch(error => {
            console.error("Error saving data:", error);
        });
    }


    return (
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
                                <TextField label="Opening Balance" variant="standard" value={openBalance} aria-readonly/>
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
                                <TextField label="Rate" variant="standard"  value={rate} aria-readonly/>
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
                                <TextField label="Cream Milk" variant="standard" value={creammilk} onChange={(e) => setCreamMilk(e.target.value)}/>
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
                                <TextField label="Add Qty" variant="standard" value={addQty} onChange={(e) => setAddQty(e.target.value)}/>
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
                                <TextField label="Mix" variant="standard" value={mix} onChange={(e) => setMix(e.target.value)}/>
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
                                <TextField label="Payment Pending" variant="standard" value={paymentPending} onChange={(e) => setPaymentPending(e.target.value)}/>
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
                                <TextField label="Sahiwal Ghee" variant="standard"  value={sahiwalGhee} onChange={(e) => setSahiwalGhee(e.target.value)}/>
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
                                <TextField label="Waive Off" variant="standard" value={waiveOff} onChange={(e) => setWaiveOff(e.target.value)}/>
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
                                <TextField label="Convert Product" variant="standard" value={convertedProduct} onChange={(e) => setConvertedProduct(e.target.value)}/>
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
                                <TextField label="Sale Cash" variant="standard" value={saleCash} onChange={(e) => {setSaleCash(e.target.value); calculateCashTotal()}}/>
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
                                <TextField label="Sale Online" variant="standard" value={saleOnline} onChange={(e) => setSaleOnline(e.target.value)}/>
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
                                <TextField label="Cash Total" variant="standard" value={cashTotal} aria-readonly/>
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
                                <TextField label="Online Total" variant="standard" value={onlineTotal} onChange={(e) => setOnlineTotal(e.target.value)}/>
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
                                <TextField label="Total Amount" variant="standard" value={totalAmt} onChange={(e) => setTotalAmt(e.target.value)}/>
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
                                <TextField label="Closing Balance" variant="standard" value={closingBalance} onChange={(e) => setClosingBalance(e.target.value)}/>
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
                                <TextField label="Pending" variant="standard" value={pending} onChange={(e) => setPending(e.target.value)}/>
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
                                <TextField label="Remark" variant="standard" value={remark} onChange={(e) => setRemark(e.target.value)}/>
                            </Box>
                        </div>
                        <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                            <button className='savebtn' onClick={()=> handleSave()}>Save</button>
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
    )
}

export default ProductSale

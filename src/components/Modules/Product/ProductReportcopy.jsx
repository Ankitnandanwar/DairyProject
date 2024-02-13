import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./Product.css"
import axios from 'axios';
// import { MdDeleteOutline } from "react-icons/md";
import * as FileSaver from 'file-saver'
import * as XLSX from "xlsx";
import { Bars } from 'react-loader-spinner';



const ProductReport = () => {
    const [loader, setLoader] = useState(false)
    const [showData, setShowData] = useState([])
    const [data, setData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        fetchData();
    }, [fromDate, toDate]);

    const fetchData = async () => {
        try {
            const response = await fetch(`YOUR_API_ENDPOINT?from=${fromDate}&to=${toDate}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };


    return (
        <>
            {
                loader ? <div className='loader-Cont'>
                    <Bars
                        height="40"
                        width="80"
                        color="rgb(5, 165, 214)"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div> :

                    <div className='mt-5 container'>
                        <div className='pt-5'>
                            <h3 className='text-center mt-2' style={{ textDecoration: 'underline' }}>Product Report</h3>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-12 col-lg-6 col-xl-6 col-md-6 d-flex justify-content-center align-items-center'>
                                <label style={{ width: "100px", display: "inline-block" }}>From Date</label>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField variant="standard" type='date'value={fromDate} onChange={(e) => {
                                        handleFromDateChange()
                                    }} />
                                </Box>
                            </div>
                            <div className='col-12 col-lg-6 col-xl-6 col-md-6 d-flex justify-content-center align-items-center'>
                                <label style={{ width: "100px", display: "inline-block" }}>To Date</label>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField variant="standard" type='date' value={toDate} onChange={(e) => {
                                        handleToDateChange()
                                    }} />
                                </Box>
                            </div>

                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3'>
                                <FormControlLabel control={<Checkbox />} label="Daily" />
                            </div>
                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3'>
                                <FormControlLabel control={<Checkbox />} label="Monthly" />
                            </div>
                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3'>
                                <FormControlLabel control={<Checkbox />} label="Weekly" />
                            </div>
                            {/* <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3' style={{ gap: "1rem" }}>
                                <button className='btn btn-primary' onClick={() => { searchData() }}>Search</button>
                                <button className='btn btn-success' onClick={() => exportToExcel()}>Export</button>
                            </div> */}

                            <div className='container tableMaster mt-5 mb-3 p-0'>
                                <table className='table productTableMAster table-stripped'>
                                    <thead className='tableheading'>
                                        <tr>
                                            <th style={{ width: "100px" }}>SrNo</th>
                                            <th style={{ width: "250px" }}>Date</th>
                                            <th style={{ width: "250px" }}>Product</th>
                                            <th style={{ width: "150px" }}>Opening Balance</th>
                                            <th style={{ width: "150px" }}>Rate</th>
                                            <th style={{ width: "150px" }}>Cream Milk</th>
                                            <th style={{ width: "150px" }}>Add Qty</th>
                                            <th style={{ width: "150px" }}>Mix</th>
                                            <th style={{ width: "150px" }}>Payment Pending</th>
                                            <th style={{ width: "150px" }}>Sahiwal Ghee</th>
                                            <th style={{ width: "150px" }}>Waive Off</th>
                                            <th style={{ width: "150px" }}>Converted Product</th>
                                            <th style={{ width: "150px" }}>Sale Cash</th>
                                            <th style={{ width: "150px" }}>Sale Online</th>
                                            <th style={{ width: "150px" }}>Cash Total</th>
                                            <th style={{ width: "150px" }}>Online Total</th>
                                            <th style={{ width: "150px" }}>Total Amount</th>
                                            <th style={{ width: "150px" }}>Closing Balance</th>
                                            <th style={{ width: "150px" }}>Pending</th>
                                            <th style={{ width: "150px" }}>Remark</th>
                                            {/* <th style={{ width: "180px" }}>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, i) => (
                                                <tr key={i}>
                                                    <th scope='row' className='text-center'>{i + 1}</th>
                                                    <td className='text-center'>{item.date}</td>
                                                    <td className='text-center'>{item.product}</td>
                                                    <td className='text-center'>{item.openBalance}</td>
                                                    <td className='text-center'>{item.rate}</td>
                                                    <td className='text-center'>{item.creammilk}</td>
                                                    <td className='text-center'>{item.addQty}</td>
                                                    <td className='text-center'>{item.mix}</td>
                                                    <td className='text-center'>{item.paymentPending}</td>
                                                    <td className='text-center'>{item.sahiwalGhee}</td>
                                                    <td className='text-center'>{item.waiveOff}</td>
                                                    <td className='text-center'>{item.convertedProduct}</td>
                                                    <td className='text-center'>{item.saleCash}</td>
                                                    <td className='text-center'>{item.saleOnline}</td>
                                                    <td className='text-center'>{item.cashTotal}</td>
                                                    <td className='text-center'>{item.onlineTotal}</td>
                                                    <td className='text-center'>{item.totalAmt}</td>
                                                    <td className='text-center'>{item.closingBalance}</td>
                                                    <td className='text-center'>{item.pending}</td>
                                                    <td className='text-center'>{item.remark}</td>
                                                    {/* <td className='text-center'>
                                            <button className='btn'><MdDeleteOutline className='delicon' /></button>
                                        </td> */}
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* <div className='container tableMaster mt-5 mb-3 p-0'>
                                <div><h5 className='p-2' style={{ fontWeight: "600", textAlign: "center" }}>Grand Total</h5></div>
                                <div className='row m-2'>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Opening Balance</div>
                                        <div className='totalnos'>{totalOpeningBalance}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Amount</div>
                                        <div className='totalnos'>{totalAmont}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sale Cash</div>
                                        <div className='totalnos'>{totalSaleCash}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sale Online</div>
                                        <div className='totalnos'>{totalSaleOnline}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Closing Balance</div>
                                        <div className='totalnos'>{totalClosingBalance}</div>
                                    </div>
                                </div>
                            </div> */}


                        </div>
                    </div>
            }
        </>
    )
}

export default ProductReport
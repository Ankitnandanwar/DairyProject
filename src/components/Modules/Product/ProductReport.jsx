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
    const [products, setProducts] = useState([])
    const [dates, setdates] = useState({
        fdate: '',
        tdate: ''
    })

    const [totalOpeningBal, setTotalOpeningBal] = useState([])



    const getProductData = async () => {
        setLoader(true)
        try {
            let data = await axios.get("http://103.38.50.113:8080/DairyApplication/findAllProductDate").then((res) => {
                setProducts(res.data);
                setTimeout(() => {
                    setLoader(false)
                }, 1000);
            })
        } catch (error) {
            console.log(error, "server issue")
        }
    }


    const searchData = () => {
        console.log(dates, 'currdate')
        if (dates.fdate !== '' && dates.tdate !== '') {
            try {
                let dateObj = {
                    fDate: dates.fdate,
                    tDate: dates.tdate
                }
                console.log(dateObj, 'change date')
                axios.post('http://103.38.50.113:8080/DairyApplication/findProductDataByDateBetween', dateObj).then((data) => {
                    if (data.data.data.length > 0) {
                        setProducts(data.data.data)
                        console.log(data.data.totals)
                        setTotalOpeningBal(data.data.totals)
                    } else {
                        console.log('no data found')
                    }

                }).catch((e) => {
                    console.log('error=>', e)
                })

            } catch (e) {
                console.log(e)
            }
        } else {
            getProductData()
        }
    }


    useEffect(() => {
        getProductData()
    }, [])


    // Export to excel code
    const exportToExcel = async () => {
        const fileName = "Product Report";
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        // Combine data for the main table and the summary table
        const exportData = [
            {
                "Total Opening Balance": totalOpeningBal.totalOpenBalance,
                "Total Amount": totalOpeningBal.totalAmount,
                "Total Sale Cash": totalOpeningBal.saleCash,
                "Total Sale Online": totalOpeningBal.saleOnline,
                "Total Closing Balance": totalOpeningBal.totalClosingBalance,
            },
        ];

        const ws = XLSX.utils.json_to_sheet(products);
        const totalsws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Table Data");
        XLSX.utils.book_append_sheet(wb, totalsws, "Totals");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
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
                                    <TextField variant="standard" type='date' onChange={(e) => {
                                        setdates({
                                            ...dates,
                                            fdate: e.target.value
                                        })
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
                                    <TextField variant="standard" type='date' onChange={(e) => {
                                        setdates({
                                            ...dates,
                                            tdate: e.target.value
                                        })
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
                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3' style={{ gap: "1rem" }}>
                                <button disabled={dates.fdate === '' && dates.tdate === ''} className='btn btn-primary' onClick={() => searchData()}>Search</button>
                                <button className='btn btn-success' onClick={()=>exportToExcel()}>Export</button>
                            </div>

                            <div className='container tableMaster mt-5 mb-3 p-0'>
                                <table className='table productTableMAster table-stripped'>
                                    <thead className='tableheading'>
                                        <tr>
                                            {/* <th style={{ width: "100px" }}>SrNo</th> */}
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
                                            products.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        {/* <th scope='row' className='text-center'>{i+1}</th> */}
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
                                                )

                                            }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='container tableMaster mt-5 mb-3 p-0'>
                                <div><h5 className='p-2' style={{ fontWeight: "600", textAlign: "center" }}>Grand Total</h5></div>
                                <div className='row m-2'>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Opening Balance</div>
                                        <div className='totalnos'>{totalOpeningBal.totalOpenBalance}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Amount</div>
                                        <div className='totalnos'>{totalOpeningBal.totalAmount}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sale Cash</div>
                                        <div className='totalnos'>{totalOpeningBal.saleCash}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sale Online</div>
                                        <div className='totalnos'>{totalOpeningBal.saleOnline}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Closing Balance</div>
                                        <div className='totalnos'>{totalOpeningBal.totalClosingBalance}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default ProductReport
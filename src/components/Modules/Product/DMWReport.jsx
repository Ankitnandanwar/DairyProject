import React, { useState, useEffect } from 'react'
import "./Product.css"
import axios from 'axios'
import { Bars } from 'react-loader-spinner';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MilkSale = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(true)
    const [hide, sethide] = React.useState(false)
    const [dates, setdates] = useState({
        fdate: '',
        tdate: ''
    })

    const formatDate = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        return `${day}/${month}/${year}`;
    };
                        
    const getProductData = async () => {
        setLoader(true)
        try {
            let data = await axios.get("http://103.38.50.113:8080/DairyApplication/getAllDailyData").then((res) => {
                setProducts(res.data)
                setTimeout(() => {
                    setLoader(false)
                }, 1000);
            })
        } catch (error) {
            console.log(error, "server issue")
        }
    }

    const getTotalsData = async () => {
        setLoader(true);
        try {
            const response = await axios.post(
                'http://103.38.50.113:8080/DairyApplication/calculateTotals',
                {
                    startDate: dates.fdate,
                    endDate: dates.tdate,
                }
            );

            console.log(response.data)
            setTimeout(() => {
                setLoader(false);
            }, 1000);
        } catch (error) {
            console.log(error, 'server issue');
        }
    };

    const searchData = () => {
        console.log(dates, 'dates shdjsdjs')
        if (dates.fdate !== '' && dates.tdate !== '') {
            try {
                let dateObj = {
                    startDate: dates.fdate,
                    endDate: dates.tdate
                }
                console.log(dateObj, 'sdshdhsd')
                axios.post('http://103.38.50.113:8080/DairyApplication/calculateTotals', dateObj).then((data) => {
                    if (data.data?.length > 0) {
                        setProducts(data?.data)
                        sethide(true)
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
        getTotalsData()
    }

    useEffect(() => {
        getProductData();
    }, [])

    return (

        <>

            {
                loader ?
                    <div className='loader-Cont'>
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
                    <div className='pt-5'>

                        <h3 className='mt-5 text-center' style={{ textDecoration: 'underline' }}>DMW REPORT</h3>

                        <div className='row mt-4 mb-4'>
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
                                        const selectDate = e.target.value;
                                        const formattedDate = formatDate(selectDate)
                                        setdates({
                                            ...dates,
                                            fdate: formattedDate
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
                                        const selectDate = e.target.value;
                                        const formattedDate = formatDate(selectDate)
                                        setdates({
                                            ...dates,
                                            tdate: formattedDate
                                        })
                                    }} />
                                </Box>
                            </div>

                            <div className='col-12 col-lg-12 col-xl-12 col-md-12 d-flex justify-content-center align-items-center mt-3' style={{ gap: "1rem" }}>
                                <button disabled={dates.fdate === '' && dates.tdate === ''} className='btn btn-primary' onClick={() => searchData()}>Search</button>
                            </div>
                        </div>

                        <div className='container tableMaster2 p-0' style={{ height: "55vh" }}>
                            <table className="table productTableMAster table-stripped">
                                <thead className='tableheading'>
                                    <tr>
                                        <th style={{ width: "100px" }} rowspan="2">Sr.no</th>
                                        <th style={{ width: "100px" }} rowspan="2">Date</th>
                                        <th style={{ width: "200px" }} rowspan="2">Name of Products</th>
                                        <th style={{ width: "100px" }} rowspan="2">GST (%)</th>
                                        <th style={{ width: "100px" }} rowspan="2">Rate</th>
                                        {/* {
                                            hide ? null :
                                            <>
                                                
                                            </>
                                        } */}
                                        <th style={{ width: "100px" }} rowspan="2">GST Amt</th>
                                                <th style={{ width: "100px" }} rowspan="2">CGST</th>
                                                <th style={{ width: "100px" }} rowspan="2">SGST</th>
                                        <th style={{ width: "150px" }} rowspan="2">Product Rate</th>
                                        <th style={{ width: "400px", border: '2px solid white' }} colSpan={4}>Plant Sale (EDP)</th>
                                        <th style={{ width: "400px", border: '1px solid white' }} colSpan={4}>Milk Parlour</th>
                                        <th style={{ width: "400px", border: '1px solid white' }} colSpan={4}>Admin Block Canteen</th>
                                        <th style={{ width: "400px", border: '1px solid white' }} colSpan={4}>E-Rikshaw</th>
                                        <th style={{ width: "400px", border: '1px solid white' }} colSpan={4}>Tata Yodha</th>
                                        <th style={{ width: "400px", border: '1px solid white' }} colSpan={4}>Concession 5% Only</th>
                                        <th style={{ width: "400px", border: '1px solid white' }} colSpan={4}>Concession 10% Only</th>
                                        <th style={{ width: "400px", border: '1px solid white' }} colSpan={4}>Concession 40% Only</th>
                                        <th style={{ width: "150px" }} rowspan="2">Total Cash Sale</th>
                                        <th style={{ width: "150px" }} rowspan="2">Total Online Sale</th>
                                        <th style={{ width: "150px" }} rowspan="2">Total Sale</th>
                                        <th style={{ width: "150px" }} rowspan="2">Total Amount Cash</th>
                                        <th style={{ width: "150px" }} rowspan="2">Total Amount Online</th>
                                        <th style={{ width: "150px" }} rowspan="2">Grand Total</th>
                                    </tr>
                                    <tr>
                                        <th style={{ border: '1px solid white', width: "100px", position: "sticky", top: "13.5%" }}>Cash</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Online</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Cash</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Online</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Cash</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Online</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Cash</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Online</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Cash</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Online</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Cash</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Online</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Cash</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Online</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Cash</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Online</th>
                                        <th style={{ border: '1px solid white', position: "sticky", top: "13.5%" }}>Amt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((item, i) => {
                                            return (
                                                <tr>
                                                    <td style={{fontWeight: 600}}>{i+1}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.product}</td>
                                                    <td>{item.gst}</td>
                                                    <td>{item.rate}</td>
                                                    <td>{item.gstAmount}</td>
                                                    <td>{item.cgst}</td>
                                                    <td>{item.sgst}</td>
                                                   {/* {
                                                    hide?
                                                    null:
                                                    <><td>{item.gstAmount}</td><td>{item.cgst}</td><td>{item.sgst}</td></>
                                                   }  */}
                                                    <td>{item.productRate}</td>
                                                    <td>{item.plantCash}</td>
                                                    <td>{item.plantCashAmount}</td>
                                                    <td>{item.plantOnline}</td>
                                                    <td>{item.plantOnlineAmount}</td>
                                                    <td>{item.parlourCash}</td>
                                                    <td>{item.parlourCashAmount}</td>
                                                    <td>{item.parlourOnline}</td>
                                                    <td>{item.parlourOnlineAmount}</td>
                                                    <td>{item.adminCash}</td>
                                                    <td>{item.adminCashAmount}</td>
                                                    <td>{item.adminOnline}</td>
                                                    <td>{item.adminOnlineAmount}</td>
                                                    <td>{item.eCash}</td>
                                                    <td>{item.eCashAmount}</td>
                                                    <td>{item.eOnline}</td>
                                                    <td>{item.eOnlineAmount}</td>
                                                    <td>{item.yodhaCash}</td>
                                                    <td>{item.yodhaCashAmount}</td>
                                                    <td>{item.yodhaOnline}</td>
                                                    <td>{item.yodhaOnlineAmount}</td>
                                                    <td>{item.c5Cash}</td>
                                                    <td>{item.c5CashAmount}</td>
                                                    <td>{item.c5Online}</td>
                                                    <td>{item.c5OnlineAmount}</td>
                                                    <td>{item.c10Cash}</td>
                                                    <td>{item.c10CashAmount}</td>
                                                    <td>{item.c10Online}</td>
                                                    <td>{item.c10OnlineAmount}</td>
                                                    <td>{item.c40Cash}</td>
                                                    <td>{item.c40CashAmount}</td>
                                                    <td>{item.c40Online}</td>
                                                    <td>{item.c40OnlineAmount}</td>
                                                    <td>{item.totalCashSale}</td>
                                                    <td>{item.totalOnlineSale}</td>
                                                    <td>{item.totalSale}</td>
                                                    <td>{item.totalAmountCash}</td>
                                                    <td>{item.totalAmountOnline}</td>
                                                    <td>{item.grandTotal}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }

        </>
    )
}

export default MilkSale;
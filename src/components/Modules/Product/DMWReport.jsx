import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import * as XLSX from 'xlsx';
import "./Product.css";

const MilkSale = () => {
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(true)
    const [dates, setdates] = useState({
        fdate: '',
        tdate: ''
    })

    const [allTotals, setAllTotals] = useState([])

    const formatDate = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        return `${day}/${month}/${year}`;
    };
                        
    const getProductData = async () => {
        setLoader(true)
        try {
             await axios.get("http://103.14.99.198:8082/DairyApplication/getAllDailyData").then((res) => {
                setProducts(res.data)
                // console.log(res.data)
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
                'http://103.14.99.198:8082/DairyApplication/calculateTotals',
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
                axios.post('http://103.14.99.198:8082/DairyApplication/calculateTotals', dateObj).then((data) => {
                    if (data.data.data.length > 0) {
                        setProducts(data.data.data)
                        // console.log("Cal Amt",data.data.totals)
                        setAllTotals(data.data.totals)
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

    const exportToExcel = async () => {
        const fileName = "DMW Report";
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        const exportData = [
            {
                "Total GST Amount": allTotals.totalGSTAmount,
                "Total Cash Sale" : allTotals.totalCashSale,
                "Total Amount Cash": allTotals.totalAmountCash,
                "Total Online Sale": allTotals.totalOnlineSale,
                "Total Amount Online": allTotals.totalAmountOnline,
                "Total Sale": allTotals.totalSale,
                "Grand Total": allTotals.grandTotal
            }
        ]

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
                                <button className='btn btn-success' onClick={()=>exportToExcel()}>Export To Excel</button>
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
                        <div className='container tableMaster mt-5 mb-3 p-0'>
                                <div><h5 className='p-2' style={{ fontWeight: "600", textAlign: "center" }}>Grand Total</h5></div>
                                <div className='row m-2'>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total GST Amount</div>
                                        <div className='totalnos'>{allTotals.totalGSTAmount}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Sale</div>
                                        <div className='totalnos'>{allTotals.totalCashSale}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Amount Cash</div>
                                        <div className='totalnos'>{allTotals.totalAmountCash}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Sale</div>
                                        <div className='totalnos'>{allTotals.totalOnlineSale}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Amount Online</div>
                                        <div className='totalnos'>{allTotals.totalAmountOnline}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sale</div>
                                        <div className='totalnos'>{allTotals.totalSale}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Grand Total</div>
                                        <div className='totalnos'>{allTotals.grandTotal}</div>
                                    </div>
                                </div>
                            </div>
                    </div>
            }

        </>
    )
}

export default MilkSale;
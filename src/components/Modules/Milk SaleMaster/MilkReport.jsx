import React, { useEffect, useState } from 'react'
import "../Product/Product.css"
import "./Milk.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as FileSaver from 'file-saver'
import * as XLSX from "xlsx";
import { Bars } from 'react-loader-spinner';

const MilkReport = () => {
    const [loader, setLoader] = useState(false)
    const [products, setProducts] = useState([])
    const [dates, setdates] = useState({
        fdate: '',
        tdate: ''
    })


    const [totals, setTotals] = useState([])

    const getProductData = async () => {
        setLoader(true)
        try {
            await axios.get("http://103.38.50.113:8080/DairyApplication/getAllMilkSale").then((res) => {
                setProducts(res.data);
                setTimeout(() => {
                    setLoader(false)
                }, 1000);
            })
        } catch (error) {
            console.log(error, "server issue")
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    const searchData = () => {
        console.log(dates, "jhzgcsyugc")
        if (dates.fdate !== '' && dates.tdate !== '') {
            try {
                let dateObj = {
                    fDate: dates.fdate,
                    tDtae: dates.tdate
                }
                console.log(dateObj)
                axios.post('http://103.38.50.113:8080/DairyApplication/findSaleByDate', dateObj).then((data) => {
                    if (data.data.data.length > 0) {
                        setProducts(data.data.data)
                        console.log(data.data.data)
                        setTotals(data.data.totalS)
                    } else {
                        console.log("data not found")
                    }
                }).catch((e) => {
                    console.log('error=>', e)
                })
            } catch (e) {

                console.log("err")
            }
        } else {
            getProductData()
        }
    }


    const exportToExcel = async () => {
        const fileName = "Milk Report";
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        const exportData = [
            {
                "Total Production" : totals.totalproduction,
                "Total DTM Online" :totals.totaldtmOnline,
                "Total Milk Received" :totals.totalmilkReceived,
                "Total HNo13" :totals.totalhNo13, 
                "Total Sahiwal Milk" :totals.totalsahiwalMilk,
                "Total HLoss" :totals.totalhLoss,
                "Total Goat Milk Received" :totals.totalgoatMilkReceived,
                "Total Girls Hostel" :totals.totalgirlsHostel,
                "Total Research" :totals.totalresearch,
                "Total CashSale Amt" :totals.totalcashSaleAmt,
                "Total Goat Milk Mixed" :totals.totalgoatMilkMixed,
                "Total Quantity" :totals.totalQuantity,
                "Total Standard Milk Cash" :totals.totalstandardMilkCash,
                "Total Cream" :totals.totalcream,
                "Total ParkerH" :totals.totalparkerH,
                "Total Standard Milk Online" :totals.totalstandardMilkOnline,
                "Total Grewal Hotel" :totals.totalgrewalHotel,
                "Total Cash Amt" :totals.totalcashAmt,
                "Total Online Sale" :totals.totalonlineSale,
                "Total Online Amt DTM" :totals.totalonlineAmtDTM,
                "Total Cash Amt DTM" :totals.totalcashAmtDTM,
                "Total Total DTM" :totals.totaltotalDTM,
                "Total Dtm Cash" :totals.totaldtmCash,
                "Total Online Sale Amt" :totals.totalonlineSaleAmt,
                "Total HNo8" :totals.totalhNo8,
                "Total Cash Sale" :totals.totalcashSale,
                "Total Online Amt STD" :totals.totalonlineAmtSTD,
                "Total Cash Amt STD" :totals.totalcashAmtSTD,
                "Total Sahiwal Cream" :totals.totalsahiwalCream,
                "Total Standard Milk" :totals.totaltotalStandardMilk,

            }
        ]

        // Convert table data to worksheet
        const tableWs = XLSX.utils.json_to_sheet(products);

        // Convert totals data to worksheet
        const totalsWs = XLSX.utils.json_to_sheet(exportData);

        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Add worksheets to the workbook
        XLSX.utils.book_append_sheet(wb, tableWs, "Table Data");
        XLSX.utils.book_append_sheet(wb, totalsWs, "Totals");

        // Save the workbook as a blob
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });

        // Save the blob as a file
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
                            <h3 className='text-center mt-2' style={{ textDecoration: 'underline' }}>Milk Report</h3>
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

                            {/* <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3'>
                                <FormControlLabel control={<Checkbox />} label="Daily" />
                            </div>
                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3'>
                                <FormControlLabel control={<Checkbox />} label="Monthly" />
                            </div>
                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3'>
                                <FormControlLabel control={<Checkbox />} label="Weekly" />
                            </div> */}
                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center mt-3' style={{ gap: "1rem" }}>
                                <button disabled={dates.fdate === '' && dates.tdate === ''} className='btn btn-primary' onClick={() => searchData()}>Search</button>
                                <button className='btn btn-success' onClick={() => exportToExcel()}>Export</button>
                            </div>

                            <div className='container tableMaster mt-5 mb-3 p-0'>
                                <table className='table productTableMAster table-stripped'>
                                    <thead className='tableheading'>
                                        <tr>
                                            <th style={{ width: "100px" }}>SrNo</th>
                                            <th style={{ width: "250px" }}>Date</th>
                                            <th style={{ width: "150px" }}>Opening Balance</th>
                                            <th style={{ width: "150px" }}>Closing Balance</th>
                                            <th style={{ width: "150px" }}>Milk Received</th>
                                            <th style={{ width: "150px" }}>Sahiwal Milk</th>
                                            <th style={{ width: "150px" }}>Goat Milk Received</th>
                                            <th style={{ width: "150px" }}>Goat Milk Mixed</th>
                                            <th style={{ width: "150px" }}>Total Quantity</th>
                                            <th style={{ width: "150px" }}>Production</th>
                                            <th style={{ width: "150px" }}>Girls Hostel</th>
                                            <th style={{ width: "150px" }}>HNo 8</th>
                                            <th style={{ width: "150px" }}>ParkerH</th>
                                            <th style={{ width: "150px" }}>DTM Cash</th>
                                            <th style={{ width: "150px" }}>DTM Online</th>
                                            <th style={{ width: "150px" }}>Total DTM</th>
                                            <th style={{ width: "150px" }}>Cash Amt DTM</th>
                                            <th style={{ width: "150px" }}>Online Amt DTM</th>
                                            <th style={{ width: "150px" }}>Standard Milk Cash</th>
                                            <th style={{ width: "150px" }}>Standard Milk Online</th>
                                            <th style={{ width: "150px" }}>HNo 13</th>
                                            <th style={{ width: "150px" }}>Grewal Hotel</th>
                                            <th style={{ width: "150px" }}>Cash Sale</th>
                                            <th style={{ width: "150px" }}>Online Sale</th>
                                            <th style={{ width: "150px" }}>Total Standard Milk</th>
                                            <th style={{ width: "150px" }}>Cash Amt STD</th>
                                            <th style={{ width: "150px" }}>Online Amt STD</th>
                                            <th style={{ width: "150px" }}>Cash Sale Amt</th>
                                            <th style={{ width: "150px" }}>Online Sale Amt</th>
                                            <th style={{ width: "150px" }}>Cash Amt</th>
                                            <th style={{ width: "150px" }}>Cream</th>
                                            <th style={{ width: "150px" }}>Sahiwal Cream</th>
                                            <th style={{ width: "150px" }}>Research</th>
                                            <th style={{ width: "150px" }}>H Loss</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <th scope='row' className='text-center'>{i + 1}</th>
                                                        <td className='text-center'>{item.date}</td>
                                                        <td className='text-center'>{item.openingBalance}</td>
                                                        <td className='text-center'>{item.closingBalance}</td>
                                                        <td className='text-center'>{item.milkReceived}</td>
                                                        <td className='text-center'>{item.sahiwalMilk}</td>
                                                        <td className='text-center'>{item.goatMilkReceived}</td>
                                                        <td className='text-center'>{item.goatMilkMixed}</td>
                                                        <td className='text-center'>{item.totalQuantity}</td>
                                                        <td className='text-center'>{item.production}</td>
                                                        <td className='text-center'>{item.girlsHostel}</td>
                                                        <td className='text-center'>{item.hNo8}</td>
                                                        <td className='text-center'>{item.parkerH}</td>
                                                        <td className='text-center'>{item.dtmCash}</td>
                                                        <td className=
                                                        'text-center'>{item.dtmOnline}</td>
                                                        <td className='text-center'>{item.totalDTM}</td>
                                                        <td className='text-center'>{item.cashAmtDTM}</td>
                                                        <td className='text-center'>{item.onlineAmtDTM}</td>
                                                        <td className='text-center'>{item.standardMilkCash}</td>
                                                        <td className='text-center'>{item.standardMilkOnline}</td>
                                                        <td className='text-center'>{item.hNo13}</td>
                                                        <td className='text-center'>{item.grewalHotel}</td>
                                                        <td className='text-center'>{item.cashSale}</td>
                                                        <td className='text-center'>{item.onlineSale}</td>
                                                        <td className='text-center'>{item.totalStandardMilk}</td>
                                                        <td className='text-center'>{item.cashAmtSTD}</td>
                                                        <td className='text-center'>{item.onlineAmtSTD}</td>
                                                        <td className='text-center'>{item.cashSaleAmt}</td>
                                                        <td className='text-center'>{item.onlineSaleAmt}</td>
                                                        <td className='text-center'>{item.cashAmt}</td>
                                                        <td className='text-center'>{item.cream}</td>
                                                        <td className='text-center'>{item.sahiwalCream}</td>
                                                        <td className='text-center'>{item.research}</td>
                                                        <td className='text-center'>{item.hLoss}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className='container tableMaster mt-5 mb-3 p-0' style={{ height: "55vh" }}>
                                <div><h5 className='p-2' style={{ fontWeight: "600", textAlign: "center" }}>Grand Total</h5></div>
                                <div className='row m-2'>
                                     <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Production</div>
                                        <div className='totalnos'>{totals.totalproduction}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total DTM Online</div>
                                        <div className="totalnos">{totals.totaldtmOnline}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Milk Received</div>
                                        <div className="totalnos">{totals.totalmilkReceived}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total HNo 13</div>
                                        <div className="totalnos">{totals.totalhNo13}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sahiwal Milk</div>
                                        <div className="totalnos">{totals.totalsahiwalMilk}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total H Loss</div>
                                        <div className="totalnos">{totals.totalhLoss}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Goat Milk Received</div>
                                        <div className="totalnos">{totals.totalgoatMilkReceived}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Girls Hostel</div>
                                        <div className="totalnos">{totals.totalgirlsHostel}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Research</div>
                                        <div className="totalnos">{totals.totalresearch}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Sale Amt</div>
                                        <div className="totalnos">{totals.totalcashSaleAmt}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Goat Milk Mixed</div>
                                        <div className="totalnos">{totals.totalgoatMilkMixed}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Quantity</div>
                                        <div className="totalnos">{totals.totalQuantity}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Standard Milk Cash</div>
                                        <div className="totalnos">{totals.totalstandardMilkCash}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cream</div>
                                        <div className="totalnos">{totals.totalcream}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total ParkerH</div>
                                        <div className="totalnos">{totals.totalparkerH}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Standard Milk Online</div>
                                        <div className="totalnos">{totals.totalstandardMilkOnline}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Grewal Hotel</div>
                                        <div className="totalnos">{totals.totalgrewalHotel}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Amt</div>
                                        <div className="totalnos">{totals.totalcashAmt}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Sale</div>
                                        <div className="totalnos">{totals.totalonlineSale}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Amt DTM</div>
                                        <div className="totalnos">{totals.totalonlineAmtDTM}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Amt DTM</div>
                                        <div className="totalnos">{totals.totalcashAmtDTM}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total DTM</div>
                                        <div className="totalnos">{totals.totaltotalDTM}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Sale Amt</div>
                                        <div className="totalnos">{totals.totalonlineSaleAmt}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total HNo 8</div>
                                        <div className="totalnos">{totals.totalhNo8}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Sale</div>
                                        <div className="totalnos">{totals.totalcashSale}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Amt STD</div>
                                        <div className="totalnos">{totals.totalonlineAmtSTD}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Amt STD</div>
                                        <div className="totalnos">{totals.totalcashAmtSTD}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sahiwal Cream</div>
                                        <div className="totalnos">{totals.totalsahiwalCream}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Standard Milk</div>
                                        <div className="totalnos">{totals.totaltotalStandardMilk}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default MilkReport
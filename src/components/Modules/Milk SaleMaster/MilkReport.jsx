import React, { useEffect, useState } from 'react'
import "../Product/Product.css"
import "./Milk.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import * as FileSaver from 'file-saver'
import * as XLSX from "xlsx";
import { Bars } from 'react-loader-spinner';

const MilkReport = () => {
    const [loader, setLoader] = useState(false)
    const [showData, setShowData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [dates, setdates] = useState({
        fdate: '',
        tdate: ''
    })


    const formatDate = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        return `${day}/${month}/${year}`;
    };


    useEffect(() => {
        const fetchReportData = async () => {
            setLoader(true)
            try {
                let data = await axios.get("http://103.38.50.113:8080/DairyApplication/findSaleByDate").then((res) => {
                    setShowData(res.data.data)
                    setFilteredData(res.data.data)
                    setTimeout(() => {
                        setLoader(false)
                    }, 1000);
                })

            } catch (error) {
                console.log(error, "server issue")
            }
        }

        fetchReportData()
    }, [])


    const searchMilkData = () => {
        const filteredData = showData.filter((da) => {
            if (da.date >= dates.fdate && da.date <= dates.tdate) {
                return true
            }
            return false
        })
        console.log(filteredData)
        setFilteredData(filteredData)
    }


    // Calculation of Totals of Milk Report
    const calculateTotal = (field) => {
        return filteredData.reduce((total, item) => {
            const fieldValue = Number(item[field]) || 0;
            return total + fieldValue;
        }, 0);
    };


    const exportToExcel = async () => {
        const fileName = "Milk Report";
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        // Convert table data to worksheet
        const tableWs = XLSX.utils.json_to_sheet(filteredData);

        // Convert totals data to worksheet
        const totalsWs = XLSX.utils.json_to_sheet([
            { totals: "Total Production", value: calculateTotal("production") },
            { totals: "Total DTM Online", value: calculateTotal("dtmOnline") },
            { totals: "Total Milk Received", value: calculateTotal("milkReceived") },
            { totals: "Total HNo 13", value: calculateTotal("hNo8") },
            { totals: "Total Sahiwal Milk", value: calculateTotal("hNo8") },
            { totals: "Total HNo 13", value: calculateTotal("sahiwalMilk") },
            { totals: "Total H Loss", value: calculateTotal("hLoss") },
            { totals: "Total Goat Milk Received", value: calculateTotal("goatMilkReceived") },
            { totals: "Total Girls Hostel", value: calculateTotal("girlsHostel") },
            { totals: "Total Research", value: calculateTotal("research") },
            { totals: "Total Cash Sale Amt", value: calculateTotal("cashSaleAmt") },
            { totals: "Total Goat Milk Mixed", value: calculateTotal("goatMilkMixed") },
            { totals: "Total Quantity", value: calculateTotal("totalQuantity") },
            { totals: "Total Standard Milk Cash", value: calculateTotal("totalStandardMilk") },
            { totals: "Total Cream", value: calculateTotal("cream") },
            { totals: "Total ParkerH", value: calculateTotal("parkerH") },
            { totals: "Total Standard Milk Online", value: calculateTotal("standardMilkOnline") },
            { totals: "Total Grewal Hotel", value: calculateTotal("grewalHotel") },
            { totals: "Total Cash Amt", value: calculateTotal("cashAmt") },
            { totals: "Total Online Sale", value: calculateTotal("onlineSale") },
            { totals: "Total Online Amt DTM", value: calculateTotal("onlineAmtDTM") },
            { totals: "Total Cash Amt DTM", value: calculateTotal("cashAmtDTM") },
            { totals: "Total DTM", value: calculateTotal("totalDTM") },
            { totals: "Total Online Sale Amt", value: calculateTotal("onlineSaleAmt") },
            { totals: "Total HNo 8", value: calculateTotal("hNo8") },
            { totals: "Total Cash Sale", value: calculateTotal("cashSale") },
            { totals: "Total Online Amt STD", value: calculateTotal("onlineAmtSTD") },
            { totals: "Total Cash Amt STD", value: calculateTotal("cashAmtSTD") },
            { totals: "Total Sahiwal Cream", value: calculateTotal("sahiwalCream") },
            { totals: "Total Standard Milk", value: calculateTotal("totalStandardMilk") },
        ]);

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
                                        const selectedDate = e.target.value;
                                        const formattedDate = formatDate(selectedDate);
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
                                        const selectedDate = e.target.value;
                                        const formattedDate = formatDate(selectedDate);
                                        setdates({
                                            ...dates,
                                            tdate: formattedDate
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
                                <button className='btn btn-primary' onClick={() => { searchMilkData() }}>Search</button>
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
                                            filteredData.map((item, i) => (
                                                <tr key={i}>
                                                    <th scope='row' className='text-center'>{item.id}</th>
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
                                                    <td className='text-center'>{item.dtmOnline}</td>
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
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className='container tableMaster mt-5 mb-3 p-0' style={{ height: "55vh" }}>
                                <div><h5 className='p-2' style={{ fontWeight: "600", textAlign: "center" }}>Grand Total</h5></div>
                                <div className='row m-2'>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Production</div>
                                        <div className='totalnos'>{calculateTotal("production")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total DTM Online</div>
                                        <div className="totalnos">{calculateTotal("dtmOnline")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Milk Received</div>
                                        <div className="totalnos">{calculateTotal("milkReceived")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total HNo 13</div>
                                        <div className="totalnos">{calculateTotal("hNo13")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sahiwal Milk</div>
                                        <div className="totalnos">{calculateTotal("sahiwalMilk")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total H Loss</div>
                                        <div className="totalnos">{calculateTotal("hLoss")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Goat Milk Received</div>
                                        <div className="totalnos">{calculateTotal("goatMilkReceived")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Girls Hostel</div>
                                        <div className="totalnos">{calculateTotal("girlsHostel")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Research</div>
                                        <div className="totalnos">{calculateTotal("research")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Sale Amt</div>
                                        <div className="totalnos">{calculateTotal("cashSaleAmt")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Goat Milk Mixed</div>
                                        <div className="totalnos">{calculateTotal("goatMilkMixed")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Quantity</div>
                                        <div className="totalnos">{calculateTotal("totalQuantity")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Standard Milk Cash</div>
                                        <div className="totalnos">{calculateTotal("totalStandardMilk")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cream</div>
                                        <div className="totalnos">{calculateTotal("cream")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total ParkerH</div>
                                        <div className="totalnos">{calculateTotal("parkerH")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Standard Milk Online</div>
                                        <div className="totalnos">{calculateTotal("standardMilkOnline")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Grewal Hotel</div>
                                        <div className="totalnos">{calculateTotal("grewalHotel")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Amt</div>
                                        <div className="totalnos">{calculateTotal("cashAmt")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Sale</div>
                                        <div className="totalnos">{calculateTotal("onlineSale")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Amt DTM</div>
                                        <div className="totalnos">{calculateTotal("onlineAmtDTM")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Amt DTM</div>
                                        <div className="totalnos">{calculateTotal("cashAmtDTM")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total DTM</div>
                                        <div className="totalnos">{calculateTotal("totalDTM")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Sale Amt</div>
                                        <div className="totalnos">{calculateTotal("onlineSaleAmt")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total HNo 8</div>
                                        <div className="totalnos">{calculateTotal("hNo8")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Sale</div>
                                        <div className="totalnos">{calculateTotal("cashSale")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Online Amt STD</div>
                                        <div className="totalnos">{calculateTotal("onlineAmtSTD")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Cash Amt STD</div>
                                        <div className="totalnos">{calculateTotal("cashAmtSTD")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Sahiwal Cream</div>
                                        <div className="totalnos">{calculateTotal("sahiwalCream")}</div>
                                    </div>
                                    <div className='border border-dark col-12 col-lg-3 col-xl-3 col-md-4 d-flex p-2'>
                                        <div className='totalstitle'>Total Standard Milk</div>
                                        <div className="totalnos">{calculateTotal("totalStandardMilk")}</div>
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
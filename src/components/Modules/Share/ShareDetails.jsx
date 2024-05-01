import React, { useState, useEffect } from 'react'
import "../Product/Product.css"
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Bars } from 'react-loader-spinner';


const ShareDetails = () => {
    const [loader, setLoader] = useState(true)
    const [date, setCurrentDate] = useState("")
    const [codstrvne5liter, setCodstrvne5liter] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const [qltyofMilkrecev, setQltyofMilkrecev] = useState("")
    const [rateperLiter, setRateperLiter] = useState("")
    const [tolpaytodlf55liter, setTolpaytodlf55liter] = useState("")
    const [remark, setRemark] = useState("")

    const [prodTableData, setProdTableData] = useState([])

    // to fetch current date 
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSave = async () => {
        try {
            const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveShareDetails", {
                date,
                codstrvne5liter,
                paymentStatus,
                qltyofMilkrecev,
                rateperLiter,
                tolpaytodlf55liter,
                remark,
            });
            console.log(res.data);
            toast.success("Data Saved Successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.log(error);
        }
    }

    const getProductData = async () => {
        setLoader(true)
        try {
            await axios.get("http://103.38.50.113:8080/DairyApplication/getAllsharedetails").then((res) => {
                setProdTableData(res.data)
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
        setCurrentDate(getCurrentDate())
    }, [])


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
                    <ToastContainer position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light">
                    </ToastContainer>
                    <div className='pt-5'>
                        <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Share Details</h3>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                autoComplete="off"
                            >
                                <TextField variant="standard" type='date' value={date} onChange={(e) => setCurrentDate(e.target.value)} />
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
                                <TextField label="Quantity Of Milk Received" variant="standard" aria-readonly value={qltyofMilkrecev} onChange={(e) => setQltyofMilkrecev(e.target.value)} />
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
                                <TextField label="Rate Per Litre" variant="standard" value={rateperLiter} onChange={(e) => setRateperLiter(e.target.value)} />
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
                                <TextField label="CODST Revenue @ Rs. 5 Per Litre" variant="standard" value={codstrvne5liter} onChange={(e) => setCodstrvne5liter(e.target.value)} />
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
                                <TextField label="Total Payment To DLF @ Rs. 55 Per Litre" variant="standard" value={tolpaytodlf55liter} onChange={(e) => setTolpaytodlf55liter(e.target.value)} />
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
                                <TextField label="Payment Status" variant="standard" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} />
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
                                <TextField label="Remarks" variant="standard" value={remark} onChange={(e) => setRemark(e.target.value)} />
                            </Box>
                        </div>
                        <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                            <button className='savebtn' onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>

                    <div className='container tableMaster mt-5 mb-3 p-0'>
                        <table className='table productTableMAster table-stripped'>
                            <thead className='tableheading'>
                                <tr>
                                    <th style={{ width: "100px" }}>SrNo</th>
                                    <th style={{ width: "150px" }}>Date</th>
                                    <th style={{ width: "250px" }}>Quantity Of Milk Received</th>
                                    <th style={{ width: "150px" }}>Rate Per Litre</th>
                                    <th style={{ width: "150px" }}>CODST Revenue @ Rs. 5 Per Litre</th>
                                    <th style={{ width: "150px" }}>Total Payment To DLF @ Rs. 55 Per Litre</th>
                                    <th style={{ width: "150px" }}>Payment Status</th>
                                    <th style={{ width: "150px" }}>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prodTableData.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <th scope='row' className='text-center'>{i + 1}</th>
                                                <td>{item.date}</td>
                                                <td>{item.qltyofMilkrecev}</td>
                                                <td>{item.rateperLiter}</td>
                                                <td>{item.codstrvne5liter}</td>
                                                <td>{item.tolpaytodlf55liter}</td>
                                                <td>{item.paymentStatus}</td>
                                                <td>{item.remark}</td>
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

export default ShareDetails

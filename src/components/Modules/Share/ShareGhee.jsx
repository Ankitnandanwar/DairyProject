import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "../Product/Product.css"
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import { Bars } from 'react-loader-spinner';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductEntry = () => {
    const [loader, setLoader] = useState(true)
    const [showtable, setshowtable] = useState(false)
    const [prodTableData, setProdTableData] = useState([])
    const [date, setCurrentDate] = useState("")
    const [quantity, setQuantity] = useState("")
    const [basicRate, setBasicRate] = useState("")

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSave = async () => {
        try {
            const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveSahiwalGheeShareDetails", {
                date,
                quantity,
                basicRate,
                gstRate,
                paymentToCODST,
                paymentDairyFarm
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
            let data = await axios.get("http://103.38.50.113:8080/DairyApplication/getAllSahiwalGheeDetails").then((res) => {
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


    const CalculateTotals = () => {
        const gstRate = quantity * basicRate;
        const paymentToCODST = gstRate / 2;
        const paymentDairyFarm = gstRate / 2;
        
        return { gstRate, paymentToCODST, paymentDairyFarm };
    }

    const { gstRate, paymentToCODST, paymentDairyFarm } = CalculateTotals();


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

                    <div className='container mt-4'>
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
                            <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Share Ghee</h3>
                            <div className='row mt-4'>
                                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
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
                                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        autoComplete="off"
                                    >
                                        <TextField label="Quantity of Ghee Prepared (kg or lit)" variant="standard" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    </Box>
                                </div>
                                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        type="number"
                                        autoComplete="off"
                                    >
                                        <TextField label="Basic Rate" variant="standard" value={basicRate} onChange={(e) => setBasicRate(e.target.value)} />
                                    </Box>
                                </div>

                                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        type="number"
                                        autoComplete="off"
                                    >
                                        <TextField label="Sahiwal Ghee Rate (including 18%)" variant="standard" value={gstRate} aria-readonly />
                                    </Box>
                                </div>

                                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        type="number"
                                        autoComplete="off"
                                    >
                                        <TextField label="Payment to CODST (50% of total)" variant="standard" value={paymentToCODST} aria-readonly />
                                    </Box>
                                </div>
                                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        type="number"
                                        autoComplete="off"
                                    >
                                        <TextField label="Payment to Kaljharani Dairy Farm (50% of total)" variant="standard" value={paymentDairyFarm} aria-readonly/>
                                    </Box>
                                </div>

                                <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                                    <button className='savebtn' onClick={() => handleSave()}>Save</button>
                                    <button className='tabelbtn' onClick={() => setshowtable(!showtable)}>Show table</button>
                                </div>

                                {/*Table Code */}

                                {
                                    showtable ?
                                        <div className='container tableMaster mt-5 mb-3 p-0'>
                                            <table className='table productTableMAster table-stripped'>
                                                <thead className='tableheading'>
                                                    <tr>
                                                        <th>Sr No</th>
                                                        <th>Date</th>
                                                        <th style={{ width: "180px" }}>Quantity of Ghee Prepared (kg or lit)</th>
                                                        <th>Basic Rate</th>
                                                        <th>Sahiwal Ghee Rate (including 18%)</th>
                                                        <th>Payment to CODST (50% of total)</th>
                                                        <th>Payment to Kaljharani Dairy Farm (50% of total)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='border'>
                                                    {
                                                        prodTableData.map((item, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td scope='row' className='text-center'>{i + 1}</td>
                                                                    <td>
                                                                        <p className='sub'>{item.date}</p>
                                                                    </td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.basicRate}</td>
                                                                    <td>{item.gstRate}</td>
                                                                    <td>{item.paymentToCODST}</td>
                                                                    <td>{item.paymentDairyFarm}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div> : null
                                }
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default ProductEntry
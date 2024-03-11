import React, { useState, useEffect } from 'react'
import "../Product/Product.css"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Bars } from 'react-loader-spinner';
import { FiEdit } from "react-icons/fi";

const ShareDetails = () => {
    const [loader, setLoader] = useState(true)
    const [codstRev5perlit, setCodstRev5perlit] = useState("")
    const [tolpaytoDlf55lit, setTolpaytoDlf55lit] = useState("")

    const [prodTableData, setProdTableData] = useState([])
    const [editItem, setEditItem] = useState(null);


    // const n = new Date();
    // const [Dates, setDate] = useState({
    //     d: String(n.getDate()),
    //     m: String(n.getMonth()),
    //     y: String(n.getFullYear())
    // });



    const handleSave = async () => {
        try {
            if (editItem) {
                 await axios.put(`http://103.38.50.113:8080/DairyApplication/upadtesharerate/${editItem.id}`, {
                    codstRev5perlit, tolpaytoDlf55lit
                })
                toast.success("Data Updated Successfully", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveShareRate", {
                    codstRev5perlit, tolpaytoDlf55lit
                })
                toast.success("Data Saved Successfully", {
                    position: "top-center",
                    autoClose: 4000,
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
                console.log(res)
            }

            setCodstRev5perlit("");
            setTolpaytoDlf55lit("");
            setEditItem(null);

            // Refresh the product data
            getProductData();
        } catch (error) {
            console.log(error)
        }
    }


    const editItemHandler = (item) => {
        setCodstRev5perlit(item.codstRev5perlit);
        setTolpaytoDlf55lit(item.tolpaytoDlf55lit);
        setEditItem(item);
    };

    const getProductData = async () => {
        setLoader(true);
        try {
            await axios.get("http://103.38.50.113:8080/DairyApplication/getAllShareRate").then((res) => {
                setProdTableData(res.data);
                setTimeout(() => {
                    setLoader(false);
                }, 1000);
            });
        } catch (error) {
            console.log(error, "server issue");
        }
    };

    useEffect(() => {
        getProductData()
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
                            <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Share Rate</h3>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-12 col-lg-6 col-xl-6 col-md-6 d-flex justify-content-center align-items-center'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField label="CODST Revenue @ Rs. 5 Per Litre" variant="standard" value={codstRev5perlit} onChange={(e) => setCodstRev5perlit(e.target.value)} />
                                </Box>
                            </div>
                            <div className='col-12 col-lg-6 col-xl-6 col-md-6 d-flex justify-content-center align-items-center'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField label="Total Payment To DLF @ Rs. 55 Per Litre" variant="standard" value={tolpaytoDlf55lit} onChange={(e) => setTolpaytoDlf55lit(e.target.value)} />
                                </Box>
                            </div>
                            <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                                <button className='savebtn' onClick={() => handleSave()}>Save</button>
                                {/* <button className='savebtn' style={{ backgroundColor: 'green', width: "150px" }} onClick={() => exporttoexcel()}>Export To Excel</button> */}
                            </div>
                        </div>

                        <div className='container tableMaster mt-5 mb-3 p-0'>
                            <table className='table productTableMAster table-stripped'>
                                <thead className='tableheading'>
                                    <tr>
                                        <th style={{ width: "100px" }}>SrNo</th>
                                        <th style={{ width: "250px" }}>CODST Revenue @ Rs. 5 Per Litre</th>
                                        <th style={{ width: "150px" }}>Total Payment To DLF @ Rs. 55 Per Litre</th>
                                        <th style={{ width: "100px" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        prodTableData.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <th scope='row' className='text-center'>{i + 1}</th>
                                                    <td>{item.codstRev5perlit}</td>
                                                    <td>{item.tolpaytoDlf55lit}</td>
                                                    <td>
                                                    <button className='btn' onClick={() => editItemHandler(item)}><FiEdit className='editicon' /></button>
                                                    </td>
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

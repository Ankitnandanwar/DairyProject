import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./Product.css"
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { DialogActions, DialogTitle, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductEntry = () => {
    const [loader, setLoader] = useState(true)
    const [showtable, setshowtable] = useState(false)

    const [productName, setProductName] = useState("")
    const [openBalance, setOpenBalance] = useState("")
    const [rate, setRate] = useState("")
    const [prodTableData, setProdTableData] = useState([])

    const [opendailogdel, setopendailogdel] = useState(false)
    const [delid, setdelid] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [editItem, setEditItem] = useState(null);


    // Save data
    const saveData = async () => {
        try {
            if (editItem) {
                const editres = await axios.put(`http://103.38.50.113:8080/DairyApplication/updateProductEntry/${editItem.id}`, {
                    productName, openBalance, rate
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
                const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveProductEntry", {
                    productName, openBalance, rate
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
                }, 4000)
                console.log(res)
            }

            setProductName("");
            setOpenBalance("");
            setRate("");
            setEditItem(null);

            // Refresh the product data
            getProductData();
        } catch (error) {
            console.log(error)
        }
    }

    // Show Data
    const getProductData = async () => {
        setLoader(true)
        try {
            let data = await axios.get("http://103.38.50.113:8080/DairyApplication/getAllProductEntryData").then((res) => {
                setProdTableData(res.data)
                setTimeout(() => {
                    setLoader(false) 
                }, 4000);
            })
        } catch (error) {
            console.log(error, "server issue")
        }
    }

    useEffect(() => {
        getProductData()
    }, [])


    // Delete Data
    const dele = (id) => {
        setdelid(id)
        setopendailogdel(true)
    }

    const handleClose = () => {
        setAnchorEl(null);
        setopendailogdel(false)
    };

    const handledel = async () => {
        let delobj = {
            "id": delid
        }

        try {
            await axios.post("http://103.38.50.113:8080/DairyApplication/deleteProductEntry", delobj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resdel) => {
                    console.log(resdel.data);
                })
                .catch((error) => {
                    console.error(error)
                })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    const dailoge = () => {
        return (
            <>
                <Dialog

                    open={opendailogdel}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogActions style={{ height: '2.5rem' }}>
                        <IconButton onClick={handleClose}>
                            <CancelIcon style={{ color: 'blue' }} />
                        </IconButton>
                    </DialogActions>
                    <div style={{ background: 'white' }}>

                        <DialogTitle>
                            Are you sure you want to delete?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handledel}>Yes</Button>
                            <Button onClick={handleClose}>No</Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </>
        )
    }

    // Edit data
    const editItemHandler = (item) => {
        setProductName(item.productName);
        setOpenBalance(item.openBalance);
        setRate(item.rate);
        setEditItem(item);
    };


    return (
        <>
            {
                loader ?
                    <div className='loader-Cont'>
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
                            {dailoge()}
                            <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Product Entry</h3>
                            <div className='row mt-4'>
                                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        autoComplete="off"
                                    >
                                        <TextField label="Product" variant="standard" value={productName} onChange={(e) => setProductName(e.target.value)} />
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
                                        <TextField label="Opening Balance" variant="standard" value={openBalance} onChange={(e) => setOpenBalance(e.target.value)} />
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
                                        <TextField label="Rate" variant="standard" value={rate} onChange={(e) => setRate(e.target.value)} />
                                    </Box>
                                </div>

                                <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                                    <button className='savebtn' onClick={() => { saveData() }}>Save</button>
                                    <button className='tabelbtn' onClick={() => setshowtable(!showtable)}>Show table</button>
                                </div>

                                {/*Table Code */}

                                {
                                    showtable ?
                                        <div className='container tableMaster mt-5 mb-3 p-0'>
                                            <table className='table productTableMAster table-stripped'>
                                                <thead className='tableheading'>
                                                    <tr>
                                                        <th>SrNo</th>
                                                        <th style={{ width: "180px" }}>Product</th>
                                                        <th>Opening Balance</th>
                                                        <th>Rate</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='border'>
                                                    {
                                                        prodTableData.map((item, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <th scope='row' className='text-center'>{item.id}</th>
                                                                    <td>
                                                                        <p className='sub'>{item.productName}</p>
                                                                    </td>
                                                                    <td>{item.openBalance}</td>
                                                                    <td>{item.rate}</td>
                                                                    <td>
                                                                        <button className='btn' onClick={() => editItemHandler(item)}><FiEdit className='editicon' /></button>
                                                                        <button className='btn' onClick={() => dele(item.id)}><MdDeleteOutline className='delicon' /></button>
                                                                    </td>
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
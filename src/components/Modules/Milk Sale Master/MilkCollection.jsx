import CancelIcon from '@mui/icons-material/Cancel';
import { Button, DialogActions, DialogTitle, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import React, { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Bars } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from "xlsx";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Hostel = () => {

    const [loader, setLoader] = useState(true)
    const [showtable, setshowtable] = useState(false)

    const [currentdate, setCurrentDate] = useState("")
    const [openingBalance, setOpeningBalance] = useState("")
    const [cowmilk, setCowmilk] = useState("")
    const [sahiwalMilk, setSahiwalMilk] = useState("")
    const [buffaloMilk, setBuffaloMilk] = useState("")

    const [hostelTableData, setHostelTableData] = useState([])

    const [editItem, setEditItem] = useState(null);
    const [delid, setdelid] = useState()

    const [opendailogdel, setopendailogdel] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    // to fetch current date 
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    // save data
    const saveData = async () => {
        try {
            if (editItem) {
                await axios.put(`http://103.14.99.198:8082/DairyApplication/updateMilkCollections/${editItem.id}`, {
                    currentdate, openingBalance, cowmilk, sahiwalMilk, buffaloMilk, closingBalance, totalMilk
                })
                toast.success("Hostel Name Updated Successfully", {
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
                const res = await axios.post("http://103.14.99.198:8082/DairyApplication/saveMilkCollection", {
                    currentdate, openingBalance, cowmilk, sahiwalMilk, buffaloMilk, closingBalance, totalMilk
                })
                toast.success("Hostel Name saved Successfully", {
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

            setOpeningBalance("")
            setCowmilk("")
            setSahiwalMilk("")
            setBuffaloMilk("")
            setCurrentDate("")
            setEditItem(null);

            getCollectionEntry()
        } catch (error) {
            console.log(error)
        }
    }

    // Show Data
    const getCollectionEntry = async () => {
        setLoader(true)
        try {
            await axios.get("http://103.14.99.198:8082/DairyApplication/findMilkCollections").then((res) => {
                setHostelTableData(res.data)
                setTimeout(() => {
                    setLoader(false)
                }, 1000);
            })
        } catch (error) {
            console.log(error, "server issue")
        }
    }

    useEffect(() => {
        getCollectionEntry()
        setCurrentDate(getCurrentDate())
    }, [])

    const editItemHandler = (item) => {
        setCurrentDate(item.date)
        setOpeningBalance(item.openingBalance);
        setCowmilk(item.cowmilk);
        setSahiwalMilk(item.sahiwalMilk);
        setBuffaloMilk(item.buffaloMilk);
        setEditItem(item);
    }

    // delete hostel Name

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
            await axios.post("http://103.14.99.198:8082/DairyApplication/deleteMilkCollections", delobj, {
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

    useEffect(() => {
        setLoader(true);

        const fetchClosingBalance = async () => {
            try {
                const response = await axios.get('http://103.14.99.198:8082/DairyApplication/closingBalance');
                const lastClosingBalance = response.data;

                setOpeningBalance(lastClosingBalance);
                setTimeout(() => {
                    setLoader(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching closing balance:', error);
                setLoader(false);
            }
        };

        fetchClosingBalance();
    }, []);

    const CalculateTotals = () => {
        const closingBalance = parseInt(cowmilk) + parseInt(sahiwalMilk) + parseInt(buffaloMilk) + parseInt(openingBalance);
        const totalMilk = parseInt(cowmilk) + parseInt(sahiwalMilk) + parseInt(buffaloMilk);
        return { closingBalance, totalMilk };
    };

    const { closingBalance, totalMilk } = CalculateTotals();


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

    const exportToExcel = async () => {
        const fileName = "Milk Collection";
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";


        const ws = XLSX.utils.json_to_sheet(hostelTableData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Table Data");
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
                            <h3 className='text-center mt-2' style={{ textDecoration: 'underline' }}>Milk Collection</h3>
                            <div className='row mt-4'>
                                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        autoComplete="off"
                                    >
                                        <TextField label="Date" variant="standard" value={currentdate} onChange={(e) => setCurrentDate(e.target.value)} />
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
                                        <TextField label="Opening Balance" variant="standard" value={openingBalance} onChange={(e) => setOpeningBalance(e.target.value)} />
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
                                        <TextField label="Cow Milk" variant="standard" value={cowmilk} onChange={(e) => setCowmilk(e.target.value)} />
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
                                        <TextField label="Sahiwal Milk" variant="standard" value={sahiwalMilk} onChange={(e) => setSahiwalMilk(e.target.value)} />
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
                                        <TextField label="Buffalo Milk" variant="standard" value={buffaloMilk} onChange={(e) => setBuffaloMilk(e.target.value)} />
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
                                        <TextField label="Closing Balance" variant="standard" value={closingBalance} />
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
                                        <TextField label="Total Milk" variant="standard" value={totalMilk} />
                                    </Box>
                                </div>
                                <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                                    <button className='savebtn' onClick={() => { saveData() }}>Save</button>
                                    <button className='tabelbtn' onClick={() => setshowtable(!showtable)}>Show table</button>
                                    <button className='btn btn-success' onClick={() => exportToExcel()}>Export To Excel</button>
                                </div>

                                {/* Table code */}

                                {
                                    showtable ?
                                        <div className='container tableMaster mt-5 mb-3 p-0'>
                                            <table className='table productTableMAster table-stripped'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "180px" }}>SrNo</th>
                                                        <th style={{ width: "180px" }}>Date</th>
                                                        <th style={{ width: "180px" }}>Opening Balance</th>
                                                        <th style={{ width: "180px" }}>Cow Milk</th>
                                                        <th style={{ width: "180px" }}>Sahiwal Milk</th>
                                                        <th style={{ width: "180px" }}>Buffalo Milk</th>
                                                        <th style={{ width: "180px" }}>Closing Balance</th>
                                                        <th style={{ width: "180px" }}>Total Milk</th>
                                                        <th style={{ width: "180px" }}>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody className='border'>
                                                    {
                                                        hostelTableData.map((item, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td className='text-center'>
                                                                        {i + 1}
                                                                    </td>
                                                                    <td>
                                                                        {item.date}
                                                                    </td>
                                                                    <td>
                                                                        {item.openingBalance}
                                                                    </td>
                                                                    <td>
                                                                        {item.cowmilk}
                                                                    </td>
                                                                    <td>
                                                                        {item.sahiwalMilk}
                                                                    </td>
                                                                    <td>
                                                                        {item.buffaloMilk}
                                                                    </td>
                                                                    <td>
                                                                        {item.closingBalance}
                                                                    </td>
                                                                    <td>
                                                                        {item.totalMilk}
                                                                    </td>
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

export default Hostel
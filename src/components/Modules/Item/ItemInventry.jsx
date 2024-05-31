import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import "../Product/Product.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const ProductSale = () => {
    const [loader, setLoader] = useState(true)

    // product dropdown
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState("")
    const [productDetails, setProductDetails] = useState("")
    const [date, setCurrentDate] = useState("")
    const [addQtyStock, setAddQtyStock] = useState("")
    const [qtyReceived, setQtyReceived] = useState("")
    const [personName, setPersonName] = useState("")
    const [qtyIssued, setQtyIssued] = useState("")
    const [purpose, setPurpose] = useState("")
    const [totalDailyUsedQty, setTotalDailyUsedQty] = useState("")
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

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://103.38.50.113:8080/DairyApplication/getItemData?item=${selectedProduct}`);
            const details = response.data[0];
            setProductDetails({
                presentStock: details.presentStock,
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://103.38.50.113:8080/DairyApplication/getItem');
                setProducts(response.data);
                setCurrentDate(getCurrentDate())
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [])


    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    useEffect(() => {
        if (selectedProduct) {
            fetchProductDetails();
        }
    }, [selectedProduct]);

    const handleSave = async () => {
        try {
            const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveDairyInventory", {
                item: selectedProduct,
                presentStock: productDetails.presentStock,
                addQtyStock,
                qtyReceived,
                totalQty,
                personName,
                qtyIssued,
                purpose,
                totalDailyUsedQty,
                closingStock,
                remark
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
             await axios.get("http://103.38.50.113:8080/DairyApplication/getAllInventoryData").then((res) => {
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
    }, [])


    const CalculateTotals = () => {
        const totalQty = parseInt(productDetails.presentStock) + parseInt(addQtyStock);
        const closingStock = parseInt(totalQty) - parseInt(qtyIssued);
        return { totalQty, closingStock };
    }

    const { totalQty, closingStock } = CalculateTotals();

    const exportToExcel = async () => {
        const fileName = "Item Inventry";
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";


        const ws = XLSX.utils.json_to_sheet([prodTableData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Table Data");
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
                            <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Item Inventry</h3>
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
                                <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
                                    <InputLabel id="demo-simple-select-standard-label" className='selectP'>Name of Item</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Items"
                                        MenuProps={MenuProps}
                                        value={selectedProduct}
                                        onChange={handleProductChange}
                                    >

                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            products.map((prod, index) => (
                                                <MenuItem key={`${prod}-${index}`} value={prod}>{prod}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                                <div class="textfield">
                                    <input class="inputfield" type="text" required value={productDetails.presentStock} />
                                    <span></span>
                                    <label class="inputlabels">Present Stock</label>
                                </div>
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
                                    <TextField label="Add Quantity to Stock " variant="standard" value={addQtyStock} onChange={(e) => setAddQtyStock(e.target.value)} />
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
                                    <TextField label="Quantity Received From" variant="standard" value={qtyReceived} onChange={(e) => setQtyReceived(e.target.value)} />
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
                                    <TextField label="Total Value Of The Quantity" variant="standard" value={totalQty} />
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
                                    <TextField label="Name Of The Person Who Issued Quantity" variant="standard" value={personName} onChange={(e) => setPersonName(e.target.value)} />
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
                                    <TextField label="Quantity Issued" variant="standard" value={qtyIssued} onChange={(e) => setQtyIssued(e.target.value)} />
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
                                    <TextField label="Quantity Used For Purpose" variant="standard" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
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
                                    <TextField label="Total Daily Quantity Used" variant="standard" value={totalDailyUsedQty} onChange={(e) => setTotalDailyUsedQty(e.target.value)} />
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
                                    <TextField label="Closing Stock" variant="standard" value={closingStock} />
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
                                    <TextField label="Remark" variant="standard" value={remark} onChange={(e) => setRemark(e.target.value)} />
                                </Box>
                            </div>
                            <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                                <button className='savebtn' onClick={() => handleSave()}>Save</button>
                                {/* <button className='savebtn' style={{ backgroundColor: 'green', width: "150px" }} onClick={() => exporttoexcel()}>Export To Excel</button> */}
                                <button className='btn btn-success' onClick={()=>exportToExcel()}>Export To Excel</button>
                            </div>
                        </div>

                        <div className='container tableMaster mt-5 mb-3 p-0'>
                            <table className='table productTableMAster table-stripped'>
                                <thead className='tableheading'>
                                    <tr>
                                        <th style={{ width: "100px" }}>SrNo</th>
                                        <th style={{ width: "100px" }}>Date</th>
                                        <th style={{ width: "250px" }}>Name of Item</th>
                                        <th style={{ width: "150px" }}>Present Stock</th>
                                        <th style={{ width: "150px" }}>Add Quantity to Stock</th>
                                        <th style={{ width: "150px" }}>Quantity Received From</th>
                                        <th style={{ width: "150px" }}>Total Value of the Quantity</th>
                                        <th style={{ width: "150px" }}>Name of the Person Who Issued Quantity</th>
                                        <th style={{ width: "150px" }}>Quantity Issued</th>
                                        <th style={{ width: "150px" }}>Quantity Used for Purpose</th>
                                        <th style={{ width: "150px" }}>Total Daily Quantity Used</th>
                                        <th style={{ width: "150px" }}>Closing Stock</th>
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
                                                    <td>{item.item}</td>
                                                    <td>{item.presentStock}</td>
                                                    <td>{item.addQtyStock}</td>
                                                    <td>{item.qtyReceived}</td>
                                                    <td>{item.totalQty}</td>
                                                    <td>{item.personName}</td>
                                                    <td>{item.qtyIssued}</td>
                                                    <td>{item.purpose}</td>
                                                    <td>{item.totalDailyUsedQty}</td>
                                                    <td>{item.closingStock}</td>
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

export default ProductSale

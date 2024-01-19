import React, { useState, useEffect } from 'react'
import "./Product.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { MdDeleteOutline } from "react-icons/md";
import { Bars } from 'react-loader-spinner';

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
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [currentDate, setCurrentDate] = useState("")
    const [productDetails, setProductDetails] = useState("");
    const [creammilk, setCreamMilk] = useState("");
    const [addQty, setAddQty] = useState("");
    const [mix, setMix] = useState("");
    const [paymentPending, setPaymentPending] = useState("");
    const [sahiwalGhee, setSahiwalGhee] = useState("");
    const [waiveOff, setWaiveOff] = useState("");
    const [convertedProduct, setConvertedProduct] = useState("");
    const [saleCash, setSaleCash] = useState("");
    const [saleOnline, setSaleOnline] = useState("");
    const [pending, setPending] = useState("");
    const [remark, setRemark] = useState("");

    const [tableData, setTableData] = useState([]);

    // to show data with todays date how many entries done
    const n = new Date();
    const [Dates, setDate] = useState({
        d: String(n.getDate()),
        m: String(n.getMonth()),
        y: String(n.getFullYear())
    });

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
            const response = await axios.get(`http://103.38.50.113:8080/DairyApplication/getProductData?productName=${selectedProduct}`);
            const details = response.data[0];
            setProductDetails({
                openingBalance: details.openBalance,
                rate: details.rate
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://103.38.50.113:8080/DairyApplication/getProduct');
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
            const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveProductAddSale", {
                product: selectedProduct,
                openBalance: productDetails.openingBalance,
                rate: productDetails.rate,
                creammilk,
                currentDate,
                addQty,
                mix,
                paymentPending,
                sahiwalGhee,
                waiveOff,
                convertedProduct,
                saleCash,
                saleOnline,
                cashTotal,
                onlineTotal,
                totalAmt,
                closingBalance,
                pending,
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



    useEffect(() => {
        const fetchDateData = async () => {
            setLoader(true)
            try {
                const res = await axios.post("http://103.38.50.113:8080/DairyApplication/findProductDataByCurrentDate", {
                    "currentDate": String(`${Dates?.d}/${Number(Dates?.m) + 1}/${Dates?.y}`)
                });
                // console.log(res.data)
                setTableData(res.data.data);
                setTimeout(() => {
                    setLoader(false)
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDateData();
    }, [Dates]);

    const CalculateTotals = () => {
        const cashTotal = productDetails.rate * saleCash;
        const onlineTotal = productDetails.rate * saleOnline;
        const totalAmt = cashTotal + onlineTotal;
        const closingBalance = productDetails.openingBalance - mix - paymentPending - waiveOff - saleCash - saleOnline;
        return { cashTotal, onlineTotal, totalAmt, closingBalance };
    }

    const { cashTotal, onlineTotal, totalAmt, closingBalance } = CalculateTotals();



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
                            <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Product Sale</h3>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                                <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
                                    <InputLabel id="demo-simple-select-standard-label" className='selectP'>Products</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Products"
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
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField label="Opening Balance" variant="standard" value={productDetails.openingBalance} aria-readonly />
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
                                    <TextField label="Rate" variant="standard" value={productDetails.rate} aria-readonly />
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
                                    <TextField variant="standard" type='date' value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
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
                                    <TextField label="Cream Milk" variant="standard" value={creammilk} onChange={(e) => setCreamMilk(e.target.value)} />
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
                                    <TextField label="Add Qty" variant="standard" value={addQty} onChange={(e) => setAddQty(e.target.value)} />
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
                                    <TextField label="Mix" variant="standard" value={mix} onChange={(e) => setMix(e.target.value)} />
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
                                    <TextField label="Payment Pending" variant="standard" value={paymentPending} onChange={(e) => setPaymentPending(e.target.value)} />
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
                                    <TextField label="Sahiwal Ghee" variant="standard" value={sahiwalGhee} onChange={(e) => setSahiwalGhee(e.target.value)} />
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
                                    <TextField label="Waivee off" variant="standard" value={waiveOff} onChange={(e) => setWaiveOff(e.target.value)} />
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
                                    <TextField label="Convert Product" variant="standard" value={convertedProduct} onChange={(e) => setConvertedProduct(e.target.value)} />
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
                                    <TextField label="Sale Cash" variant="standard" value={saleCash} onChange={(e) => setSaleCash(e.target.value)} />
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
                                    <TextField label="Sale Online" variant="standard" value={saleOnline} onChange={(e) => setSaleOnline(e.target.value)} />
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
                                    <TextField label="Cash Total" variant="standard" value={cashTotal} aria-readonly />
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
                                    <TextField label="Online Total" variant="standard" aria-readonly value={onlineTotal} />
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
                                    <TextField label="Total Amount" variant="standard" aria-readonly value={totalAmt} />
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
                                    <TextField label="Closing Balance" variant="standard" aria-readonly value={closingBalance} />
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
                                    <TextField label="Pending" variant="standard" value={pending} onChange={(e) => setPending(e.target.value)} />
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
                            </div>
                        </div>

                        <div className='container tableMaster mt-5 mb-3 p-0'>
                            <table className='table productTableMAster table-stripped'>
                                <thead className='tableheading'>
                                    <tr>
                                        <th style={{ width: "100px" }}>SrNo</th>
                                        <th style={{ width: "250px" }}>Product</th>
                                        <th style={{ width: "150px" }}>Opening Balance</th>
                                        <th style={{ width: "150px" }}>Rate</th>
                                        <th style={{ width: "150px" }}>Cream Milk</th>
                                        <th style={{ width: "150px" }}>Add Qty</th>
                                        <th style={{ width: "150px" }}>Mix</th>
                                        <th style={{ width: "150px" }}>Payment Pending</th>
                                        <th style={{ width: "150px" }}>Sahiwal Ghee</th>
                                        <th style={{ width: "150px" }}>Waive Off</th>
                                        <th style={{ width: "150px" }}>Converted Product</th>
                                        <th style={{ width: "150px" }}>Sale Cash</th>
                                        <th style={{ width: "150px" }}>Sale Online</th>
                                        <th style={{ width: "150px" }}>Cash Total</th>
                                        <th style={{ width: "150px" }}>Online Total</th>
                                        <th style={{ width: "150px" }}>Total Amount</th>
                                        <th style={{ width: "150px" }}>Closing Balance</th>
                                        <th style={{ width: "150px" }}>Pending</th>
                                        <th style={{ width: "150px" }}>Remark</th>
                                        <th style={{ width: "180px" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(tableData) && tableData.length > 0 ? (
                                        tableData.map((item, i) => (
                                            <tr key={i}>
                                                <th scope='row' className='text-center'>{item.id}</th>
                                                <td className='text-center'>{item.product}</td>
                                                <td className='text-center'>{item.openBalance}</td>
                                                <td className='text-center'>{item.rate}</td>
                                                <td className='text-center'>{item.creammilk}</td>
                                                <td className='text-center'>{item.addQty}</td>
                                                <td className='text-center'>{item.mix}</td>
                                                <td className='text-center'>{item.paymentPending}</td>
                                                <td className='text-center'>{item.sahiwalGhee}</td>
                                                <td className='text-center'>{item.waiveOff}</td>
                                                <td className='text-center'>{item.convertedProduct}</td>
                                                <td className='text-center'>{item.saleCash}</td>
                                                <td className='text-center'>{item.saleOnline}</td>
                                                <td className='text-center'>{item.cashTotal}</td>
                                                <td className='text-center'>{item.onlineTotal}</td>
                                                <td className='text-center'>{item.totalAmt}</td>
                                                <td className='text-center'>{item.closingBalance}</td>
                                                <td className='text-center'>{item.pending}</td>
                                                <td className='text-center'>{item.remark}</td>
                                                <td className='text-center'>
                                                    <button className='btn'><MdDeleteOutline className='delicon' /></button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="21" className='text-start'>No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}

export default ProductSale

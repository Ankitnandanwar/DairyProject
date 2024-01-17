import React, { useEffect } from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios'
import { Bars } from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Product.css"

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

const Table = () => {
  const [loader, setLoader] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const [setProductRate] = useState("")
  const [setGstAmount] = useState("")
  const [setCgst] = useState("")
  const [setSgst] = useState("")
  const [plantCash, setPlantCash] = useState("")
  const [plantOnline, setPlantOnline] = useState("")
  const [parlourCash, setParlourCash] = useState("")
  const [parlourOnline, setParlourOnline] = useState("")
  const [adminCash, setAdminCash] = useState("")
  const [adminOnline, setAdminOnline] = useState("")
  const [eCash, setECash] = useState("")
  const [eOnline, setEOnline] = useState("")
  const [yodhaCash, setYodhaCash] = useState("")
  const [yodhaOnline, setYodhaOnline] = useState("")
  const [c5Cash, setC5Cash] = useState("")
  const [c5Online, setC5Online] = useState("")
  const [c10Cash, setC10Cash] = useState("")
  const [c10Online, setC10Online] = useState("")
  const [c40Cash, setC40Cash] = useState("")
  const [c40Online, setC40Online] = useState("")
  const [setTotalCashSale] = useState("")
  const [setTotalOnlineSale] = useState("")
  const [setTotalSale] = useState("")
  
  const [products, setProducts] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, [])

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://103.38.50.113:8080/DairyApplication/getProductData?productName=${selectedProduct}`);
      const details = response.data[0];
      setProductDetails({
        rate: details.rate,
        gst: details.gst
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    setLoader(true)
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://103.38.50.113:8080/DairyApplication/getProduct');
        setProducts(response.data);
        setCurrentDate(getCurrentDate())
        setTimeout(() => {
          setLoader(false)
        }, 1000);
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
      const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveDailyReport", {
        product: selectedProduct,
        rate: productDetails.rate,
        gst: productDetails.gst,
        productRate,
        gstAmount,
        cgst,
        sgst,
        plantCash,
        plantCashAmount,
        plantOnline,
        plantOnlineAmount,
        parlourCash,
        parlourCashAmount,
        parlourOnline,
        parlourOnlineAmount,
        adminCash,
        adminCashAmount,
        adminOnline,
        adminOnlineAmount,
        eCash,
        eCashAmount,
        eOnline,
        eOnlineAmount,
        yodhaCash,
        yodhaCashAmount,
        yodhaOnline,
        yodhaOnlineAmount,
        c5Cash,
        c5CashAmount,
        c5Online,
        c5OnlineAmount,
        c10Cash,
        c10CashAmount,
        c10Online,
        c10OnlineAmount,
        c40Cash,
        c40CashAmount,
        c40Online,
        c40OnlineAmount,
        totalCashSale,
        totalOnlineSale,
        totalSale,
        totalAmountCash,
        totalAmountOnline,
        grandTotal
      })
      console.log(res.data)
      window.location.reload();
    } catch (error) {
      console.log(error)

    }

  }

  const Calculations = () => {
    const gstAmount = productDetails.rate * productDetails.gst /100;
    const productRate = productDetails.rate - gstAmount;
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const plantCashAmount = productDetails.rate * plantCash;
    const plantOnlineAmount = productDetails.rate * plantOnline;
    const parlourCashAmount = productDetails.rate * parlourCash;
    const parlourOnlineAmount = productDetails.rate * parlourOnline;
    const adminCashAmount = productDetails.rate * adminCash;
    const adminOnlineAmount = productDetails.rate * adminOnline;
    const eCashAmount = productDetails.rate * eCash;
    const eOnlineAmount = productDetails.rate * eOnline;
    const yodhaCashAmount = productDetails.rate * yodhaCash;
    const yodhaOnlineAmount = productDetails.rate * yodhaOnline;
    const c5CashAmount = productDetails.rate * c5Cash;
    const c5OnlineAmount = productDetails.rate * c5Online;
    const c10CashAmount = productDetails.rate * c10Cash;
    const c10OnlineAmount = productDetails.rate * c10Online;
    const c40CashAmount = productDetails.rate * c40Cash;
    const c40OnlineAmount = productDetails.rate * c40Online;
    const totalCashSale = parseInt(plantCash) + parseInt(parlourCash) + parseInt(adminCash) + parseInt(eCash) + parseInt(yodhaCash) + parseInt(c5Cash) + parseInt(c10Cash) + parseInt(c40Cash);
    const totalOnlineSale = parseInt(plantOnline) + parseInt(parlourOnline) + parseInt(adminOnline) + parseInt(eOnline) + parseInt(yodhaOnline) + parseInt(c5Online) + parseInt(c10Online) + parseInt(c40Online);
    const totalSale = totalCashSale + totalOnlineSale;
    const totalAmountCash = plantCashAmount + parlourCashAmount + adminCashAmount + eCashAmount + yodhaCashAmount + c5CashAmount + c10CashAmount + c40CashAmount;
    const totalAmountOnline = plantOnlineAmount + parlourOnlineAmount + adminOnlineAmount + eOnlineAmount + yodhaOnlineAmount + c5OnlineAmount + c10OnlineAmount + c40OnlineAmount;
    const grandTotal = totalAmountCash + totalAmountOnline;
    return {
      gstAmount, productRate, cgst, sgst, plantCashAmount, plantOnlineAmount, parlourCashAmount, parlourOnlineAmount, adminCashAmount,
      adminOnlineAmount, eCashAmount, eOnlineAmount, yodhaCashAmount, yodhaOnlineAmount, c5CashAmount, c5OnlineAmount, c10CashAmount, c10OnlineAmount,
      c40CashAmount, c40OnlineAmount, totalCashSale, totalOnlineSale, totalSale, totalAmountCash, totalAmountOnline, grandTotal
    };

  }

  const { gstAmount, productRate, cgst, sgst, plantCashAmount, plantOnlineAmount, parlourCashAmount, parlourOnlineAmount, adminCashAmount,
    adminOnlineAmount, eCashAmount, eOnlineAmount, yodhaCashAmount, yodhaOnlineAmount, c5CashAmount, c5OnlineAmount, c10CashAmount, c10OnlineAmount,
    c40CashAmount, c40OnlineAmount, totalCashSale, totalOnlineSale, totalSale, totalAmountCash, totalAmountOnline, grandTotal } = Calculations();

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
              <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>DMW Report</h3>
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
                  <TextField variant="standard" type='date' value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
                </Box>
              </div>
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
                  <TextField type='number' label="Rate" variant="standard" value={productDetails.rate} aria-readonly />
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
                  <TextField type='number' label="GST (%)" variant="standard" value={productDetails.gst} aria-readonly />
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
                  <TextField label="GST Amt" type='number' variant="standard" value={gstAmount} onChange={(e) => setGstAmount(e.target.value)} />
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
                  <TextField label="CGST" type='number' variant="standard" value={cgst} onChange={(e) => setCgst(e.target.value)} />
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
                  <TextField label="SGST" type='number' variant="standard" value={sgst} onChange={(e) => setSgst(e.target.value)} />
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
                  <TextField label="Product Rate" type='number' variant="standard" value={productRate} onChange={(e) => setProductRate(e.target.value)} />
                </Box>
              </div>
              <h1 style={{ fontSize: '20px', marginTop: '25px', marginLeft: '25px', textDecoration: 'underline' }}>Plant Sale (EDP)</h1>
              <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
                >
                  <TextField label="Cash" type='number' variant="standard" value={plantCash} onChange={(e) => setPlantCash(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={plantCashAmount} />
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
                  <TextField label="Online" type='number' variant="standard" value={plantOnline} onChange={(e) => setPlantOnline(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={plantOnlineAmount}/>
                </Box>
              </div>
              <h1 style={{ fontSize: '20px', marginTop: '25px', marginLeft: '25px', textDecoration: 'underline' }}>Milk Parlour</h1>
              <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
                >
                  <TextField label="Cash" type='number' variant="standard" value={parlourCash} onChange={(e) => setParlourCash(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={parlourCashAmount} />
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
                  <TextField label="Online" type='number' variant="standard" value={parlourOnline} onChange={(e) => setParlourOnline(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={parlourOnlineAmount} />
                </Box>
              </div>
              <h1 style={{ fontSize: '20px', marginTop: '25px', marginLeft: '25px', textDecoration: 'underline' }}>Admin Block Canteen</h1> <br />
              <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
                >
                  <TextField label="Cash" type='number' variant="standard" value={adminCash} onChange={(e) => setAdminCash(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={adminCashAmount} />
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
                  <TextField label="Online" type='number' variant="standard" value={adminOnline} onChange={(e) => setAdminOnline(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={adminOnlineAmount} />
                </Box>
              </div>
              <h1 style={{ fontSize: '20px', marginTop: '25px', marginLeft: '25px', textDecoration: 'underline' }}>E-Rikshaw</h1> <br />
              <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
                >
                  <TextField label="Cash" type='number' variant="standard" value={eCash} onChange={(e) => setECash(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={eCashAmount} />
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
                  <TextField label="Online" type='number' variant="standard" value={eOnline} onChange={(e) => setEOnline(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={eOnlineAmount} />
                </Box>
              </div>
              <h1 style={{ fontSize: '20px', marginTop: '25px', marginLeft: '25px', textDecoration: 'underline' }}>Tata Yodha</h1> <br />
              <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
                >
                  <TextField label="Cash" type='number' variant="standard" value={yodhaCash} onChange={(e) => setYodhaCash(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={yodhaCashAmount} />
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
                  <TextField label="Online" type='number' variant="standard" value={yodhaOnline} onChange={(e) => setYodhaOnline(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={yodhaOnlineAmount} />
                </Box>
              </div>
              <h1 style={{ fontSize: '20px', marginTop: '25px', marginLeft: '25px', textDecoration: 'underline' }}>Concession 5% Only</h1> <br />
              <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
                >
                  <TextField label="Cash" type='number' variant="standard" value={c5Cash} onChange={(e) => setC5Cash(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={c5CashAmount} />
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
                  <TextField label="Online" type='number' variant="standard" value={c5Online} onChange={(e) => setC5Online(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={c5OnlineAmount} />
                </Box>
              </div>
              <h1 style={{ fontSize: '20px', marginTop: '25px', marginLeft: '25px', textDecoration: 'underline' }}>Concession 10% Only</h1> <br />
              <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
                >
                  <TextField label="Cash" type='number' variant="standard" value={c10Cash} onChange={(e) => setC10Cash(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={c10CashAmount} />
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
                  <TextField label="Online" type='number' variant="standard" value={c10Online} onChange={(e) => setC10Online(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={c10OnlineAmount} />
                </Box>
              </div>
              <h1 style={{ fontSize: '20px', marginTop: '25px', marginLeft: '25px', textDecoration: 'underline' }}>Concession 40% Only</h1> <br />
              <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  autoComplete="off"
                >
                  <TextField label="Cash" type='number' variant="standard" value={c40Cash} onChange={(e) => setC40Cash(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={c40CashAmount} />
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
                  <TextField label="Online" type='number' variant="standard" value={c40Online} onChange={(e) => setC40Online(e.target.value)} />
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
                  <TextField label="Amt." type='number' variant="standard" value={c40OnlineAmount} />
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
                  <TextField label="Total Cash Sale" type='number' variant="standard" value={totalCashSale}  />
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
                  <TextField label="Total Online Sale" type='number' variant="standard" value={totalOnlineSale} />
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
                  <TextField label="Total Sale" type='number' variant="standard" value={totalSale} />
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
                  <TextField label="Total Amount Cash" type='number' variant="standard" value={totalAmountCash} />
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
                  <TextField label="Total Amount Online" type='number' variant="standard" value={totalAmountOnline} />
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
                  <TextField label="Grand Total" type='number' variant="standard" value={grandTotal} />
                </Box>
              </div>
              <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                <button className='savebtn' onClick={() => handleSave()}>Save</button>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Table

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Bars } from 'react-loader-spinner';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const DtmSave = () => {
  const n = new Date();
  const [Dates] = useState({
    d: String(n.getDate()),
    m: String(n.getMonth()),
    y: String(n.getFullYear()),
  });

  // to fetch current date
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [firstTableAdd, setfirstTableAdd] = useState([
    { Hosteldropdown: "", qtyInput: "" },
  ]);
  const [secondTableAdd, setSecondTableAdd] = useState([
    { StdHosteldropdown: "", standQty: "" },
  ]);

  const [hostelData, setHostelData] = useState([]);

  const [openingBalance, setOpeningBalance] = useState("");
  const [stdopeningBalance, setStdopeningBalance] = useState("");

  const [product, setProduct] = useState("");

  const [dtmMilkRate, setDtmMilkRate] = useState("");
  const [dtmSaleCash, setDtmSaleCash] = useState("");
  const [standardMilkRate, setStandardMilkRate] = useState("");
  const [dtmsaleOnline, setDtmsaleOnline] = useState("");
  const [totalQty, setTotalQty] = useState("");

  // second table usestate
  const [stdproduct, setStdproduct] = useState("");
  const [stdSaleCash, setStdSaleCash] = useState("");
  const [stdsaleOnline, setStdsaleOnline] = useState("");
  const [stdtotalQty, setStdtotalQty] = useState("");
  const [cream, setCream] = useState("");
  const [sahiwalCream, setSahiwalCream] = useState("");
  const [research, setResearch] = useState("");
  const [hloss, setHloss] = useState("");

  const [loader, setLoader] = useState(true);

  const [currDate, setCurrDate] = useState("");

  // Adding row of first table
  const addRow = () => {
    setfirstTableAdd([...firstTableAdd, { Hosteldropdown: "", qtyInput: "" }]);
  };

  const addSecondRow = () => {
    setSecondTableAdd([
      ...secondTableAdd,
      { StdHosteldropdown: "", standQty: "" },
    ]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = firstTableAdd.map((row, i) =>
      i === index ? { ...row, [name]: value } : row
    );

    const updateRows2 = secondTableAdd.map((row, i) =>
      i === index ? { ...row, [name]: value } : row
    );
    setfirstTableAdd(updatedRows);
    setSecondTableAdd(updateRows2);
  };

  useEffect(() => {
    // Hostel array data
    const fetchHostels = async () => {
      try {
        const response = await axios.get(
          "http://103.38.50.113:8080/DairyApplication/getHostel"
        );
        console.log(response.data);
        setHostelData(response.data);
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    };

    // fetch opening balance data

    const fetchOpeningBalance = async () => {
      try {
        const response = await axios.get(
          "http://103.38.50.113:8080/DairyApplication/dtmClosingBalance"
        );
        const lastClosingBalance = response.data;

        setOpeningBalance(lastClosingBalance);
        setTimeout(() => {}, 1000);
      } catch (error) {
        console.error("Error fetching closing balance:", error);
      }
    };

    const fetchStdOpeningBalance = async () => {
      try {
        const response = await axios.get(
          "http://103.38.50.113:8080/DairyApplication/closingBalance"
        );
        const lastClosingBalance = response.data;

        setStdopeningBalance(lastClosingBalance);
        setTimeout(() => {}, 1000);
      } catch (error) {
        console.error("Error fetching closing balance:", error);
      }
    };

    const fetchMilkRate = async () => {
      try {
        const response = await axios.get(
          "http://103.38.50.113:8080/DairyApplication/getAllDataOfMilkRateMaster"
        );
        const MilkRate = response.data;

        setStandardMilkRate(MilkRate[0].standardMilkRate);
        setDtmMilkRate(MilkRate[0].dtmMilkRate);
        setTimeout(() => {}, 1000);
      } catch (error) {
        console.error("Error fetching closing balance:", error);
      }
    };

    // current date display
    setCurrDate(getCurrentDate());

    fetchHostels();
    fetchOpeningBalance();
    fetchStdOpeningBalance();
    fetchMilkRate();
  }, []);

  // Calculation data

  const CalculateTotals = () => {
    const dtmAmountCash = parseInt(dtmMilkRate) * parseInt(dtmSaleCash);
    const dtmAmountOnline = parseInt(dtmMilkRate) * parseInt(dtmsaleOnline);
    const finalTotal = parseInt(dtmAmountCash) + parseInt(dtmAmountOnline);
    const closingBalance = parseInt(openingBalance) - parseInt(totalQty);
    const stdAmountCash = parseInt(standardMilkRate) * parseInt(stdSaleCash);
    const stdAmountOnline =
      parseInt(standardMilkRate) * parseInt(stdsaleOnline);
    const stdfinalTotal = parseInt(stdAmountCash) + parseInt(stdAmountOnline);
    const stdclosingBalance =
      parseInt(stdopeningBalance) - parseInt(stdtotalQty);

    return {
      dtmAmountCash,
      dtmAmountOnline,
      finalTotal,
      closingBalance,
      stdAmountCash,
      stdAmountOnline,
      stdfinalTotal,
      stdclosingBalance,
    };
  };

  const {
    dtmAmountCash,
    dtmAmountOnline,
    finalTotal,
    closingBalance,
    stdAmountCash,
    stdAmountOnline,
    stdfinalTotal,
    stdclosingBalance,
  } = CalculateTotals();

  // save whole data as per the filed and calcilations done

  const saveData = async () => {
    try {
      const resp = await axios.post(
        "http://103.38.50.113:8080/DairyApplication/saveDtmMilkSales",
        {
          openingBalance,
          closingBalance,
          product,
          tableData: JSON.stringify(firstTableAdd),
          dtmSaleCash,
          dtmsaleOnline,
          dtmAmountCash,
          dtmAmountOnline,
          finalTotal,
          totalQty,
          rate: dtmMilkRate,
          date: currDate,
          stdopeningBalance,
          stdclosingBalance,
          stdproduct,
          stdtableData: JSON.stringify(secondTableAdd),
          stdSaleCash,
          stdsaleOnline,
          stdAmountCash,
          stdAmountOnline,
          stdrate: standardMilkRate,
          stdfinalTotal,
          stdtotalQty,
          cream,
          research,
          sahiwalCream,
          hloss,
        }
      );
      toast.success("Data Saved Successfully", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(resp.data);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    setLoader(true)
    setTimeout (()=> {
      setLoader(false)
    }, 2000)
  }, [])
  

  return (
    <>
      {loader ? (
        <div className="loader-Cont">
          <Bars
            height="40"
            width="80"
            color="rgb(5, 165, 214)"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          <div className="mt-5 container">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            ></ToastContainer>
            <div className="pt-5">
              <h3
                className="text-center mt-3"
                style={{ textDecoration: "underline" }}
              >
                MILK SALE
              </h3>
            </div>
            <div className="row mt-4">
              <h1
                style={{
                  fontSize: "20px",
                  marginTop: "25px",
                  marginLeft: "25px",
                  textDecoration: "underline",
                }}
              >
                DTM Milk Sale
              </h1>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Opening Balance"
                    variant="standard"
                    value={openingBalance}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Closing Balance"
                    variant="standard"
                    value={closingBalance}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Product"
                    variant="standard"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="DTM Sale Cash"
                    variant="standard"
                    value={dtmSaleCash}
                    onChange={(e) => setDtmSaleCash(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="DTM Sale Online"
                    variant="standard"
                    value={dtmsaleOnline}
                    onChange={(e) => setDtmsaleOnline(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="DTM Amount Cash"
                    variant="standard"
                    value={dtmAmountCash}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="DTM Amount Online"
                    variant="standard"
                    value={dtmAmountOnline}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Rate"
                    variant="standard"
                    value={dtmMilkRate}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Final Total"
                    variant="standard"
                    value={finalTotal}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Total Quantity"
                    variant="standard"
                    value={totalQty}
                    onChange={(e) => setTotalQty(e.target.value)}
                  />
                </Box>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                style={{
                  backgroundColor: "green",
                  padding: "5px",
                  border: "none",
                  color: "white",
                  outline: "none",
                  borderRadius: "7px",
                }}
                onClick={addRow}
              >
                Add New Row
              </button>
            </div>
            <div className="container tableMaster mt-5 mb-3 p-0">
              <table className="table productTableMAster table-stripped">
                <thead className="tableheading">
                  <tr>
                    <th>SrNo</th>
                    <th>Hostel Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {firstTableAdd.map((row, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {index + 1}
                      </th>
                      <td className="text-center">
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, width: "25ch" }}
                        >
                          <InputLabel
                            id="demo-simple-select-standard-label"
                            className="selectP"
                          >
                            Select Hostel
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Products"
                            MenuProps={MenuProps}
                            name="Hosteldropdown"
                            value={row.Hosteldropdown}
                            onChange={(event) => handleChange(index, event)}
                          >
                            {hostelData.map((hostel, index) => (
                              <MenuItem key={index} value={hostel}>
                                {hostel}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </td>
                      <td className="text-center">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                          }}
                          type="text"
                          autoComplete="off"
                        >
                          <TextField
                            label="Enter Quantity"
                            variant="standard"
                            name="qtyInput"
                            value={row.qtyInput}
                            onChange={(event) => handleChange(index, event)}
                          />
                        </Box>
                      </td>
                      <td>
                        <button className="btn">
                          <FiEdit className="editicon" />
                        </button>
                        <button className="btn">
                          <MdDeleteOutline className="delicon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5 container">
            <div className="row mt-4">
              <h1
                style={{
                  fontSize: "20px",
                  marginTop: "25px",
                  marginLeft: "25px",
                  textDecoration: "underline",
                }}
              >
                Standard Milk Sale
              </h1>
              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  autoComplete="off"
                >
                  <TextField variant="standard" type="date" value={currDate} />
                </Box>
              </div>
              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard Opening Balance"
                    variant="standard"
                    value={stdopeningBalance}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard Closing Balance"
                    variant="standard"
                    value={stdclosingBalance}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard Product"
                    variant="standard"
                    value={stdproduct}
                    onChange={(e) => setStdproduct(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard DTM Sale Cash"
                    variant="standard"
                    value={stdSaleCash}
                    onChange={(e) => setStdSaleCash(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard DTM Sale Online"
                    variant="standard"
                    value={stdsaleOnline}
                    onChange={(e) => setStdsaleOnline(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard DTM Amount Cash"
                    variant="standard"
                    value={stdAmountCash}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard DTM Amount Online"
                    variant="standard"
                    value={stdAmountOnline}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard Rate"
                    variant="standard"
                    value={standardMilkRate}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard Final Total"
                    variant="standard"
                    value={stdfinalTotal}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Standard Total Quantity"
                    variant="standard"
                    value={stdtotalQty}
                    onChange={(e) => setStdtotalQty(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Cream"
                    variant="standard"
                    value={cream}
                    onChange={(e) => setCream(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Sahiwal Cream"
                    variant="standard"
                    value={sahiwalCream}
                    onChange={(e) => setSahiwalCream(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="Research"
                    variant="standard"
                    value={research}
                    onChange={(e) => setResearch(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="text"
                  autoComplete="off"
                >
                  <TextField
                    label="HLoss"
                    variant="standard"
                    value={hloss}
                    onChange={(e) => setHloss(e.target.value)}
                  />
                </Box>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                style={{
                  backgroundColor: "green",
                  padding: "5px",
                  border: "none",
                  color: "white",
                  outline: "none",
                  borderRadius: "7px",
                }}
                onClick={addSecondRow}
              >
                Add New Row
              </button>
            </div>
            <div className="container tableMaster mt-5 mb-3 p-0">
              <table className="table productTableMAster table-stripped">
                <thead className="tableheading">
                  <tr>
                    <th>SrNo</th>
                    <th>Hostel Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {secondTableAdd.map((row, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {index + 1}
                      </th>
                      <td>
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, width: "25ch" }}
                        >
                          <InputLabel
                            id="demo-simple-select-standard-label"
                            className="selectP"
                          >
                            Select Hostel
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Products"
                            MenuProps={MenuProps}
                            name="StdHosteldropdown"
                            value={row.StdHosteldropdown}
                            onChange={(event) => handleChange(index, event)}
                          >
                            {hostelData.map((hostel, index) => (
                              <MenuItem key={index} value={hostel}>
                                {hostel}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </td>
                      <td className="text-center">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                          }}
                          type="text"
                          autoComplete="off"
                        >
                          <TextField
                            label="Enter Quantity"
                            variant="standard"
                            name="standQty"
                            value={row.standQty}
                            onChange={(event) => handleChange(index, event)}
                          />
                        </Box>
                      </td>
                      <td className="text-center"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center"
              style={{ gap: "1rem" }}
            >
              <button className="savebtn" onClick={() => saveData()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DtmSave;

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
import { ToastContainer } from "react-toastify";
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

const DtmMilkSale = () => {
  const [rows, setRows] = useState([{ dropdown: "", input: "" }]);
  const [rows2, setRows2] = useState([{ dropdown: "", input: "" }]);
  const [openingBalance, setOpeningBalance] = useState("");
  const [product, setProduct] = useState("");
  const [tableData, setTableData] = useState([]);
  const [dtmSaleCash, setDtmSaleCash] = useState("");
  const [dtmsaleOnline, setDtmsaleOnline] = useState("");
  const [totalQty, setTotalQty] = useState("");
  const [rate] = useState("");
  const [date, setCurrentDate] = useState("");
  const [stdopeningBalance, setStdopeningBalance] = useState("");
  const [stdproduct, setStdproduct] = useState("");
  const [stdtableData, setStdtableData] = useState("");
  const [stdSaleCash, setStdSaleCash] = useState("");
  const [stdsaleOnline, setStdsaleOnline] = useState("");
  const [stdrate, setStdrate] = useState("");
  const [stdtotalQty, setStdtotalQty] = useState("");
  const [cream, setCream] = useState("");
  const [sahiwalCream, setSahiwalCream] = useState("");
  const [research, setResearch] = useState("");
  const [hloss, setHloss] = useState("");
  const [standardMilkRate, setStandardMilkRate] = useState("");
  const [dtmMilkRate, setDtmMilkRate] = useState("");

  const addRow = () => {
    setRows([...rows, { dropdown: "", input: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = rows.map((row, i) =>
      i === index ? { ...row, [name]: value } : row
    );
    setRows(newRows);
  };

  const addRow2 = () => {
    setRows2([...rows2, { dropdown: "", input: "" }]);
  };

  const handleInputChange2 = (index1, event) => {
    const { name, value } = event.target;
    const newRows2 = rows2.map((row1, i) =>
      i === index1 ? { ...row1, [name]: value } : row1
    );
    setRows2(newRows2);
  };

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

  const HandleSave = async () => {
    try {
      const res = await axios.post(
        "http://103.38.50.113:8080/DairyApplication/saveDtmMilkSales",
        {
          openingBalance,
          closingBalance,
          product,
          tableData: JSON.stringify(rows.map(row => ({ hostelName: row.dropdown, qty: row.input }))),
          dtmSaleCash,
          dtmsaleOnline,
          dtmAmountCash,
          dtmAmountOnline,
          finalTotal,
          totalQty,
          rate,
          date,
          stdopeningBalance,
          stdclosingBalance,
          stdproduct,
          stdtableData: JSON.stringify(rows2.map(row1 => ({ stdhostelName: row1.dropdown, stdQty: row1.input }))),
          stdSaleCash,
          stdsaleOnline,
          stdAmountCash,
          stdAmountOnline,
          stdrate,
          stdfinalTotal,
          stdtotalQty,
          cream,
          sahiwalCream,
          research,
          hloss,
        }
      );
      console.log(res.data);
    //   window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  useEffect(() => {
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

    fetchStdOpeningBalance();
  }, []);

  useEffect(() => {
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

    fetchOpeningBalance();
  }, []);

  useEffect(() => {
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

    fetchMilkRate();
  }, []);

  const CalculateTotals = () => {
    const dtmAmountCash = parseInt(dtmMilkRate) * parseInt(dtmSaleCash);
    const dtmAmountOnline =
      parseInt(standardMilkRate) * parseInt(dtmsaleOnline);
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

  return (
    <>
      {/* <div className='loader-Cont'>
                    <Bars
                        height="40"
                        width="80"
                        color="rgb(5, 165, 214)"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>  */}

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
                onChange={(e) => setOpeningBalance(e.target.value)}
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
              <TextField label="Rate" variant="standard" value={dtmMilkRate} />
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
              {rows.map((row, index) => (
                <tr key={index}>
                  <th scope="row" className="text-center">
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
                        value={row.dropdown}
                        onChange={(event) => handleInputChange(index, event)}
                      >
                        Select Hostel
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Products"
                        MenuProps={MenuProps}
                        value={tableData.hostelName}
                        onChange={(e) => setTableData(e.target.value)}
                      >
                        <MenuItem value="Ganesh">Ganesh</MenuItem>
                        <MenuItem value="Yash">Yash</MenuItem>
                        <MenuItem value="Tanmay">Tanmay</MenuItem>
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
                        value={tableData.qty}
                        onChange={(e) => setTableData(e.target.value)}
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
              <TextField
                variant="standard"
                type="date"
                value={date}
                onChange={(e) => setCurrentDate(e.target.value)}
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
                label="Standard Opening Balance"
                variant="standard"
                value={stdopeningBalance}
                onChange={(e) => setStdopeningBalance(e.target.value)}
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
                onChange={(e) => setStdrate(e.target.value)}
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
            onClick={addRow2}
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
              {rows2.map((row1, index1) => (
                <tr key={index1}>
                  <th scope="row" className="text-center">
                    {index1 + 1}
                  </th>
                  <td className="text-center">
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, width: "25ch" }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        className="selectP"
                        value={row1.dropdown}
                        onChange={(event) => handleInputChange2(index1, event)}
                      >
                        Select Hostel
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Products"
                        MenuProps={MenuProps}
                        value={stdtableData.stdhostelName}
                        onChange={(e) => setStdtableData(e.target.value)}
                      >
                        <MenuItem value="Ganesh">Ganesh</MenuItem>
                        <MenuItem value="Yash">Yash</MenuItem>
                        <MenuItem value="Tanmay">Tanmay</MenuItem>
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
                        value={stdtableData.stdQty}
                        onChange={(e) => setStdtableData(e.target.value)}
                      />
                    </Box>
                  </td>
                  <td className="text-center">{}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center"
          style={{ gap: "1rem" }}
        >
          <button
            className="savebtn"
            onClick={() => {
              HandleSave();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default DtmMilkSale;

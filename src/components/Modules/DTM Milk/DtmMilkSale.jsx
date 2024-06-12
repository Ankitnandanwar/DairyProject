import CancelIcon from "@mui/icons-material/Cancel";
import { Button, DialogActions, DialogTitle, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as FileSaver from 'file-saver';
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Bars } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import "../Product/Product.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    { hostelName: "", qty: "", dtmrate: "", dtmamount: "" },
  ]);
  const [secondTableAdd, setSecondTableAdd] = useState([
    { stdhostelName: "", stdQty: "", stdrate: "", stdamount: "" },
  ]);

  const [delid, setdelid] = useState();

  const [hostelData, setHostelData] = useState([]);

  const [openingBalance, setOpeningBalance] = useState("");
  const [stdopeningBalance, setStdopeningBalance] = useState("");

  const [opendailogdel, setopendailogdel] = useState(false);
  const [product, setProduct] = useState("");

  const [hotelMilkRate, setHotelMilkRate] = useState(0);

  const [dtmMilkRate, setDtmMilkRate] = useState("");
  const [dtmSaleCash, setDtmSaleCash] = useState("");
  const [standardMilkRate, setStandardMilkRate] = useState("");
  const [dtmsaleOnline, setDtmsaleOnline] = useState("");
  // const [totalQty, setTotalQty] = useState("");

  // second table usestate
  const [stdproduct, setStdproduct] = useState("");
  const [stdSaleCash, setStdSaleCash] = useState("");
  const [stdsaleOnline, setStdsaleOnline] = useState("");
  // const [stdtotalQty, setStdtotalQty] = useState("");
  const [cream, setCream] = useState("");
  const [sahiwalCream, setSahiwalCream] = useState("");
  const [research, setResearch] = useState("");
  const [hloss, setHloss] = useState("");
  const [remark, setRemark] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [editItem, setEditItem] = useState(null);

  const [loader, setLoader] = useState(true);

  const [prodTableData, setProdTableData] = useState([]);


  const [currDate, setCurrDate] = useState("");

  const [dynamicRowsTotal, setDynamicRowsTotal] = useState(0);
  const [dynamicRowsTotal2, setDynamicRowsTotal2] = useState(0);

  const [bulkMilkRate, setBulkMilkRate] = useState('')

  


  // Adding row of first table
  const addRow = () => {
    setfirstTableAdd([
      ...firstTableAdd,
      { hostelName: "", qty: "", dtmrate: "", dtmamount: "" },
    ]);
  };

  const deleteRow = (index) => {
    const list = [...firstTableAdd];
    list.splice(index, 1);
    setfirstTableAdd(list);
  };

  const addSecondRow = () => {
    setSecondTableAdd([
      ...secondTableAdd,
      { stdhostelName: "", stdQty: "", stdrate: "", stdamount: "" },
    ]);
  };

  const deleteRow1 = (index) => {
    const list = [...secondTableAdd];
    list.splice(index, 1);
    setSecondTableAdd(list);
  };


  const handleFirstTableChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...firstTableAdd];
    list[index][name] = value;

    if(name === "hostelName"){
      if(value === 'Bulk'){
        list[index]['dtmrate'] = bulkMilkRate;
      }else {
        list[index]['dtmrate'] = hotelMilkRate;
      }
    }

    if (name === "qty" || name === "dtmrate") {
      const qty = parseFloat(list[index].qty);
      const rate = parseFloat(list[index].dtmrate);
      list[index].dtmamount = list[index].qty * hotelMilkRate; 
    }
    setfirstTableAdd(list);
  };

  const handleSecondTableChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...secondTableAdd];
    list[index][name] = value;

    if(name === 'stdhostelName'){
      if(value === 'Bulk'){
        list[index]['stdrate'] = bulkMilkRate;
      }else {
        list[index]['stdrate'] = hotelMilkRate;
      }
    }

    if (name === "stdQty" || name === "stdrate") {
      const stdQty = parseFloat(list[index].stdQty);
      const stdrate = parseFloat(list[index].stdrate);
      list[index].stdamount = list[index].stdQty * hotelMilkRate; 
    }
    setSecondTableAdd(list);
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
        setTimeout(() => { }, 1000);
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
        setTimeout(() => { }, 1000);
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
        setHotelMilkRate(MilkRate[0].hotelMilkRate);
        setStandardMilkRate(MilkRate[0].standardMilkRate);
        setDtmMilkRate(MilkRate[0].dtmMilkRate);
        setBulkMilkRate(MilkRate[0].salingMilkRate)
        // console.log(MilkRate[0].salingMilkRate)
        console.log(response.data)
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
    const totalQty = parseInt(product) + parseInt(dtmsaleOnline) + parseInt(dtmSaleCash) + dynamicRowsTotal
    // console.log(totalQty)
    const dtmAmountCash = parseInt(dtmMilkRate) * parseInt(dtmSaleCash);
    const dtmAmountOnline = parseInt(dtmMilkRate) * parseInt(dtmsaleOnline);
    const finalTotal = parseInt(dtmAmountCash) + parseInt(dtmAmountOnline);
    const closingBalance = parseInt(openingBalance) - parseInt(totalQty);
    const stdAmountCash = parseInt(standardMilkRate) * parseInt(stdSaleCash);
    const stdAmountOnline =
      parseInt(standardMilkRate) * parseInt(stdsaleOnline);
    const stdfinalTotal = parseInt(stdAmountCash) + parseInt(stdAmountOnline);
      const stdtotalQty = parseInt(stdproduct) + parseInt(stdSaleCash)+ parseInt(stdsaleOnline) + dynamicRowsTotal2
      const stdclosingBalance =
      parseInt(stdopeningBalance) 
       - parseInt(stdtotalQty);

    return {
      dtmAmountCash,
      dtmAmountOnline,
      finalTotal,
      closingBalance,
      stdAmountCash,
      stdAmountOnline,
      stdfinalTotal,
      stdclosingBalance,
      totalQty,
      stdtotalQty

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
    totalQty,
    stdtotalQty
  } = CalculateTotals();


  const saveData = async () => {
    try {
      if (editItem) {
        await axios.put(
          `http://103.38.50.113:8080/DairyApplication/updateDtmMilkSale/${editItem.id}`,
          {
            openingBalance,
            closingBalance,
            product,
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
            remark,
          }
        );
        toast.success("Data Updated Successfully", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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
            remark,
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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        console.log(resp);
      }

      setOpeningBalance("");
      setProduct("");
      setDtmSaleCash("");
      setDtmsaleOnline("");
      setStdproduct("");
      setStdopeningBalance("");
      setStdSaleCash("");
      setStdsaleOnline("");
      setCream("");
      setSahiwalCream("");
      setResearch("");
      setHloss("");
      setRemark("");
      setEditItem(null);

      // Refresh the product data
      getProductData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const getProductData = async () => {
    setLoader(true);
    try {
      await axios
        .get("http://103.38.50.113:8080/DairyApplication/fetchDtmMilkSale")
        .then((res) => {
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
    getProductData();
  }, []);

  const dele = (id) => {
    setdelid(id);
    setopendailogdel(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setopendailogdel(false);
  };

  const handledel = async () => {
    let delobj = {
      id: delid,
    };

    try {
      await axios
        .post(
          "http://103.38.50.113:8080/DairyApplication/deleteDtmMilkSale",
          delobj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resdel) => {
          console.log(resdel.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

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
          <DialogActions style={{ height: "2.5rem" }}>
            <IconButton onClick={handleClose}>
              <CancelIcon style={{ color: "blue" }} />
            </IconButton>
          </DialogActions>
          <div style={{ background: "white" }}>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogActions>
              <Button onClick={handledel}>Yes</Button>
              <Button onClick={handleClose}>No</Button>
            </DialogActions>
          </div>
        </Dialog>
      </>
    );
  };

  // Edit data
  const editItemHandler = (item) => {
    setProduct(item.product);
    setOpeningBalance(item.openingBalance);
    setDtmSaleCash(item.dtmSaleCash);
    setDtmsaleOnline(item.dtmsaleOnline);
    setStdproduct(item.stdproduct);
    setStdopeningBalance(item.stdopeningBalance);
    setStdSaleCash(item.stdSaleCash);
    setStdsaleOnline(item.stdsaleOnline);
    setCream(item.cream);
    setSahiwalCream(item.sahiwalCream);
    setResearch(item.research);
    setHloss(item.hloss);
    setRemark(item.remark)
    setEditItem(item);
  };

  const exportToExcel = async () => {
    const fileName = "DTM Milk Sale";
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";


    const ws = XLSX.utils.json_to_sheet(prodTableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};


  useEffect(() => {
    const sum = firstTableAdd.reduce((acc, row)=> acc + parseFloat(row.qty)||0, 0)
    setDynamicRowsTotal(sum);
  }, [firstTableAdd])

  useEffect(() => {
    const sum2 = secondTableAdd.reduce((acc, row) => acc + parseFloat(row.stdQty)|| 0, 0)
    // console.log(sum2)
    setDynamicRowsTotal2(sum2)
  }, [secondTableAdd])
  
  

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
              {dailoge()}
              <h3
                className="text-center mt-3"
                style={{ textDecoration: "underline" }}
              >
                MILK SALE
              </h3>
            </div>
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
                    // onChange={(e) => setTotalQty(e.target.value)}
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
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {firstTableAdd.map((row, index) => (
                    <tr key={index}>
                      <td scope="row" className="text-center">
                        {index + 1}
                      </td>
                      <td className="text-center">
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, width: "18ch" }}
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
                            name="hostelName"
                            value={row.hostelName}
                            onChange={(event) => handleFirstTableChange(index, event)}
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
                            "& > :not(style)": { m: 1, width: "18ch" },
                          }}
                          type="text"
                          autoComplete="off"
                        >
                          <TextField
                            label="Enter Quantity"
                            variant="standard"
                            name="qty"
                            value={row.qty}
                            onChange={(event) => handleFirstTableChange(index, event)}
                          />
                        </Box>
                      </td>
                      <td className="text-center">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "18ch" },
                          }}
                          type="text"
                          autoComplete="off"
                        >
                          <TextField
                            label="Enter Rate"
                            variant="standard"
                            name="dtmrate"
                            value={row.dtmrate}
                            onChange={(event) => handleFirstTableChange(index, event)}
                          />
                        </Box>
                      </td>
                      <td className="text-center">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "18ch" },
                          }}
                          type="text"
                          autoComplete="off"
                        >
                          <TextField
                            label="Enter Amount"
                            variant="standard"
                            name="dtmamount"
                            value={row.dtmamount}
                          />
                        </Box>
                      </td>
                      <td>
                        <button className="btn"onClick={() => deleteRow(index)}>
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
                    // onChange={(e) => setStdtotalQty(e.target.value)}
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
                    label="Remark"
                    variant="standard"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
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
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {secondTableAdd.map((row, index) => (
                    <tr key={index}>
                      <td scope="row" className="text-center">
                        {index + 1}
                      </td>
                      <td>
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, width: "18ch" }}
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
                            name="stdhostelName"
                            value={row.stdhostelName}
                            onChange={(event) => handleSecondTableChange(index, event)}
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
                            "& > :not(style)": { m: 1, width: "18ch" },
                          }}
                          type="text"
                          autoComplete="off"
                        >
                          <TextField
                            label="Enter Quantity"
                            variant="standard"
                            name="stdQty"
                            value={row.stdQty}
                            onChange={(event) => handleSecondTableChange(index, event)}
                          />
                        </Box>
                      </td>
                      <td className="text-center">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "18ch" },
                          }}
                          type="text"
                          autoComplete="off"
                        >
                          <TextField
                            label="Enter STD Rate"
                            variant="standard"
                            name="stdrate"
                            value={row.stdrate}
                            onChange={(event) => handleSecondTableChange(index, event)}
                          />
                        </Box>
                      </td>
                      <td className="text-center">
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "18ch" },
                          }}
                          type="text"
                          autoComplete="off"
                        >
                          <TextField
                            label="Enter STD Amount"
                            variant="standard"
                            name="stdamount"
                            value={row.stdamount}
                          />
                        </Box>
                      </td>
                      <td>
                        <button className="btn"onClick={() => deleteRow1(index)}>
                          <MdDeleteOutline className="delicon" />
                        </button>
                      </td>
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
              <button className='btn btn-success' onClick={()=>exportToExcel()}>Export To Excel</button>

            </div>
             <div className="container tableMaster mt-5 mb-3 p-0">
              <table className="table productTableMAster table-stripped">
                <thead className="tableheading">
                  <tr>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      SrNo
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      Date
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Opening Balance
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Closing Balance
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Product
                    </th>
                    <th style={{ width: "600px" }} colSpan={4}>
                      Table Data (Hostel Name and Quantity)
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Sale Cash
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Sale Online
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Amount Cash
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Amount Online
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Final Total
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Total Quantity
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      DTM Rate
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      Action
                    </th>
                  </tr>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="border">
                  {prodTableData.map((item, i) => {
                    const tableData = JSON.parse(item.tableData);
                    return (
                      <tr key={i}>
                        <th scope="row" className="text-center">
                          {i + 1}
                        </th>
                        <td>{item.date}</td>
                        <td>{item.openingBalance}</td>
                        <td>{item.closingBalance}</td>
                        <td>{item.product}</td>
                        <td colSpan={4}>
                          {tableData.map((td, index) => (
                            <tr key={index}>
                              <td style={{ width: "150px" }}>
                                {td.hostelName}
                              </td>
                              <td style={{ width: "150px" }}>{td.qty}</td>
                              <td style={{ width: "150px" }}>{td.dtmrate}</td>
                              <td style={{ width: "150px" }}>{td.dtmamount}</td>
                            </tr>
                          ))}
                        </td>
                        <td>{item.dtmSaleCash}</td>
                        <td>{item.dtmsaleOnline}</td>
                        <td>{item.dtmAmountCash}</td>
                        <td>{item.dtmAmountOnline}</td>
                        <td>{item.finalTotal}</td>
                        <td>{item.totalQty}</td>
                        <td>{item.rate}</td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => editItemHandler(item.id)}
                          >
                            <FiEdit className="editicon" />
                          </button>
                          <button className="btn" onClick={() => dele(item.id)}>
                            <MdDeleteOutline className="delicon" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="container tableMaster mt-5 mb-3 p-0">
              <table className="table productTableMAster table-stripped">
                <thead className="tableheading">
                  <tr>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      SrNo
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      Date
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Opening Balance
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Closing Balance
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Product
                    </th>
                    <th style={{ width: "600px" }} colSpan={4}>
                      STD Table Data (Hostel Name and Quantity)
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Sale Cash
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Sale Online
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Amount Cash
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Amount Online
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Rate
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Final Total
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      STD Total Quantity
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      Cream
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      Research
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      Sahiwal Cream
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      HLoss
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      Remark
                    </th>
                    <th style={{ width: "180px" }} rowSpan={2}>
                      Action
                    </th>
                  </tr>
                  <tr>
                    <th>STD Product</th>
                    <th>STD Quantity</th>
                    <th>STD Rate</th>
                    <th>STD Amount</th>
                  </tr>
                </thead>
                <tbody className="border">
                  {prodTableData.map((item, i) => {
                    const stdTableData = JSON.parse(item.stdtableData);
                    return (
                      <tr key={i}>
                        <th scope="row" className="text-center">
                          {i + 1}
                        </th>
                        <td>{item.date}</td>
                        <td>{item.stdopeningBalance}</td>
                        <td>{item.stdclosingBalance}</td>
                        <td>{item.stdproduct}</td>
                        <td colSpan={4}>
                          {stdTableData.map((td, index) => (
                            <tr key={index}>
                              <td style={{ width: "150px" }}>
                                {td.stdhostelName}
                              </td>
                              <td style={{ width: "150px" }}>{td.stdQty}</td>
                              <td style={{ width: "150px" }}>{td.stdrate}</td>
                              <td style={{ width: "150px" }}>{td.stdamount}</td>
                            </tr>
                          ))}
                        </td>
                        <td>{item.stdSaleCash}</td>
                        <td>{item.stdsaleOnline}</td>
                        <td>{item.stdAmountCash}</td>
                        <td>{item.stdAmountOnline}</td>
                        <td>{item.stdrate}</td>
                        <td>{item.stdfinalTotal}</td>
                        <td>{item.stdtotalQty}</td>
                        <td>{item.cream}</td>
                        <td>{item.research}</td>
                        <td>{item.sahiwalCream}</td>
                        <td>{item.hloss}</td>
                        <td>{item.remark}</td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => editItemHandler(item.id)}
                          >
                            <FiEdit className="editicon" />
                          </button>
                          <button className="btn" onClick={() => dele(item.id)}>
                            <MdDeleteOutline className="delicon" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DtmSave;

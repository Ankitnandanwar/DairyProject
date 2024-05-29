import CancelIcon from '@mui/icons-material/Cancel';
import { Button, DialogActions, DialogTitle, IconButton } from '@mui/material';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slide from '@mui/material/Slide';
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Bars } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    { hostelName: "", qty: "" },
  ]);
  const [secondTableAdd, setSecondTableAdd] = useState([
    { stdhostelName: "", stdQty: "" },
  ]);

  const [delid, setdelid] = useState()

  const [hostelData, setHostelData] = useState([]);

  const [openingBalance, setOpeningBalance] = useState("");
  const [stdopeningBalance, setStdopeningBalance] = useState("");

  const [opendailogdel, setopendailogdel] = useState(false)
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [editItem, setEditItem] = useState(null);

  const [loader, setLoader] = useState(true);

  const [prodTableData, setProdTableData] = useState([]);

  const [showtable, setshowtable] = useState(false);

  const [currDate, setCurrDate] = useState("");

  // Adding row of first table
  const addRow = () => {
    setfirstTableAdd([...firstTableAdd, { hostelName: "", qty: "" }]);
  };

  const addSecondRow = () => {
    setSecondTableAdd([...secondTableAdd, { stdhostelName: "", stdQty: "" }]);
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
        if (editItem) {
            await axios.put(`http://103.38.50.113:8080/DairyApplication/updateDtmMilkSale/${editItem.id}`, {
              openingBalance,
              closingBalance,
              product,
              // tableData: JSON.stringify(firstTableAdd),
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
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            console.log(resp)
        }

        setProduct("");
        setDtmSaleCash("");
        setDtmsaleOnline("");
        setTotalQty("")
        // setfirstTableAdd("");
        setStdproduct("");
        setStdSaleCash("");
        setStdsaleOnline("");
        stdtotalQty("");
        setCream("");
        setSahiwalCream("");
        setResearch("");
        setHloss("");
        // setSecondTableAdd("")
        setEditItem(null);

        // Refresh the product data
        getProductData();
    } catch (error) {
        console.log(error)
    }
}

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
        await axios.post("http://103.38.50.113:8080/DairyApplication/deleteDtmMilkSale", delobj, {
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
  setProduct(item.product);
  setDtmSaleCash(item.dtmSaleCash);
  setDtmsaleOnline(item.dtmsaleOnline);
  setTotalQty(item.totalQty);
  // setfirstTableAdd(item.firstTableAdd);
  setStdproduct(item.stdproduct)
  setStdSaleCash(item.stdSaleCash)
  setStdsaleOnline(item.stdsaleOnline)
  setStdtotalQty(item.stdtotalQty);
  setCream(item.cream)
  setSahiwalCream(item.sahiwalCream)
  setResearch(item.research);
  setHloss(item.hloss)
  // setSecondTableAdd(item.secondTableAdd);
  setEditItem(item);
};

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
                            name="qty"
                            value={row.qty}
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
                      <th scope="row" className="text-center">
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
                            name="stdhostelName"
                            value={row.stdhostelName}
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
                            name="stdQty"
                            value={row.stdQty}
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
              <button
                className="tabelbtn"
                onClick={() => setshowtable(!showtable)}
              >
                Show table
              </button>
            </div>
            {showtable ? (
              <div className="container tableMaster mt-5 mb-3 p-0">
                <table className="table productTableMAster table-stripped">
                  <thead className="tableheading">
                    <tr>
                      <th style={{ width: "180px" }}>SrNo</th>
                      <th style={{ width: "180px" }}>Date</th>
                      <th style={{ width: "180px" }}>DTM Opening Balance</th>
                      <th style={{ width: "180px" }}>DTM Closing Balance</th>
                      <th style={{ width: "180px" }}>DTM Product</th>
                      <th style={{ width: "180px" }}>
                        Table Data (Hostel Name and Quantity)
                      </th>
                      <th style={{ width: "180px" }}>DTM Sale Cash</th>
                      <th style={{ width: "180px" }}>DTM Sale Online</th>
                      <th style={{ width: "180px" }}>DTM Amount Cash</th>
                      <th style={{ width: "180px" }}>DTM Amount Online</th>
                      <th style={{ width: "180px" }}>DTM Final Total</th>
                      <th style={{ width: "180px" }}>DTM Total Quantity</th>
                      <th style={{ width: "180px" }}>DTM Rate</th>
                      <th style={{ width: "180px" }}>STD Opening Balance</th>
                      <th style={{ width: "180px" }}>STD Closing Balance</th>
                      <th style={{ width: "180px" }}>STD Product</th>
                      <th style={{ width: "180px" }}>
                        STD Table Data (Hostel Name and Quantity)
                      </th>
                      <th style={{ width: "180px" }}>STD Sale Cash</th>
                      <th style={{ width: "180px" }}>STD Sale Online</th>
                      <th style={{ width: "180px" }}>STD Amount Cash</th>
                      <th style={{ width: "180px" }}>STD Amount Online</th>
                      <th style={{ width: "180px" }}>STD Rate</th>
                      <th style={{ width: "180px" }}>STD Final Total</th>
                      <th style={{ width: "180px" }}>STD Total Quantity</th>
                      <th style={{ width: "180px" }}>Cream</th>
                      <th style={{ width: "180px" }}>Research</th>
                      <th style={{ width: "180px" }}>Sahiwal Cream</th>
                      <th style={{ width: "180px" }}>HLoss</th>
                      <th style={{ width: "180px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="border">
                    {prodTableData.map((item, i) => {
                      const tableData = JSON.parse(item.tableData);
                      const stdTableData = JSON.parse(item.stdtableData);
                      return (
                        <tr key={i}>
                          <th scope="row" className="text-center">
                            {i + 1}
                          </th>
                          <td>{item.date}</td>
                          <td>{item.openingBalance}</td>
                          <td>{item.closingBalance}</td>
                          <td>{item.product}</td>
                          <td>
                            {tableData.map((td, index) => (
                              <div key={index}>
                                {td.hostelName} : {td.qty}
                              </div>
                            ))}
                          </td>
                          <td>{item.dtmSaleCash}</td>
                          <td>{item.dtmsaleOnline}</td>
                          <td>{item.dtmAmountCash}</td>
                          <td>{item.dtmAmountOnline}</td>
                          <td>{item.finalTotal}</td>
                          <td>{item.totalQty}</td>
                          <td>{item.rate}</td>
                          <td>{item.stdopeningBalance}</td>
                          <td>{item.stdclosingBalance}</td>
                          <td>{item.stdproduct}</td>
                          <td>
                            {stdTableData.map((td, index) => (
                              <div key={index}>
                                {td.stdhostelName} : {td.stdQty}
                              </div>
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
                          <td>
                            <button 
                            className="btn"
                            onClick={() => editItemHandler(item.id)}>
                              <FiEdit className="editicon" 
                              />
                            </button>
                            <button
                              className="btn"
                              onClick={() => dele(item.id)}
                            >
                              <MdDeleteOutline className="delicon" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default DtmSave;

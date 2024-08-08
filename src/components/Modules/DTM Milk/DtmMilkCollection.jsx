import CancelIcon from "@mui/icons-material/Cancel";
import { Button, DialogActions, DialogTitle, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as FileSaver from "file-saver";
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

const DtmMilkCollection = () => {
  const [loader, setLoader] = useState(true);
  const [showtable, setshowtable] = useState(false);

  const [date, setCurrentDate] = useState("");

  const [openingBalance, setOpeningBalance] = useState("");

  const [cowmilk, setCowmilk] = useState("");
  const [buffaloMilk, setBuffaloMilk] = useState("");
  const [mixMilk, setMixMilk] = useState("");
  
  const [dtmMilk, setDtmMilk] = useState("");

  // const [cream, setCream] = useState("")
  const [openingCream, setOpeningCream] = useState("");

  const [opningSahiwalCream, setOpningSahiwalCream] = useState("");
  const [sahiwalDtmMilk, setSahiwalDtmMilk] = useState("");

  const [sahiwalMilk, setSahiwalMilk] = useState("");

  const [prodTableData, setProdTableData] = useState([]);

  const [opendailogdel, setopendailogdel] = useState(false);
  const [delid, setdelid] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [editItem, setEditItem] = useState(null);

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

  const fetchLastClosingDTMCream = async () => {
    try {
      const fetchDTMCream = await axios.get("http://103.14.99.198:8082/DairyApplication/lastClosingCream")
      const lastClosingCream = fetchDTMCream.data;

        setOpeningCream(lastClosingCream);
        setTimeout(() => {
          setLoader(false);
        }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchLastClosingSahiwalCream = async () => {
    try {
      const fetchSahiwalCream = await axios.get("http://103.14.99.198:8082/DairyApplication/lastClosingSahiwalCream")
      console.log(fetchSahiwalCream.data)
        setOpningSahiwalCream(fetchSahiwalCream.data);
        setTimeout(() => {
          setLoader(false);
        }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  // Save data
  const saveData = async () => {
    try {
      if (editItem) {
        await axios.put(
          `http://103.14.99.198:8082/DairyApplication/updateDTmMilkCollection/${editItem.id}`,
          {
            date,
            openingBalance,
            cowmilk,
            buffaloMilk,
            mixMilk,
            totalMilk,
            dtmMilk,
            cream,
            closingBalance,
            openingCream,
            closingCream,
            sahiwalMilk,
            sahiwalDtmMilk,
            sahiwalCream,
            opningSahiwalCream,
            closingSahiwalCream,
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
        const res = await axios.post(
          "http://103.14.99.198:8082/DairyApplication/saveDtmMilkCollection",
          {
            date,
            openingBalance,
            cowmilk,
            buffaloMilk,
            mixMilk,
            totalMilk,
            dtmMilk,
            cream,
            closingBalance,
            openingCream,
            closingCream,
            sahiwalMilk,
            sahiwalDtmMilk,
            sahiwalCream,
            opningSahiwalCream,
            closingSahiwalCream,
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
        console.log(res);
      }

      setCurrentDate("");
      setOpeningBalance("");
      setCowmilk("");
      setBuffaloMilk("");
      setMixMilk("");
      setDtmMilk("");
      setOpeningCream("");
      setSahiwalMilk("");
      setSahiwalDtmMilk("")
      setOpningSahiwalCream("");
      setEditItem(null);

      // Refresh the product data
      getProductData();
    } catch (error) {
      console.log(error);
    }
  };

  // Show Data
  const getProductData = async () => {
    setLoader(true);
    try {
      await axios
        .get("http://103.14.99.198:8082/DairyApplication/findDtmMilkCollection")
        .then((res) => {
          setProdTableData(res.data);
          setCurrentDate(getCurrentDate());
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
    // fetchGetCream();
    // fetchGetSahiwalCream();
  }, []);

  // Delete Data
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
          "http://103.14.99.198:8082/DairyApplication/deleteDtmMilkCollections",
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

  useEffect(() => {
    setLoader(true);

    const fetchClosingBalance = async () => {
      try {
        const response = await axios.get(
          "http://103.14.99.198:8082/DairyApplication/dtmClosingBalance"
        );
        const lastClosingBalance = response.data;
        setOpeningBalance(lastClosingBalance);
        fetchLastClosingSahiwalCream("");
        fetchLastClosingDTMCream("");
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching closing balance:", error);
        setLoader(false);
      }
    };

    fetchClosingBalance();
  }, []);

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
    setOpeningBalance(item.openBalance);
    setCowmilk(item.cowmilk);
    setBuffaloMilk(item.buffaloMilk);
    setMixMilk(item.mixMilk);
    setDtmMilk(item.dtmMilk);
    setOpeningCream(item.openingCream);
    setSahiwalMilk(item.sahiwalMilk);
    setSahiwalDtmMilk(item.sahiwalDtmMilk);
    setOpningSahiwalCream(item.opningSahiwalCream);
    setEditItem(item);
  };

  const CalculateTotals = () => {
    const totalMilk =
      parseInt(cowmilk) +
      parseInt(buffaloMilk) +
      parseInt(mixMilk);
    const cream = parseInt(totalMilk) - parseInt(dtmMilk);
    const closingBalance = parseInt(openingBalance) + parseInt(dtmMilk);
    const closingCream = parseInt(openingCream) + parseInt(cream);
    const sahiwalCream = parseInt(sahiwalMilk) - parseInt(sahiwalDtmMilk) ;
    const closingSahiwalCream =
      parseInt(opningSahiwalCream) + parseInt(sahiwalCream);
    return {
      closingBalance,
      totalMilk,
      closingCream,
      sahiwalCream,
      closingSahiwalCream,
      cream,
    };
  };

  const {
    closingBalance,
    totalMilk,
    closingCream,
    sahiwalCream,
    closingSahiwalCream,
    cream,
  } = CalculateTotals();

  const exportToExcel = async () => {
    const fileName = "DTM Milk Collection";
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
        <div className="container mt-4">
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
              DTM Milk Preparation
            </h3>
            <div className="row mt-4">
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
                <div class="textfield">
                  <input
                    class="inputfield"
                    type="text"
                    required
                    value={openingBalance}
                    onChange={(e) => setOpeningBalance(e.target.value)}
                  />
                  <span></span>
                  <label class="inputlabels">DTM Opening Balance</label>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  autoComplete="off"
                >
                  <TextField
                    label="Cow Milk"
                    variant="standard"
                    value={cowmilk}
                    onChange={(e) => setCowmilk(e.target.value)}
                  />
                </Box>
              </div>
              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Buffalo Milk"
                    variant="standard"
                    value={buffaloMilk}
                    onChange={(e) => setBuffaloMilk(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Mix  Milk"
                    variant="standard"
                    value={mixMilk}
                    onChange={(e) => setMixMilk(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Total Milk"
                    variant="standard"
                    value={totalMilk}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="DTM Milk"
                    variant="standard"
                    value={dtmMilk}
                    onChange={(e) => setDtmMilk(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField label="Cream" variant="standard" value={cream} />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="DTM Closing Balance"
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
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Opening Cream"
                    variant="standard"
                    value={openingCream}
                    onChange={(e) => setOpeningCream(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Closing Cream"
                    variant="standard"
                    value={closingCream}
                  />
                </Box>
              </div>

              <div></div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 mt-4 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  autoComplete="off"
                >
                  <TextField
                    label="Sahiwal Milk"
                    variant="standard"
                    value={sahiwalMilk}
                    onChange={(e) => setSahiwalMilk(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 mt-4 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Sahiwal Dtm Milk"
                    variant="standard"
                    value={sahiwalDtmMilk}
                    onChange={(e) => setSahiwalDtmMilk(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 mt-4 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Sahiwal Cream"
                    variant="standard"
                    value={sahiwalCream}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 mt-4 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Opening Sahiwal Cream"
                    variant="standard"
                    value={opningSahiwalCream}
                    onChange={(e) => setOpningSahiwalCream(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-3 col-md-6 mt-4 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Closing Sahiwal Cream"
                    variant="standard"
                    value={closingSahiwalCream}
                  />
                </Box>
              </div>

              <div
                className="col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center"
                style={{ gap: "1rem" }}
              >
                <button
                  className="savebtn"
                  onClick={() => {
                    saveData();
                  }}
                >
                  Save
                </button>
                <button
                  className="tabelbtn"
                  onClick={() => setshowtable(!showtable)}
                >
                  Show table
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => exportToExcel()}
                >
                  Export To Excel
                </button>
              </div>

              {/*Table Code */}

              {showtable ? (
                <div className="container tableMaster mt-5 mb-3 p-0">
                  <table className="table productTableMAster table-stripped">
                    <thead className="tableheading">
                      <tr>
                        <th style={{ width: "80px" }}>SrNo</th>
                        <th style={{ width: "150px" }}>Date</th>
                        <th style={{ width: "150px" }}>Opening Balance</th>
                        <th style={{ width: "150px" }}>Cow Milk</th>
                        <th style={{ width: "150px" }}>Buffalo Milk</th>
                        <th style={{ width: "150px" }}>Mix Milk</th>
                        <th style={{ width: "150px" }}>Total Milk</th>
                        <th style={{ width: "150px" }}>DTM Milk</th>
                        <th style={{ width: "150px" }}>Cream</th>
                        <th style={{ width: "150px" }}>Closing Balance</th>
                        <th style={{ width: "150px" }}>Opening Cream</th>
                        <th style={{ width: "150px" }}>Closing Cream</th>
                        <th style={{ width: "150px" }}>Sahiwal Milk</th>
                        <th style={{ width: "150px" }}>Sahiwal DTM Milk</th>
                        <th style={{ width: "150px" }}>Sahiwal Cream</th>
                        <th style={{ width: "150px" }}>
                          Opening Sahiwal Cream
                        </th>
                        <th style={{ width: "150px" }}>
                          Closing Sahiwal Cream
                        </th>
                        <th style={{ width: "150px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody className="border">
                      {prodTableData.map((item, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row" className="text-center">
                              {i + 1}
                            </th>
                            <td>{item.date}</td>
                            <td>{item.openingBalance}</td>
                            <td>{item.cowmilk}</td>
                            <td>{item.buffaloMilk}</td>
                            <td>{item.mixMilk}</td>
                            <td>{item.totalMilk}</td>
                            <td>{item.dtmMilk}</td>
                            <td>{item.cream}</td>
                            <td>{item.closingBalance}</td>
                            <td>{item.openingCream}</td>
                            <td>{item.closingCream}</td>
                            <td>{item.sahiwalMilk}</td>
                            <td>{item.sahiwalDtmMilk}</td>
                            <td>{item.sahiwalCream}</td>
                            <td>{item.opningSahiwalCream}</td>
                            <td>{item.closingSahiwalCream}</td>
                            <td>
                              <button
                                className="btn"
                                onClick={() => editItemHandler(item)}
                              >
                                <FiEdit className="editicon" />
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
        </div>
      )}
    </>
  );
};

export default DtmMilkCollection;

import CancelIcon from "@mui/icons-material/Cancel";
import { Button, DialogActions, DialogTitle, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Bars } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GheeEntry = () => {
  const [loader, setLoader] = useState(true);

  const [showtable, setshowtable] = useState(false);
  const [showSahiwaltable, setSahiwalshowtable] = useState(false);

  const [currentDate, setCurrentDate] = useState("");

  const [date, setDate] = useState("");
  const [cream, setGetCream] = useState("");
  const [openingGhee, setOpeningGhee] = useState("");
  const [creamUsed, setCreamUsed] = useState("");
  const [ghee, setGhee] = useState("");

  const [sahiwaldate, setSahiwalDate] = useState("");
  const [openingSahiwalGhee, setSahiwalOpeningGhee] = useState("");
  const [creamSahiwal, setGetSahiwalCream] = useState("");
  const [creamUsedSahiwal, setCreamUsedSahiwal] = useState("");
  const [gheeSahiwal, setGheeSahiwal] = useState("");

  const [showGheeData, setShowGheeData] = useState([]);
  const [showSahiwalGheeData, setSahiwalShowGheeData] = useState([]);

  const [editItem, setEditItem] = useState(null);
  const [delid, setdelid] = useState();
  const [delid1, setdelid1] = useState();


  const [opendailogdel, setopendailogdel] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchGetCream = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        "http://103.14.99.198:8082/DairyApplication/lastClosingCream"
      );
      console.log(res.data);
      setGetCream(res.data);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } catch (error) {
      console.log("Error while fetching Get Cream", error);
    }
  };

  const calcream = () => {
    const readycream = cream - parseInt(creamUsed)
    const readsahwalcream = creamSahiwal - parseInt(creamUsedSahiwal)
    return {readycream, readsahwalcream}
  }

  const {readycream,readsahwalcream} = calcream()

  const fetchGetSahiwalCream = async () => {
    setLoader(true);

    try {
      const res = await axios.get(
        "http://103.14.99.198:8082/DairyApplication/lastClosingSahiwalCream"
      );
      console.log(res.data);
      setGetSahiwalCream(res.data);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } catch (error) {
      console.log("Error while fetching Get Sahiwal Cream", error);
    }
  };

  const CalculateTotals = () => {
    const closingGhee = parseInt(openingGhee) + parseInt(ghee);
    const closingSahiwalGhee =
      parseInt(openingSahiwalGhee) + parseInt(gheeSahiwal);

    return {
      closingGhee,
      closingSahiwalGhee,
    };
  };

  const { closingGhee, closingSahiwalGhee } = CalculateTotals();

  // Saving Data
  const saveData = async () => {
    try {
      if (editItem) {
        await axios.put(
          `http://103.14.99.198:8082/DairyApplication/updateGheeEntry/${editItem.id}`,
          {
            openingGhee,
            closingGhee,
            cream: cream,
            creamUsed,
            ghee,
            date,
          }
        );
        toast.success("Data Updated Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        const res = await axios.post(
          "http://103.14.99.198:8082/DairyApplication/saveGheeCollection",
          {
            openingGhee,
            closingGhee,
            cream: cream,
            creamUsed,
            ghee,
            date
          }
        );
        toast.success("Ghee Collection saved Successfully", {
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
      setOpeningGhee("");
      setCreamUsed("");
      setGhee("");
      setEditItem(null);
    } catch (error) {
      console.log("Error while saving Ghee data", error);
    }
  };

  const fetchGheeCollection = async () => {
    setLoader(true);

    try {
      const res = await axios.get(
        "http://103.14.99.198:8082/DairyApplication/getgheeCollection"
      );
      console.log(res.data);
      setShowGheeData(res.data);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } catch (error) {
      console.log("Error while fetching ghee collection", error);
      setLoader(false);
    }
  };

  // Edit items of Ghee collection
  const editItemHandler = (item) => {
    setOpeningGhee(item.openingGhee);
    setCreamUsed(item.creamUsed);
    setGhee(item.ghee);
  };

  // Delete items
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
          "http://103.14.99.198:8082/DairyApplication/deleteGheeCollection",
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


  const sahiwalsaveData = async () => {
    try {
      if (editItem) {
        await axios.put(
          `http://103.14.99.198:8082/DairyApplication/updateSahiwalGheeEntry/${editItem.id}`,
          {
            openingSahiwalGhee,
            closingSahiwalGhee,
            creamSahiwal: creamSahiwal,
            creamUsedSahiwal,
            gheeSahiwal,
            sahiwaldate,
          }
        );
        toast.success("Data Updated Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        const res = await axios.post(
          "http://103.14.99.198:8082/DairyApplication/saveSahiwalGheeCollection",
          {
            openingSahiwalGhee,
            closingSahiwalGhee,
            creamSahiwal: creamSahiwal,
            creamUsedSahiwal,
            gheeSahiwal,
            sahiwaldate,
          }
        );
        toast.success("Ghee Collection saved Successfully", {
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
      setSahiwalOpeningGhee("");
      setCreamUsedSahiwal("");
      setGheeSahiwal("");
      setEditItem(null);
    } catch (error) {
      console.log("Error while saving Ghee data", error);
    }
  };

  const fetchSahiwalGheeCollection = async () => {
    setLoader(true);

    try {
      const res = await axios.get(
        "http://103.14.99.198:8082/DairyApplication/getSahiwalGheeCollection"
      );
      console.log(res.data);
      setSahiwalShowGheeData(res.data);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } catch (error) {
      console.log("Error while fetching ghee collection", error);
      setLoader(false);
    }
  };

  // Edit items of Ghee collection
  const editSahiwalItemHandler = (item) => {
    setSahiwalOpeningGhee(item.openingSahiwalGhee);
    setCreamUsedSahiwal(item.creamUsedSahiwal);
    setGheeSahiwal(item.gheeSahiwal);
  };

  // Delete items
  const sahiwaldele = (id) => {
    setdelid1(id);
    setopendailogdel(true);
  };

  const sahiwalhandleClose = () => {
    setAnchorEl(null);
    setopendailogdel(false);
  };

  const sahiwalhandledel = async () => {
    let delobj = {
      id: delid1,
    };

    try {
      await axios
        .post(
          "http://103.14.99.198:8082/DairyApplication/deleteSahiwalGheeCollection",
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


  const fetchlastClosingGhee = async () => {
    try {
      const lastClosingGhee = await axios.get("http://103.14.99.198:8082/DairyApplication/lastClosingGhee");
      console.log(lastClosingGhee);
      setOpeningGhee(lastClosingGhee.data)
    } catch (error) {
      console.error(error);
    }
  }

  const fetchlastSahiwalClosingGhee = async () => {
    try {
      const lastSahiwalClosingGhee = await axios.get("http://103.14.99.198:8082/DairyApplication/lastClosingSahiwalGhee");
      console.log(lastSahiwalClosingGhee);
      setSahiwalOpeningGhee(lastSahiwalClosingGhee.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchlastClosingGhee("")
    fetchlastSahiwalClosingGhee("")
  }, [])



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

  const sahwalDialog = () => {
    return (
      <>
        <Dialog
          open={opendailogdel}
          TransitionComponent={Transition}
          keepMounted
          onClose={sahiwalhandleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogActions style={{ height: "2.5rem" }}>
            <IconButton onClick={sahiwalhandleClose}>
              <CancelIcon style={{ color: "blue" }} />
            </IconButton>
          </DialogActions>
          <div style={{ background: "white" }}>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogActions>
              <Button onClick={sahiwalhandledel}>Yes</Button>
              <Button onClick={sahiwalhandleClose}>No</Button>
            </DialogActions>
          </div>
        </Dialog>
      </>
    )
  }

  useEffect(() => {
    setDate(getCurrentDate());
    setSahiwalDate(getCurrentDate());
    fetchGetCream();
    fetchGetSahiwalCream();
    fetchGheeCollection();
    fetchSahiwalGheeCollection();
  }, []);

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
        <div className="mt-5 mb-4 container">
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
            {sahwalDialog()}
            <h3
              className="text-center mt-2"
              style={{ textDecoration: "underline" }}
            >
              Ghee
            </h3>
          </div>

          <div className="row mt-4">

          </div>

          <h3
            className="mt-4"
            style={{ textDecoration: "underline", fontSize: "20px" }}
          >
            Normal Ghee
          </h3>
          <div className="row mt-3">
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
                  aria-readonly
                />
              </Box>
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
                  label="Opening Ghee"
                  type="text"
                  variant="standard"
                  value={openingGhee}
                // onChange={(e) => setOpeningGhee(e.target.value)}
                />
              </Box>
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
                  label="Closing Ghee"
                  type="text"
                  variant="standard"
                  value={closingGhee}
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
                <TextField label="Opening Cream" variant="standard" value={cream} disabled/>
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
                <TextField label="Closing Cream" variant="standard" value={readycream} />
              </Box>
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
                  label="Cream Used"
                  type="text"
                  variant="standard"
                  value={creamUsed}
                  onChange={(e) => setCreamUsed(e.target.value)}
                />
              </Box>
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
                  label="Ghee"
                  type="text"
                  variant="standard"
                  value={ghee}
                  onChange={(e) => setGhee(e.target.value)}
                />
              </Box>
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
                Show Table
              </button>
            </div>

            {showtable ? (
              <div className="container tableMaster mt-5 mb-3 p-0">
                <table className="table productTableMAster table-stripped">
                  <thead>
                    <tr>
                      <th style={{ width: "100px" }}>SrNo</th>
                      <th style={{ width: "180px" }}>Date</th>
                      <th style={{ width: "180px" }}>Opening Ghee</th>
                      <th style={{ width: "180px" }}>Closing Ghee</th>
                      <th style={{ width: "180px" }}>Cream</th>
                      <th style={{ width: "180px" }}>Cream Used</th>
                      <th style={{ width: "180px" }}>Ghee</th>
                      <th style={{ width: "180px" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody className="border">
                    {showGheeData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-center">{i + 1}</td>
                          <td>{item.date}</td>
                          <td>{item.openingGhee}</td>
                          <td>{item.closingGhee}</td>
                          <td>{item.cream}</td>
                          <td>{item.creamUsed}</td>
                          <td>{item.ghee}</td>
                          <td>
                            <button
                              className="btn"
                              onClick={() => editItemHandler(item)}
                            >
                              <FiEdit className="editicon" />
                            </button>
                            <button className="btn" onClick={() => dele(item.id)}>
                              <MdDeleteOutline
                                className="delicon"

                              />
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

          <h3
            className="mt-5"
            style={{ textDecoration: "underline", fontSize: "20px" }}
          >
            Sahiwal Ghee
          </h3>

          <div className="row mt-3">
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
                  value={sahiwaldate}
                  aria-readonly
                />
              </Box>
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
                  label="Opening Sahiwal Ghee"
                  type="text"
                  variant="standard"
                  value={openingSahiwalGhee}
                // onChange={(e) => setSahiwalOpeningGhee(e.target.value)}
                />
              </Box>
            </div>

            <div className="col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                autoComplete="off"
                type="text"
              >
                <TextField
                  label="Closing Sahiwal Ghee"
                  variant="standard"
                  value={closingSahiwalGhee}
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
                  label="Opening Sahiwal Cream"
                  variant="standard"
                  value={creamSahiwal}
                  disabled
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
                  label="Closing Sahiwal Cream"
                  variant="standard"
                  value={readsahwalcream}
                  
                />
              </Box>
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
                  label="Sahiwal Cream Used"
                  type="text"
                  variant="standard"
                  value={creamUsedSahiwal}
                  onChange={(e) => setCreamUsedSahiwal(e.target.value)}
                />
              </Box>
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
                  label="Sahiwal Ghee"
                  type="text"
                  variant="standard"
                  value={gheeSahiwal}
                  onChange={(e) => setGheeSahiwal(e.target.value)}
                />
              </Box>
            </div>

            <div
              className="col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center"
              style={{ gap: "1rem" }}
            >
              <button className="savebtn" onClick={() => sahiwalsaveData()}>
                Save
              </button>
              <button
                className="tabelbtn"
                onClick={() => setSahiwalshowtable(!showSahiwaltable)}
              >
                Show Table
              </button>
            </div>

            {showSahiwaltable ? (
              <div className="container tableMaster mt-5 mb-3 p-0">
                <table className="table productTableMAster table-stripped">
                  <thead>
                    <tr>
                      <th style={{ width: "100px" }}>SrNo</th>
                      <th style={{ width: "180px" }}>Date</th>
                      <th style={{ width: "180px" }}>Opening Sahiwal Ghee</th>
                      <th style={{ width: "250px" }}>
                        Closing Sahiwal Balance
                      </th>
                      <th style={{ width: "180px" }}>Sahiwal Cream</th>
                      <th style={{ width: "180px" }}>Sahiwal Cream Used</th>
                      <th style={{ width: "180px" }}>Sahiwal Ghee </th>
                      <th style={{ width: "180px" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody className="border">
                    {showSahiwalGheeData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-center">{i + 1}</td>
                          <td>{item.sahiwaldate}</td>
                          <td>{item.openingSahiwalGhee}</td>
                          <td>{item.closingSahiwalGhee}</td>
                          <td>{item.creamSahiwal}</td>
                          <td>{item.creamUsedSahiwal}</td>
                          <td>{item.gheeSahiwal}</td>
                          <td>
                            <button
                              className="btn"
                              onClick={() => editSahiwalItemHandler(item)}
                            >
                              <FiEdit className="editicon" />
                            </button>
                            <button className="btn" onClick={() => sahiwaldele(item.id)}>
                              <MdDeleteOutline
                                className="delicon"

                              />
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

export default GheeEntry;

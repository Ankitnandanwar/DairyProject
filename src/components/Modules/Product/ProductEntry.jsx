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
import "./Product.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductEntry = () => {
  const [loader, setLoader] = useState(true);
  const [showtable, setshowtable] = useState(false);

  const [productName, setProductName] = useState("");
  const [openBalance, setOpenBalance] = useState("");
  const [unit, setUnit] = useState("");
  const [gst, setGst] = useState("");
  const [milkUsed, setMilkUsed] = useState("");
  const [rateWithGST, setRateWithGST] = useState("");



  const [prodOpenBalAdd, setProdOpenBalAdd] = useState("")
  const [prodTableData, setProdTableData] = useState([]);

  const [opendailogdel, setopendailogdel] = useState(false);
  const [delid, setdelid] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [editItem, setEditItem] = useState(null);

  // Save data
  const saveData = async () => {
    try {

      const productExist = prodTableData.some(prod => prod.productName.toLowerCase() === productName.toLowerCase())

      if (productExist && !editItem) {

        toast.error("Product already exists", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }


      if (editItem) {
        await axios.post(
          `http://103.14.99.198:8082/DairyApplication/updateProductEntry/${editItem.id}`,
          {
            productName,
            openBalance,
            unit,
            milkUsed,
            gst,
            gstAmount,
            rateWithGST,
            rate
          }
        );
        toast.success("Product Data Updated Successfully", {
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
          "http://103.14.99.198:8082/DairyApplication/saveProductEntry",
          {
            productName,
            openBalance,
            unit,
            milkUsed,
            gst,
            gstAmount,
            rateWithGST,
            rate
          }
        );
        toast.success("Product Details Saved Successfully", {
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

      setProductName("");
      setOpenBalance("");
      setGst("");
      setUnit("");
      setMilkUsed("")
      setRateWithGST("")
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
        .get(
          "http://103.14.99.198:8082/DairyApplication/getAllProductEntryData"
        )
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
          "http://103.14.99.198:8082/DairyApplication/deleteProductEntry",
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
    setProductName(item.productName);
    setOpenBalance(item.openBalance);
    setUnit(item.unit);
    setGst(item.gst);
    setMilkUsed(item.milkUsed)
    setRateWithGST(item.rateWithGST)
    setEditItem(item);
    setProdOpenBalAdd("")
  };

  const handleProdOpenBalAddChange = (e) => {
    setProdOpenBalAdd(e.target.value);
    const newOpeningBalance = parseInt(editItem?.openBalance || 0) + parseInt(e.target.value || 0);
    setOpenBalance(newOpeningBalance);
  };

  // Export to excel code
  const exportToExcel = async () => {
    const fileName = "Product Entry";
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

  const CalculateTotals = () => {
    const rate = (parseFloat(rateWithGST) / (1 + (parseFloat(gst) / 100))).toFixed(2)
    const gstAmount = ((parseFloat(rateWithGST) - parseFloat(rate))).toFixed(2)
    const openingBal = parseInt(editItem?.openBalance || 0) + parseInt(prodOpenBalAdd || 0);
    return { openingBal, rate, gstAmount };
  };

  const { openingBal, rate, gstAmount } = CalculateTotals();

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
              Product Entry
            </h3>
            <div className="row mt-4">
              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  autoComplete="off"
                >
                  <TextField
                    label="Product"
                    variant="standard"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Unit"
                    variant="standard"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  autoComplete="off"
                >
                  <TextField
                    label="Product Opening Balance (Add More)"
                    variant="standard"
                    value={prodOpenBalAdd}
                    onChange={handleProdOpenBalAddChange}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  autoComplete="off"
                >
                  <TextField
                    label="Opening Balance"
                    variant="standard"
                    value={openingBal}
                    aria-readonly

                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Milk Used for this Product"
                    variant="standard"
                    value={milkUsed}
                    onChange={(e) => setMilkUsed(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Product Rate with GST"
                    variant="standard"
                    value={rateWithGST}
                    onChange={(e) => setRateWithGST(e.target.value)}
                  />
                </Box>
              </div>





              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="GSTIN"
                    variant="standard"
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="Base Rate"
                    variant="standard"
                    value={rate}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  type="number"
                  autoComplete="off"
                >
                  <TextField
                    label="GST Amount"
                    variant="standard"
                    value={gstAmount}
                  />
                </Box>
              </div>

              <div className="col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center" style={{ gap: "1rem" }}>
                <button className="savebtn" onClick={() => { saveData(); }}>Save</button>
                <button className="tabelbtn" onClick={() => setshowtable(!showtable)}>Show table</button>
                <button className="btn btn-success" onClick={() => exportToExcel()}>Export To Excel</button>
              </div>

              {/*Table Code */}

              {showtable ? (
                <div className="container tableMaster mt-5 mb-3 p-0">
                  <table className="table productTableMAster table-stripped">
                    <thead className="tableheading">
                      <tr>
                        <th>SrNo</th>
                        <th style={{ width: "150px" }}>Product</th>
                        <th>Unit</th>
                        <th style={{ width: "150px" }}>Opening Balance</th>
                        <th>Milk Used</th>
                        <th style={{ width: "200px" }}>Product Rate with GST</th>
                        <th>GSTIN</th>
                        <th>Base Rate</th>
                        <th>GST Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="border">
                      {prodTableData.map((item, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row" className="text-center">
                              {i + 1}
                            </th>
                            <td>
                              <p className="sub" style={{ textTransform: "capitalize" }}>{item.productName}</p>
                            </td>
                            <td>{item.unit}</td>
                            <td>{item.openBalance}</td>
                            <td>{item.milkUsed}</td>
                            <td>{item.rateWithGST}</td>
                            <td>{item.gst}</td>
                            <td>{item.rate}</td>
                            <td>{item.gstAmount}</td>
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

export default ProductEntry;

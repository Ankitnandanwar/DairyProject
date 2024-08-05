import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Product/Product.css";

const MilkMaster = () => {
  const [loader, setLoader] = useState(false);
  const [stdMilkRate, setSTDMilkRate] = useState("");
  const [stdhotelMilkRate, setStdHotelMilkRate] = useState("");
  const [stdBulkMilkRate, setStdBulkMilkRate] = useState("");
  const [dtmMilkRate, setDTMMilkRate] = useState("");
  const [dtmhotelMilkRate, setDTMHotelMilkRate] = useState("");
  const [dtmBulkMilkRate, setDTMBulkMilkRate] = useState("");

  const fetchSTDMilkRates = async () => {
    try {
      const response = await axios.get(
        "http://103.14.99.198:8082/DairyApplication/getAllSTDMilkRates"
      );
      setSTDMilkRate(response.data.data[0].stdMilkRate);
      setStdHotelMilkRate(response.data.data[0].stdhotelMilkRate);
      setStdBulkMilkRate(response.data.data[0].stdBulkMilkRate);
    } catch (error) {
      console.log("Error while fetching Milk Rates", error);
    }
  };

  const fetchDTMMilkRates = async () => {
    try {
      const response = await axios.get(
        "http://103.14.99.198:8082/DairyApplication/getAllDTMMilkRates"
      );
      console.log(response);
      setDTMMilkRate(response.data.data[0].dtmMilkRate);
      setDTMHotelMilkRate(response.data.data[0].dtmhotelMilkRate);
      setDTMBulkMilkRate(response.data.data[0].dtmBulkMilkRate);
    } catch (error) {
      console.log("Error while fetching Milk Rates", error);
    }
  };

  useEffect(() => {
    fetchSTDMilkRates();
    fetchDTMMilkRates();
  }, []);

  const updateSTDData = async () => {
    try {
      const updateSTDRate = await axios.post(
        "http://103.14.99.198:8082/DairyApplication/saveOrUpdateSTDMilkRate",
        {
          stdMilkRate,
          stdhotelMilkRate,
          stdBulkMilkRate,
        }
      );
      console.log(updateSTDRate)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.log("Error while updating Milk Rates", error);
    }
  };

  const updateDTMData = async () => {
    try {
      const updateDTMRate = await axios.post(
        "http://103.14.99.198:8082/DairyApplication/saveOrUpdateDTMMilkRate",
        {
          dtmMilkRate,
          dtmhotelMilkRate,
          dtmBulkMilkRate,
        }
      );
      console.log(updateDTMRate)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.log("Error while updating Milk Rates", error);
    }
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  

  // const exportToExcel = async () => {
  //   const fileName = "Milk Master";
  //   const fileType =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //   const fileExtension = ".xlsx";

  //   const ws = XLSX.utils.json_to_sheet(prodTableData);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Table Data");
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

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
            <h3
              className="text-center mt-3"
              style={{ textDecoration: "underline" }}
            >
              Milk Sale Master
            </h3>
            <h3
              className="mt-3"
              style={{ textDecoration: "underline", fontSize: "20px" }}
            >
              Standard Milk
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
                    label="Standard Milk Rate"
                    variant="standard"
                    value={stdMilkRate}
                    onChange={(e) => setSTDMilkRate(e.target.value)}
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
                    label="Standard Hostel/Canteen/Vendor"
                    variant="standard"
                    value={stdhotelMilkRate}
                    onChange={(e) => setStdHotelMilkRate(e.target.value)}
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
                    label="Standard Bulk Milk Rate"
                    variant="standard"
                    value={stdBulkMilkRate}
                    onChange={(e) => setStdBulkMilkRate(e.target.value)}
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
                    updateSTDData();
                  }}
                >
                  Update
                </button>
              </div>

              {/*Table Code */}
              {/* {showtable ? (
                <div className="container tableMaster mt-5 mb-3 p-0">
                  <table className="table productTableMAster table-stripped">
                    <thead className="tableheading">
                      <tr>
                        <th>SrNo</th>
                        <th style={{ width: "180px" }}>DTM Milk Rate</th>
                        <th> Standard Milk Rate </th>
                        <th>Hostel Milk Rate</th>
                        <th>Bulk Milk Rate</th>
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
                            <td>{item.dtmMilkRate}</td>
                            <td>{item.standardMilkRate}</td>
                            <td>{item.hotelMilkRate}</td>
                            <td>{item.salingMilkRate}</td>
                            <td>
                              <button
                                className="btn"
                                onClick={() => editItemHandler(item)}
                              >
                                <FiEdit className="editicon" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : null} */}
            </div>
          </div>
          <div className="pt-5">
            <h3
              className="mt-3"
              style={{ textDecoration: "underline", fontSize: "20px" }}
            >
              DTM Milk
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
                    label="DTM Milk Rate"
                    variant="standard"
                    value={dtmMilkRate}
                    onChange={(e) => setDTMMilkRate(e.target.value)}
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
                    label="DTM Hostel/Canteen/Vendor"
                    variant="standard"
                    value={dtmhotelMilkRate}
                    onChange={(e) => setDTMHotelMilkRate(e.target.value)}
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
                    label="DTM Bulk Milk Rate"
                    variant="standard"
                    value={dtmBulkMilkRate}
                    onChange={(e) => setDTMBulkMilkRate(e.target.value)}
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
                    updateDTMData();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MilkMaster;

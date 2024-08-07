import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

const MilkSale = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [openingBalance, setopeningBalance] = useState("");
  const [milkReceived, setmilkReceived] = useState("");
  const [sahiwalMilk, setsahiwalMilk] = useState("");
  const [goatMilkReceived, setgoatMilkReceived] = useState("");
  const [goatMilkMixed, setgoatMilkMixed] = useState("");
  const [production, setproduction] = useState("");
  const [girlsHostel, setgirlsHostel] = useState("");
  const [hNo8, sethNo8] = useState("");
  const [parkerH, setparkerH] = useState("");
  const [dtmCash, setdtmCash] = useState("");
  const [dtmOnline, setdtmOnline] = useState("");
  const [onlineSaleAmt, setonlineSaleAmt] = useState("");
  const [standardMilkCash, setstandardMilkCash] = useState("");
  const [cashAmt, setcashAmt] = useState("");
  const [standardMilkOnline, setstandardMilkOnline] = useState("");
  const [cream, setcream] = useState("");
  const [hNo13, sethNo13] = useState("");
  const [grewalHotel, setgrewalHotel] = useState("");
  const [cashSaleAmt, setCashSaleAmt] = useState("");
  const [cashSale, setcashSale] = useState("");
  const [onlineSale, setonlineSale] = useState("");
  const [sahiwalCream, setsahiwalCream] = useState("");
  const [research, setresearch] = useState("");
  const [hLoss, sethLoss] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const [loader, setLoader] = useState(false);

  // const n = new Date();
  // const [dates, setdate] = useState({
  //   d: String(n.getDate()),
  //   m: String(n.getMonth()),
  //   y: String(n.getFullYear())
  // });

  // to fetch current date
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // useEffect(() => {
  //   const storedOpeningBalance = localStorage.getItem('openingBalance');
  //   if (storedOpeningBalance) {
  //     setopeningBalance(storedOpeningBalance);
  //   }
  // }, []);

  const HandleSave = async () => {
    try {
      const res = await axios.post(
        "http://103.14.99.198:8082/DairyApplication/saveMilkSale",
        {
          currentDate,
          openingBalance,
          closingBalance,
          milkReceived,
          sahiwalMilk,
          goatMilkReceived,
          goatMilkMixed,
          totalQuantity,
          production,
          girlsHostel,
          hNo8,
          parkerH,
          dtmCash,
          dtmOnline,
          totalDTM,
          cashAmtDTM,
          onlineAmtDTM,
          standardMilkCash,
          standardMilkOnline,
          hNo13,
          grewalHotel,
          cashSale,
          onlineSale,
          totalStandardMilk,
          cashAmtSTD,
          onlineAmtSTD,
          cashSaleAmt,
          onlineSaleAmt,
          cashAmt,
          cream,
          sahiwalCream,
          research,
          hLoss,
        }
      );
      console.log(res.data);
      // setopeningBalance(closingBalance)
      // localStorage.setItem('openingBalance', closingBalance);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoader(true);

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          "http://103.14.99.198:8082/DairyApplication/getAllDataOfMilkRateMaster"
        );
        const details = response.data[0];
        setCurrentDate(getCurrentDate());
        setProductDetails({
          dtmMilkRate: details.dtmMilkRate,
          standardMilkRate: details.standardMilkRate,
        });
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);

  useEffect(() => {
    setLoader(true);

    const fetchClosingBalance = async () => {
      try {
        const response = await axios.get(
          "http://103.14.99.198:8082/DairyApplication/lastIndexOfYourColumn"
        );
        const lastClosingBalance = response.data;

        setopeningBalance(lastClosingBalance);
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

  useEffect(() => {
    setLoader(true);

    const fetchClosingBalance = async () => {
      try {
        const response = await axios.get(
          "http://103.14.99.198:8082/DairyApplication/lastIndexOfYourColumn"
        );
        const lastClosingBalance = response.data;

        setopeningBalance(lastClosingBalance);
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

  const CalculateTotals = () => {
    const totalQuantity =
      parseInt(openingBalance) +
      parseInt(milkReceived) +
      parseInt(sahiwalMilk) +
      parseInt(goatMilkMixed);
    const totalDTM =
      parseInt(production) +
      parseInt(girlsHostel) +
      parseInt(hNo8) +
      parseInt(dtmCash) +
      parseInt(parkerH) +
      parseInt(dtmOnline);
    const cashAmtDTM = parseInt(productDetails.dtmMilkRate) * parseInt(dtmCash);
    const onlineAmtDTM =
      parseInt(productDetails.dtmMilkRate) * parseInt(dtmOnline);
    const totalStandardMilk =
      parseInt(standardMilkCash) +
      parseInt(standardMilkOnline) +
      parseInt(hNo13) +
      parseInt(grewalHotel) +
      parseInt(cashSale) +
      parseInt(onlineSale);
    const cashAmtSTD =
      parseInt(productDetails.standardMilkRate) * parseInt(cashSale);
    const onlineAmtSTD =
      parseInt(productDetails.standardMilkRate) * parseInt(onlineSale);
    const closingBalance =
      parseInt(totalQuantity) -
      parseInt(totalDTM) -
      parseInt(totalStandardMilk) -
      parseInt(cream) -
      parseInt(sahiwalCream) -
      parseInt(research) -
      parseInt(hLoss);
    return {
      totalQuantity,
      totalDTM,
      cashAmtDTM,
      onlineAmtDTM,
      totalStandardMilk,
      cashAmtSTD,
      onlineAmtSTD,
      closingBalance,
    };
  };

  const {
    totalQuantity,
    totalDTM,
    cashAmtDTM,
    onlineAmtDTM,
    totalStandardMilk,
    cashAmtSTD,
    onlineAmtSTD,
    closingBalance,
  } = CalculateTotals();

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
        <div className="mt-5 container">
          <div className="pt-5">
            <h3
              className="text-center mt-3"
              style={{ textDecoration: "underline" }}
            >
              Milk Sale
            </h3>
          </div>
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
                  value={currentDate}
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
                autoComplete="off"
              >
                <TextField
                  label="Opening Balance"
                  type="number"
                  variant="standard"
                  value={openingBalance}
                  onChange={(e) => setopeningBalance(e.target.value)}
                  readOnly
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
                  label="Closing Balance"
                  type="number"
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
                autoComplete="off"
              >
                <TextField
                  label="Milk Received"
                  type="number"
                  variant="standard"
                  value={milkReceived}
                  onChange={(e) => setmilkReceived(e.target.value)}
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
                  label="Sahiwal Milk"
                  type="number"
                  variant="standard"
                  value={sahiwalMilk}
                  onChange={(e) => setsahiwalMilk(e.target.value)}
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
                  label="Goat Milk Received"
                  type="number"
                  variant="standard"
                  value={goatMilkReceived}
                  onChange={(e) => setgoatMilkReceived(e.target.value)}
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
                  label="Goat Milk Mixed"
                  type="number"
                  variant="standard"
                  value={goatMilkMixed}
                  onChange={(e) => setgoatMilkMixed(e.target.value)}
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
                  label="Total Quantity"
                  type="number"
                  variant="standard"
                  value={totalQuantity}
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
                  label="Production"
                  type="number"
                  variant="standard"
                  value={production}
                  onChange={(e) => setproduction(e.target.value)}
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
                  label="Girls Hostel"
                  type="number"
                  variant="standard"
                  value={girlsHostel}
                  onChange={(e) => setgirlsHostel(e.target.value)}
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
                  label="H No. 8"
                  type="number"
                  variant="standard"
                  value={hNo8}
                  onChange={(e) => sethNo8(e.target.value)}
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
                  label="Parker H"
                  type="number"
                  variant="standard"
                  value={parkerH}
                  onChange={(e) => setparkerH(e.target.value)}
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
                  label="DTM Cash"
                  type="number"
                  variant="standard"
                  value={dtmCash}
                  onChange={(e) => setdtmCash(e.target.value)}
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
                  label="DTM Online"
                  type="number"
                  variant="standard"
                  value={dtmOnline}
                  onChange={(e) => setdtmOnline(e.target.value)}
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
                  label="Total DTM"
                  type="number"
                  variant="standard"
                  value={totalDTM}
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
                  label="Cash Amount DTM"
                  type="number"
                  variant="standard"
                  value={cashAmtDTM}
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
                  label="Online Amount DTM"
                  type="number"
                  variant="standard"
                  value={onlineAmtDTM}
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
                  label="Standard Milk Cash"
                  type="number"
                  variant="standard"
                  value={standardMilkCash}
                  onChange={(e) => setstandardMilkCash(e.target.value)}
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
                  label="Standard Milk Online"
                  type="number"
                  variant="standard"
                  value={standardMilkOnline}
                  onChange={(e) => setstandardMilkOnline(e.target.value)}
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
                  label="H No. 13"
                  type="number"
                  variant="standard"
                  value={hNo13}
                  onChange={(e) => sethNo13(e.target.value)}
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
                  label="Grewal Hotel"
                  type="number"
                  variant="standard"
                  value={grewalHotel}
                  onChange={(e) => setgrewalHotel(e.target.value)}
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
                  label="Cash Sale"
                  type="number"
                  variant="standard"
                  value={cashSale}
                  onChange={(e) => setcashSale(e.target.value)}
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
                  label="Online Sale"
                  type="number"
                  variant="standard"
                  value={onlineSale}
                  onChange={(e) => setonlineSale(e.target.value)}
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
                  label="Total Standard Milk"
                  type="number"
                  variant="standard"
                  value={totalStandardMilk}
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
                  label="Cash Amount STD"
                  type="number"
                  variant="standard"
                  value={cashAmtSTD}
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
                  label="Online Amount STD"
                  type="number"
                  variant="standard"
                  value={onlineAmtSTD}
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
                  label="Cash Sale Amount"
                  type="number"
                  variant="standard"
                  value={cashSaleAmt}
                  onChange={(e) => setCashSaleAmt(e.target.value)}
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
                  label="Online Sale Amount"
                  type="number"
                  variant="standard"
                  value={onlineSaleAmt}
                  onChange={(e) => setonlineSaleAmt(e.target.value)}
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
                  label="Cash Amount"
                  type="number"
                  variant="standard"
                  value={cashAmt}
                  onChange={(e) => setcashAmt(e.target.value)}
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
                  label="Cream"
                  type="number"
                  variant="standard"
                  value={cream}
                  onChange={(e) => setcream(e.target.value)}
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
                  label="Sahiwal Cream"
                  type="number"
                  variant="standard"
                  value={sahiwalCream}
                  onChange={(e) => setsahiwalCream(e.target.value)}
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
                  label="Research"
                  type="number"
                  variant="standard"
                  value={research}
                  onChange={(e) => setresearch(e.target.value)}
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
                  label="H Loss"
                  type="number"
                  variant="standard"
                  value={hLoss}
                  onChange={(e) => sethLoss(e.target.value)}
                />
              </Box>
            </div>
            <div
              className="col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center"
              style={{ gap: "1rem" }}
            >
              <button className="savebtn" onClick={() => HandleSave()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MilkSale;

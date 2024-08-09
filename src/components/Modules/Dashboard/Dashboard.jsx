import React, { useState, useEffect } from 'react'
import "./Dashboard.css"

import { GiMilkCarton, GiIceCreamScoop, GiMasonJar } from "react-icons/gi";
import { LuIceCream2 } from "react-icons/lu";
import { SiIconjar } from "react-icons/si";


import axios from 'axios';


const Dashboard = () => {

  const [milkOpeningBal, setmilkOpeningBal] = useState("")
  const [creamClosingBal, setCreamClosingBal] = useState("")
  const [sahiwalCreamClosingBal, setSahiwalCreamClosingBal] = useState("")
  const [gheeClosingBal, setGheeClosingBal] = useState("")
  const [sahiwalGheeClosingBal, setSahiwalGheeClosingBal] = useState("")

  const [getProductData, setProductData] = useState([])
  const [getInventoryItem, setInventoryItem] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      let fetchMilkOpenBal = await axios.get("http://103.14.99.198:8082/DairyApplication/closingBalance")
      let fetchClosingCream = await axios.get("http://103.14.99.198:8082/DairyApplication/lastClosingCream")
      let fetchSahiwalClosingCream = await axios.get("http://103.14.99.198:8082/DairyApplication/lastClosingSahiwalCream")
      let fetchGheeClosingBal = await axios.get("http://103.14.99.198:8082/DairyApplication/lastClosingGhee")
      let fetchSahiwalGheeClosingBal = await axios.get("http://103.14.99.198:8082/DairyApplication/lastClosingSahiwalGhee")

      let fetchProductData = await axios.get("http://103.14.99.198:8082/DairyApplication/getAllProductEntryData")
      let fetchInventoryData = await axios.get("http://103.14.99.198:8082/DairyApplication/getItemMaster")

      setmilkOpeningBal(fetchMilkOpenBal.data)
      setCreamClosingBal(fetchClosingCream.data)
      setSahiwalCreamClosingBal(fetchSahiwalClosingCream.data)
      setGheeClosingBal(fetchGheeClosingBal.data)
      setSahiwalGheeClosingBal(fetchSahiwalGheeClosingBal.data)
      setProductData(fetchProductData.data)
      setInventoryItem(fetchInventoryData.data)
      // console.log(fetchProductData.data)
    }
    fetchData()
  }, [])


  return (
    <div className='container-fluid'>
      <div className='container mb-5'>
        <div className='row mt-5 p-3 p-sm-0 '>
          <div className='col-12 col-lg-6 col-xl-3 col-md-6 mt-5 d-flex justify-content-center align-items-center'>
            <div className='smallCard'>
              <div className='cardContent'>
                <h2>{milkOpeningBal}</h2>
                <span>DTM Milk Closing Balance</span>
              </div>
              <div>
                <GiMilkCarton className='icons' />
              </div>
            </div>
          </div>


          <div className='col-12 col-lg-6 col-xl-3 col-md-6 mt-5 d-flex justify-content-center align-items-center'>
            <div className='smallCard'>
              <div className='cardContent'>
                <h2>{creamClosingBal}</h2>
                <span>Cream Closing Balance</span>
              </div>
              <div>
                <GiIceCreamScoop className='icons' />
              </div>
            </div>
          </div>


          <div className='col-12 col-lg-6 col-xl-3 col-md-6 mt-5 d-flex justify-content-center align-items-center'>
            <div className='smallCard'>
              <div className='cardContent'>
                <h2>{sahiwalCreamClosingBal}</h2>
                <span>Sahiwal Cream Closing Balance</span>
              </div>
              <div>
                <LuIceCream2 className='icons' />
              </div>
            </div>
          </div>

          <div className='col-12 col-lg-6 col-xl-3 col-md-6 mt-5 d-flex justify-content-center align-items-center'>
            <div className='smallCard'>
              <div className='cardContent'>
                <h2>{gheeClosingBal}</h2>
                <span>Ghee Closing Balance</span>
              </div>
              <div>
                <SiIconjar className='icons' />
              </div>
            </div>
          </div>

          <div className='col-12 col-lg-6 col-xl-3 col-md-6 mt-5 d-flex justify-content-center align-items-center'>
            <div className='smallCard'>
              <div className='cardContent'>
                <h2>{sahiwalGheeClosingBal}</h2>
                <span>Sahiwal Ghee Closing Balance</span>
              </div>
              <div>
                <GiMasonJar className='icons' />
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-5 p-3 p-sm-0'>
          <h3 style={{ textDecoration: 'underline' }}>Products (Present Stock)</h3>
          {
            getProductData.map((item, index) => (
              <div key={index} className='col-12 col-lg-6 col-xl-3 col-md-6 mt-5 d-flex justify-content-center align-items-center'>
                <div className='smallCard' style={{ justifyContent: 'center',  }}>
                  <div className='cardContent'>
                    <h2>{item.openBalance}</h2>
                    <span>{item.productName}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <div className='row mt-5 p-3 p-sm-0'>
          <h3 style={{ textDecoration: 'underline' }}>Inventory Items (Present Stock)</h3>
          {
            getInventoryItem.map((item, index) => (
              <div key={index} className='col-12 col-lg-6 col-xl-3 col-md-6 mt-5 d-flex justify-content-center align-items-center'>
                <div className='smallCard' style={{ justifyContent: 'center' }}>
                  <div className='cardContent'>
                    <h2>{item.presentStock}</h2>
                    <span>{item.item}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Dashboard
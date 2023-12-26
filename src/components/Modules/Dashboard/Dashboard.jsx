import React from 'react'
import "./Dashboard.css"
import { dummyData } from './DashDummyData';

const Dashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className='row mt-5 p-3 p-sm-0 '>
          {
            dummyData.map((item, id) => {
              return (
                <div className='col-12 col-lg-6 col-xl-3 col-md-6 mt-5 d-flex justify-content-center align-items-center' key={id}>
                  <div className='smallCard'>
                    <div className='cardContent'>
                      <h2>{item.totalNos}</h2>
                      <span>{item.title}</span>
                    </div>
                    <div>
                      {item.icon}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
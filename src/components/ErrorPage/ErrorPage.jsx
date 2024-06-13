import React from 'react'
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className='container d-flex align-items-center justify-content-center' style={{height: '100vh'}}>
        <div className='text-center text-uppercase' style={{color:"#034694"}}>
            <h1 className='display-4 font-weight-bold'>404 Error Page</h1>
            <h4>We are sorry, page not found!</h4>
            <p className='text-muted'>The page you are looking for might have been removed had its name changed or is temporarly unavailable</p>
            <Link to='/'><button className='btn btn-dark text-uppercase mt-3' style={{borderRadius:"25px"}}>Back to homepage</button></Link>
        </div>
    </div>
  )
}

export default ErrorPage
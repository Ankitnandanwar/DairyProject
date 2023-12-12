import React from 'react'
import "./Login.css"
// import loginLogo from "../../assets/companylogo.png"
import loginLogo from "../../assets/logo.png"
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const handleLogin = () =>{
    navigate('/dashboardpage')
  }
  
  return (
    <>
      <div className="backgroundImg">
        <div className="loginCont">
          <div className="empty"></div>
          <div className="loginIds">
            <div>
              <img src={loginLogo} alt="cpmpany-logo" width="130" />
            </div>
            <div>
              <form action="" class="loginFields">
                <div className="input-box">
                  <TextField id="standard-basic" label="Username" variant="standard" />
                  {/* <span style={{ color: "red", fontSize: "10px", marginTop:"7px"}}>username should not be empty</span> */}
                </div>
                <div className="input-box">
                  <TextField id="standard-basic" type="password" label="Password" variant="standard" />
                  {/* <span style={{ color: "red", fontSize: "10px", marginTop:"7px"}}>password should not be empty</span> */}
                </div>
                <button type="submit" class="login-btn" onClick={()=>handleLogin()}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
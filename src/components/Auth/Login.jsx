import React, { useState } from 'react'
import "./Login.css"
// import loginLogo from "../../assets/companylogo.png"
import loginLogo from "../../assets/logo.png"
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  // const [errors, setError] = useState(false)
  const [loginUser, setLoginUser] = useState({
    userName: '',
    password: ''
  })

  const handleloginSubmit = async () => {
    try {
      if (loginUser.userName && loginUser.password) {
        const response = await axios.post('http://103.38.50.113:8080/DairyApplication/Login', loginUser);
        const data = response.data;
        console.log(data);

        if (data.status === " Success") {
          toast.success("Login Successfull", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            navigate('/dashboardpage');
          }, 3000);
        } else {
          toast.error("Login Failed", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      console.log('Error during login', error);
    }
  };



  return (
    <>
      <div className="backgroundImg">
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
          theme="colored"
        />
        <ToastContainer />
        <div className="loginCont">
          <div className="empty"></div>
          <div className="loginIds">
            <div>
              <img src={loginLogo} alt="cpmpany-logo" width="130" />
            </div>
            <div>
              <div className="loginFields">
                <div className="input-box">
                  <TextField id="standard-basic" label="Username" variant="standard" name="userName" 
                  value={loginUser.userName} 
                  onChange={
                    (e) => {
                      // if(e.target.value){
                      //   setError(false)
                      // }
                      setLoginUser({
                        ...loginUser,
                        userName: e.target.value
                      })
                    }
                  } />
                  {/* {errors.userName && <p style={{ color: 'red', fontSize: "10px" }}>{errors.userName}</p>} */}
                  {/* <span style={{ color: "red", fontSize: "10px", marginTop:"7px"}}>username should not be empty</span> */}
                </div>
                <div className="input-box">
                  <TextField id="standard-basic" type="password" label="Password" name="password" variant="standard" value={loginUser.password} onChange={
                    (e) => {
                      // if(e.target.value){
                      //   setError(false)
                      // }
                      setLoginUser({
                        ...loginUser,
                        password: e.target.value
                      })
                    }
                  } />
                  {/* {errors.password && <p style={{ color: 'red', fontSize: "10px" }}>{errors.password}</p>} */}
                  {/* <span style={{ color: "red", fontSize: "10px", marginTop:"7px"}}>password should not be empty</span> */}
                </div>
                <button type="submit" className="login-btn" onClick={() => handleloginSubmit()}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
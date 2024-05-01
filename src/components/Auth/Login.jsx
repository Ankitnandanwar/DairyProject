import React, { useState } from 'react'
import "./Login.css"
import loginLogo from "../../assets/logo.png"
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [loginUser, setLoginUser] = useState({
    userName: '',
    password: '',
    role: ''
  })

  const handleloginSubmit = async () => {
    try {
      if (loginUser.userName && loginUser.password && loginUser.role === 'Admin') {
        const response = await axios.post('http://103.38.50.113:8080/DairyApplication/loginValidate', loginUser);
        const data = response.data;
        console.log(data);


        if (data.status === "Success") {
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
          }, 1000);
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
                <img src={loginLogo} alt="company-logo" width="130" />
              </div>
              <div className="loginFields">
                <div className="input-box">
                  <TextField id="standard-basic" type='text' label="Username" variant="standard" name="userName"
                    value={loginUser.userName}
                    onChange={
                      (e) => {
                        setLoginUser({
                          ...loginUser,
                          userName: e.target.value
                        })
                      }
                    }
                  />
                </div>
                <div className="input-box">
                  <TextField id="standard-basic" type="password" label="Password" variant="standard" name="password"
                    value={loginUser.password}
                    onChange={
                      (e) => {
                        setLoginUser({
                          ...loginUser,
                          password: e.target.value
                        })
                      }
                    }
                  />
                </div>
                <div className="input-box">
                  <TextField id="standard-basic" type="text" label="Role" variant="standard" name="role"
                    value={loginUser.role}
                    onChange={
                      (e) => {
                        setLoginUser({
                          ...loginUser,
                          role: e.target.value
                        })
                      }
                    }
                  />
                </div>
                <button type="submit" className="login-btn" onClick={() => handleloginSubmit()}>Login</button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
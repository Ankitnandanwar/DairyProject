import React, { useState } from 'react'
import "./Login.css"
// import loginLogo from "../../assets/companylogo.png"
import loginLogo from "../../assets/logo.png"
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useForm } from 'react-hook-form';

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

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

const onSubmit = (data) => {
  console.log(data)
}
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
          <form onSubmit={handleSubmit(onsubmit)}>
            <div>
              <img src={loginLogo} alt="cpmpany-logo" width="130" />
            </div>
              <div className="loginFields">
                <div className="input-box"
                {...register('username', {required: "Username is Required"})}>
                  <TextField id="standard-basic" type='text' label="Username" variant="standard" name="userName" 
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
                  } 
                  />
                  {errors.username && (<small className='text-danger'>{errors.username.message}</small>)}
                </div>
                <div className="input-box"
                {...register('password', {required: "Password is Required"})}>
                  <TextField id="standard-basic" type="password" label="Password" variant="standard" name="password"
                  value={loginUser.password} 
                  onChange={
                    (e) => {
                      // if(e.target.value){
                      //   setError(false)
                      // }
                      setLoginUser({
                        ...loginUser,
                        password: e.target.value
                      })
                    }
                  }
                   />
                  {errors.password && (<small className='text-danger'>{errors.password.message}</small>)}
                </div>
                <button type="submit" className="login-btn" onClick={() => handleloginSubmit()}>Login</button>
              </div>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login
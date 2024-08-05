import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginLogo from "../../assets/logo.png";
import "./Login.css";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 190,
    },
  },
};

const Login = () => {
  const navigate = useNavigate()

  const [loginUser, setLoginUser] = useState({
    userName: '',
    password: '',
    role: ''
  })

  const [uniqueUser, setUniqueUser] = useState([])

  const handleloginSubmit = async () => {
    try {
      if (loginUser.userName && loginUser.password && loginUser.role ) {
        if (!uniqueUser.includes(loginUser.userName)) {
          toast.error("Invalid Username", {
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
        const response = await axios.post('http://103.38.50.113:8080/DairyApplication/loginValidate', loginUser);
        const data = response.data;
        console.log(data);

        if (data.status === "Success") {
          localStorage.setItem('userData', JSON.stringify(data.data));
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

  useEffect(() => {
    const fetchUniqueUser = async() =>{
      try {
        const res = await axios.get('http://103.38.50.113:8080/DairyApplication/userNames');
        console.log(res.data)
        setUniqueUser(res.data)
      } catch (error) {
        console.error("Error while fetching unique user", error)
      }
    }
    fetchUniqueUser()
  }, [])
  

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
                <FormControl variant="standard" sx={{ m: 1, width: '19ch' }}>
                  <InputLabel id="demo-simple-select-standard-label" className='selectP'>Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Role"
                    MenuProps={MenuProps}
                    value={loginUser.role}
                    onChange={(e)=>setLoginUser({
                      ...loginUser, 
                      role: e.target.value
                    })}
                  >

                    <MenuItem value="admin">
                      <em>admin</em>
                    </MenuItem>
                    <MenuItem value="user">
                      <em>user</em>
                    </MenuItem>
                  </Select>
                </FormControl>


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
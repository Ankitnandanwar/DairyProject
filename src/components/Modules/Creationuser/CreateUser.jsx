import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Bars } from 'react-loader-spinner';






const CreateUser = () => {

  const [loader, setLoader] = useState(true)
  const [showtable, setShowtable] = useState(false)
  const [fullName, setFullName] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const [prodTableData, setProdTableData] = useState([])



  const saveData = async () => {
    try {
      const res = await axios.post("http://103.38.50.113:8080/DairyApplication/userCreation", {
        fullName, mobileNo, email, userName, password, role
      })

      // console.log(res.data)
      toast.success("Data Saved Successfully", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      console.log(res)

      setFullName("")
      setMobileNo("")
      setEmail("")
      setUserName("")
      setPassword("")
      setRole("")
    } catch (error) {
      console.log(error)
    }
  }

  const getUserData = async () => {
    setLoader(false)

    try {
      await axios.get("http://103.38.50.113:8080/DairyApplication/getuserCreate").then((res) => {
        console.log(res.data.data)
        setProdTableData(res.data.data)
        setTimeout(() => {
          setLoader(false)
        }, 1000);
      })
    } catch (error) {
      console.log(error, "server issue")
    }
  }

  useEffect(() => {
    getUserData()
  })

  return (
    <>
      {
        loader ?

          <div className='loader-Cont'>
            <Bars
              height="40"
              width="80"
              color="rgb(5, 165, 214)"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />

          </div> :

          <div className='container mt-4'>
            <ToastContainer position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light">
            </ToastContainer>

            <div className='pt-5'>

              <h3 className='text-center mt-4' style={{ textDecoration: 'underline' }}>Create User</h3>
              <div className='row mt-4'>
                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '23ch' },
                    }}
                    autoComplete="off"
                  >
                    <TextField label="Full Name" variant="standard" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </Box>
                </div>

                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '23ch' },
                    }}
                    autoComplete="off"
                  >
                    <TextField label="Mobile No" variant="standard" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                  </Box>
                </div>

                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '23ch' },
                    }}
                    autoComplete="off"
                  >
                    <TextField label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Box>
                </div>

                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '23ch' },
                    }}
                    autoComplete="off"
                  >
                    <TextField label="Username" variant="standard" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  </Box>
                </div>

                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '23ch' },
                    }}
                    autoComplete="off"
                  >
                    <TextField label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Box>
                </div>

                <div className='col-12 col-lg-6 col-xl-4 col-md-6 d-flex justify-content-center align-items-center'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '23ch' },
                    }}
                    autoComplete="off"
                  >
                    <TextField label="Role" variant="standard" value={role} onChange={(e) => setRole(e.target.value)} />
                  </Box>
                </div>

                <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                  <button className='savebtn' onClick={() => { saveData() }}>Save</button>
                  <button className='tabelbtn' onClick={() => setShowtable(!showtable)}>Show table</button>
                </div>


                {
                  showtable ?

                    <div className='container tableMaster mt-5 mb-3 p-0'>
                      <table className='table productTableMAster table-stripped'>
                        <thead className='tableheading'>
                          <tr>
                            <th>SrNo</th>
                            <th style={{ width: "180px" }}>Full Name</th>
                            <th>Mobile No</th>
                            <th>Email</th>
                            <th>UserName</th>
                            <th>Role</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody className='border'>
                          {
                            prodTableData.map((item, i) => {
                              return (
                                <tr key={i}>
                                  <th scope='row' className='text-center'>{i + 1}</th>
                                  <td>
                                    <p className='sub'>{item.fullName}</p>
                                  </td>
                                  <td>{item.mobileNo}</td>
                                  <td>{item.email}</td>
                                  <td>{item.userName}</td>
                                  <td>{item.role}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div> : null
                }
              </div>
            </div>
          </div>

      }

    </>
  )
}

export default CreateUser
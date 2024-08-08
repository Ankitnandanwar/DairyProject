import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, DialogActions, DialogTitle, IconButton } from "@mui/material";
import axios from 'axios';
import * as FileSaver from 'file-saver';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CancelIcon from "@mui/icons-material/Cancel";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const [editItem, setEditItem] = useState(null);


  const [delid, setdelid] = useState();
  const [opendailogdel, setopendailogdel] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const saveData = async () => {
    setLoader(true)
    try {

      if (editItem) {
        await axios.post(`http://103.14.99.198:8082/DairyApplication/updateUserById/${editItem.id}`, {
          fullName, mobileNo, email, userName, password, role
        })
        toast.success("User data Updated Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        const res = await axios.post("http://103.14.99.198:8082/DairyApplication/userCreation", {
          fullName, mobileNo, email, userName, password, role
        })

        // console.log(res.data)
        toast.success("User data Saved Successfully", {
          position: "top-center",
          autoClose: 2000,
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
      }
      setFullName("")
      setMobileNo("")
      setEmail("")
      setUserName("")
      setPassword("")
      setRole("")
      setEditItem(null);

    } catch (error) {
      console.log(error)
    }
  }

  const getUserData = async () => {
    try {
      await axios.get("http://103.14.99.198:8082/DairyApplication/getuserCreate").then((res) => {
        // console.log(res.data.data)
        setProdTableData(res.data.data)
        setTimeout(() => {
          setLoader(false)
        }, 2000);
      })
    } catch (error) {
      console.log(error, "server issue")
    }
  }

  useEffect(() => {
    getUserData()
  })

  // edit user data
  const edithandler = (item) => {
    setFullName(item.fullName)
    setMobileNo(item.mobileNo)
    setEmail(item.email)
    setUserName(item.userName)
    setPassword(item.password)
    setRole(item.role)
    setEditItem(item);
  }

  const exportToExcel = async () => {
    const fileName = "User List";
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";


    const ws = XLSX.utils.json_to_sheet([prodTableData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };



  // Delete user data

  const delUser = (id) => {
    setdelid(id)
    setopendailogdel(true)
  }

  const handleClose = () => {
    setAnchorEl(null);
    setopendailogdel(false);
  }


  const handledel = async () => {
    let delobj = {
      "id": delid
    }

    try {
      await axios.post("http://103.14.99.198:8082/DairyApplication/deleteUser", delobj, {
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((resdel) => {
          console.log(resdel.data)
        })
        .catch((error) => {
          console.log(error)
        })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  const dailoge = () => {
    return (
      <Dialog
        open={opendailogdel}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions style={{ height: "2.5rem" }}>
          <IconButton onClick={handleClose}>
            <CancelIcon style={{ color: "blue" }} />
          </IconButton>
        </DialogActions>
        <div style={{ background: "white" }}>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={handledel}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </DialogActions>
        </div>
      </Dialog>
    )
  }

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
            {dailoge()}
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
                  <button className='btn btn-success' onClick={() => exportToExcel()}>Export To Excel</button>
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
                            <th style={{ width: "250px" }}>Email</th>
                            <th>UserName</th>
                            <th>Role</th>
                            <th>Action</th>
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
                                  <td>
                                    <button className='btn' onClick={() => edithandler(item)}><FiEdit className="editicon" /></button>
                                    <button className='btn' onClick={() => delUser(item.id)}><MdDeleteOutline className="delicon" /></button>
                                  </td>
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
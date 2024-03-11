// import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearchParams } from 'react-router-dom'


const Applynow = () => {
    const [user, setuser] = useState("")
    const [email, setemail] = useState("")
    const [Mobilenumber, setmobilenumber] = useState("")
    const [position, setPosition] = useState("")
    const [message, setMessage] = useState("")
    const [uploadFiles, setUploadFiles] = useState("")
    const [errors, setErrors] = useState({})

    // const [loader, setLoader] = useState(false);

    const navigate = useNavigate()
    const [searchparams] = useSearchParams();

    
    
    // Form validations 

    let rex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    let rexno = /\d/
    // let phonrex = /^\(?([7-9]{1})\)?([0-9]{9})$/

    const validations = () => {
        let errors = {}
        let ct = 0

        if (user === "") {
            errors.user = "*Username should not be empty"
            ct++
        }else if (rexno.test(user)) {
            errors.user = "*Username should not be in numbers"
            ct++
        }
        if (email === "") {
            errors.email = "*Email should not be empty"
            ct++
        }else if (!rex.test(email)) {
            errors.email = "*Enter vaild email address"
            ct++
        }
        if (Mobilenumber === "") {
            errors.Mobilenumber = "*Mobile Number should not be empty"
            ct++
        } else if (Mobilenumber.length !== 10) {
            errors.Mobilenumber = "*Enter vaild mobile number"
            ct++
        }// else if(!phonrex.test(Mobilenumber)){
        //     errors.Mobilenumber = "*mobile no start from 7/8/9"
        // }
        if (uploadFiles === "") {
            errors.uploadFiles = "*please upload your file to continue"
            ct++
        }
        if(ct===0){
            handlesubmit()
        }
        setErrors(errors)
        
    }      

    // API Calling function
    const handlesubmit = async () => {

        try {
            let formData = new FormData()
            formData.append("file", uploadFiles)
            formData.append("Username", user)
            formData.append("Email", email)
            formData.append("Phone", Mobilenumber)
            formData.append("Position", searchparams.get("postData"))
            formData.append("Message", message)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const res = await axios.post("http://localhost:6500/userdetails", formData, config)
            console.log(res)
            console.log(res.data)

            if (res.data.status === 201) {
                navigate("/thanku")
            } else {
                alert("Please fill all the details to continue")
            }
        } catch (error) {
            alert("Error while fetching data please try again")

        }

    }


    return (
        <div className="container mt-5 mb-2 p-3">
            <div className='row justify-content-center p-2'>
                <div className='col-12 col-lg-6 p-3 rounded container mt-5 bg-light' >
                    <h5 className="text-center" style={{ color: "#034694" }}>Apply For Job</h5>
                    <div className="row">
                        <div className="ml-2 mt-2 col">
                            <label style={{ color: "#034694" }}>Name <span className="text-danger">*</span></label>
                            <input style={{ height: "30px", fontSize: "13.5px" }} className="form-control" type='text' required={true} onChange={(e) => setuser(e.target.value)} placeholder='Enter Username' name='Username' autoComplete="off"></input>
                            {errors.user && <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>{errors.user}</p>}
                        </div>

                        <div className=" mr-2 mt-2 col">
                            <label style={{ color: "#034694" }}>Email <span className="text-danger">*</span></label>
                            <input style={{ height: "30px", fontSize: "13.5px" }} className="form-control" type='email' required={true} onChange={(e) => setemail(e.target.value)} placeholder='Enter Email' name='Email' autoComplete="off"></input>
                            {errors.email && <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>{errors.email}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="ml-2 mt-3 col">
                            <label style={{ color: "#034694" }}>Contact <span className="text-danger">*</span></label>
                            <input style={{ height: "30px", fontSize: "13.5px" }} className="form-control" type='number' required={true} onChange={(e) => setmobilenumber(e.target.value)} placeholder='Enter Number' name='Phone' autoComplete="off"></input>
                            {errors.Mobilenumber && <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>{errors.Mobilenumber}</p>}
                        </div>

                        <div className="mr-2 mt-3 col">
                            <label style={{ color: "#034694" }}>Position</label>
                            <input style={{ height: "30px", fontSize: "13.5px" }} className="form-control" value={searchparams.get("postData")} disabled name="Position" type='text' required={true} onChange={(e) => setPosition(e.target.value)} ></input>
                        </div>
                    </div>

                    <div className='Message ml-2 mr-2 mt-3'>
                        <label style={{ color: "#034694" }}>Your Message</label>
                        <textarea style={{ fontSize: "13.5px" }} className="form-control" name="Message" required={true} type='text' onChange={(e) => setMessage(e.target.value)} placeholder='Your Message' />
                    </div>

                    <div className="form-group ml-2 mt-3">
                        <label style={{ color: "#034694" }} className="text-capitalize">upload your resume <span className="text-danger">*</span></label>
                        <input style={{ height: "30px", fontSize: "13.5px", marginTop: "6px" }} type="file" name="file" required={true} onChange={(e) => setUploadFiles(e.target.files[0])} className="form-control-file" id="exampleFormControlFile1" />
                        {errors.uploadFiles && <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>{errors.uploadFiles}</p>}
                    </div>

                    <div className='text-center pb-2'>
                        {/* <button type="submit" disabled={loader} className={btn text-white} onClick={() => {
                            setLoader(true)
                            // setTimeout(() => {
                            //     // console.log("first")
                            //     // setLoader(false)
                                Validations()
                            // }, 5000);
                        }} style={{ backgroundColor: "#4CBB17" }}>
                            {loader ? <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Loading...
                            </> : 'Submit'}</button> */}
                            <button type="submit" className= "btn text-white" onClick={()=>validations()} style={{ backgroundColor: "#4CBB17" }}>Submit</button>
                    </div>
                </div>
            </div>
        </div>

    )

}


export default Applynow;
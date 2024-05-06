import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Bars } from 'react-loader-spinner';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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

const AssigningRole = () => {

  const [assingRole, setAssingRole] = useState({
    uniqueDropName: "",
  })
  const [uniqueUsername, setUniqueUsername] = useState([])
  const [moduleCheckbox, setModuleCheckbox] = useState([])
  const [selectedModules, setSelectedModules] = useState([]);




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://103.38.50.113:8080/DairyApplication/userNames');
        setUniqueUsername(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchModuleName = async () => {
      try {
        const response = await axios.get('http://103.38.50.113:8080/DairyApplication/getAllModuleList');
        setModuleCheckbox(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
    fetchModuleName();
  }, [])

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedModules((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedModules((prevSelected) =>
        prevSelected.filter((module) => module !== value)
      );
    }
  };



  const handleSave = async () => {
    
  };

  return (
    <div className='pt-5'>
      <h3 className='text-center mt-4' style={{ textDecoration: 'underline' }}>Assign User Role</h3>
      <div className='row pt-5'>
        <div className='col-12 col-lg-6 col-xl-6 col-md-6 d-flex justify-content-center align-items-center flex-row'>
          <FormControl variant="standard" sx={{ m: 1, width: '19ch' }}>
            <InputLabel id="demo-simple-select-standard-label" className='selectP'>Unique Username</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Role"
              MenuProps={MenuProps}
              value={assingRole.uniqueDropName}
              onChange={(e) => setAssingRole({
                ...assingRole,
                uniqueDropName: e.target.value
              })}
            >

              <MenuItem value="Admin">
                <em>none</em>
              </MenuItem>
              {
                uniqueUsername.map((item, index) => (
                  <MenuItem key={`${item}-${index}`} value={item}>{item}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className='col-12 col-lg-6 col-xl-6 col-md-6 d-flex justify-content-center align-items-center'>
          <FormGroup style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
            {
              moduleCheckbox.map((item, index) => (
                <FormControlLabel key={`${item}-${index}`} required control={<Checkbox onChange={handleCheckboxChange} />} label={item.name} />
              ))
            }

          </FormGroup>
        </div>

        <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
          <button className='savebtn' onClick={() => handleSave()}>Save</button>
        </div>
      </div>

      <div className='container tableMaster mt-5 mb-3 p-0'>
        <table className='table productTableMAster table-stripped'>
          <thead className='tableheading'>
            <tr>
              <th style={{ width: "100px" }}>SrNo</th>
              <th style={{ width: "150px" }}>UserName</th>
              <th style={{ width: "150px" }}>Modules Assign</th>
            </tr>
          </thead>
          <tbody className='border'>
            
          </tbody>
        </table>
      </div>






    </div>
  )
}

export default AssigningRole
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
  const [moduleList, setModuleList] = useState([]);
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
        setModuleList(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
    fetchModuleName();
  }, [])

  const handleCheckboxChange = (moduleId) => {
    const selectedIndex = selectedModules.indexOf(moduleId);
    let newSelected = [];

    if (selectedIndex === -1) {
        newSelected = [...selectedModules, moduleId];
    } else {
        newSelected = selectedModules.filter(id => id !== moduleId);
    }

    setSelectedModules(newSelected);
};



  const handleSave = async () => {
    try {
      const data = {
        userName: assingRole.uniqueDropName,
        service: selectedModules.join(', ')
      }

      await axios.post('http://103.38.50.113:8080/DairyApplication/userToServiceMap', data).then(res=>{
        console.log(res)
      })
    } catch (error) {
      console.log("error saving data", error)
    }
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
              moduleList.map(mod=>(
                <FormControlLabel key={mod.id} required control={<Checkbox 
                  checked={selectedModules.includes(mod.name)}
                  onChange={() => handleCheckboxChange(mod.name)}
                  />} label={mod.name}/>
              ))
            }
          </FormGroup>
        </div>

        <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
          <button className='savebtn' onClick={() => handleSave()}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default AssigningRole
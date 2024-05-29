import React from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

const Sidebar = ({ toggle, state, setState }) => {
    const navigate = useNavigate()

    const assignedModules = JSON.parse(localStorage.getItem('userData'))?.service || [];
    const getdataformLocal = JSON.parse(localStorage.getItem('userData'))

    const list = (anchor) => {
        return (
            <Box
                style={{ height: '100vh' }}
                className="sidebarstyle"
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                onClick={toggle(anchor, true)}
                onKeyDown={toggle(anchor, true)}>

                <Menu>
                    <span><h1 className='text-center'>Dairy</h1></span>
                    <span><h5 className='text-center' style={{color:'blue', fontSize:'15px', fontWeight:'600'}}>Welcome {getdataformLocal.fullName}</h5> </span>
                    {assignedModules.includes('User To Service') && (
                        <SubMenu label="User Creation">
                            <MenuItem onClick={() => { navigate('/createuser') }}>
                                Create User
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/assignuserrole') }}>
                                Assign User Role
                            </MenuItem>
                        </SubMenu>
                    )}

                    {assignedModules.includes('Product') && (
                        <SubMenu label="Products">
                            <MenuItem onClick={() => { navigate('/productentry') }}>
                                Product Entry
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/productsales') }}>
                                Product Sale
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/productreport') }}>
                                Product Report
                            </MenuItem>
                        </SubMenu>
                    )}

                    {assignedModules.includes('Milk') && (
                        <SubMenu label="Milk">
                            <MenuItem onClick={() => { navigate('/milksalemaster') }}>
                                Milk Sale Master
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/milksale') }}>
                                Milk Sale
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/milkreport') }}>
                                Milk Report
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/milkcollection') }}>
                                Milk Collection
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/Hostel') }}>
                                Hostel
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/dtmmilksale') }}>
                                 DTM Milk Sale
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/dtmmilkcollection') }}>
                                DTM Milk Collection
                            </MenuItem>
                        </SubMenu>
                    )}

                    {assignedModules.includes('Daily Entry') && (
                        <SubMenu label="Daily Entry">
                            <MenuItem onClick={() => { navigate('/dmwentry') }}>
                                DMW Entry
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/dmwreport') }}>
                                DMW Report
                            </MenuItem>
                        </SubMenu>
                    )}

                    {assignedModules.includes('Inventroy') && (
                        <SubMenu label="Inventry Items">
                            <MenuItem onClick={() => { navigate('/itementry') }}>
                                Item Entry
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/iteminventry') }}>
                                Item Inventry
                            </MenuItem>
                        </SubMenu>
                    )}

                    
                </Menu>

            </Box>
        )
    }
    return (
        <div>
            {
                ['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggle(anchor, false)}
                            onOpen={toggle(anchor, true)}
                        >{list(anchor)}
                        </SwipeableDrawer>
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default Sidebar
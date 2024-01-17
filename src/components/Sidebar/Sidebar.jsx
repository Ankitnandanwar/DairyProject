import React from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

const Sidebar = ({ toggle, state, setState }) => {
    const navigate = useNavigate()

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
                    <SubMenu label="Master Modules">
                        <MenuItem onClick={() => { navigate('/productentry') }}>
                            Product Entry
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/milksalemaster') }}>
                            Milk Sale Master
                        </MenuItem>
                    </SubMenu>
                    <SubMenu label="Sales">
                        <MenuItem onClick={() => { navigate('/productsales') }}>
                            Product Sale
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/milksale') }}>
                            Milk Sale
                        </MenuItem>
                    </SubMenu>
                    <SubMenu label="Reports">
                        <MenuItem onClick={() => { navigate('/productreport') }}>
                            Product Report
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/milkreport') }}>
                            Milk Report
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/table')}}>
                            Table
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/tablereport')}}>
                            Table Report
                        </MenuItem>
                    </SubMenu>
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
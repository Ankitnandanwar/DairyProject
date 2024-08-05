import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Navbar.css';


const Navbar = () => {

    const navigate = useNavigate()

    const logoutUser = async() =>{
        localStorage.clear()
        navigate('/')
    }

    function NavAppbar() {
        const [state, setState] = useState({
            left: false
        })

        const toggleDrawer = (anchor, open) => (event) => {
            if (
                event &&
                event.type === 'keydown' &&
                (event.key === 'Tab' || event.key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className='appbar'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer('left', true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor:'pointer', fontWeight:"600" }} onClick={()=>{navigate('/dashboardpage')}}>
                            Dashboard
                        </Typography>
                        <Button color="inherit" onClick={()=>logoutUser()}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <Sidebar toggle={toggleDrawer} state={state} setState={setState}/>
            </Box>
        )
    }

    return (
        <div>
            {NavAppbar()}
        </div>
    )
}

export default Navbar
import React, { useContext, useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Image from '../../components/Image';
import "./style.scss";
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import WalletButton from '../WalletButton';
import Logo from "../../assets/images/logo.png";

export default function Appbar({ title, description }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box className="appbar-container">
                <Box className="mobile-menu">
                    <IconButton
                        id="basic-button"
                        className="menu-icon"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Hamburger toggled={open} size={20} />
                    </IconButton >
                    <Menu
                        className="mobile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>
                            <Image className="mobile-logo" href="/" src={Logo} />
                        </MenuItem>
                        <MenuItem onClick={handleClose}><Link to="https://cruiz.ai" >Home</Link></MenuItem>
                        {/* <MenuItem onClick={handleClose}><Link to="/" >BVB Website</Link></MenuItem> */}
                        <MenuItem onClick={handleClose}><Link to="/" >My Reward</Link></MenuItem>
                    </Menu>
                </Box>
                <Box className="page-title" sx={{ flexGrow: 1 }}>
                    <Typography className='title' variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography className='description' component="div">
                        {description}
                    </Typography>
                </Box>
                <WalletButton />
            </Box>
            <Box className="mobile-page-title">
                <Typography className='title' variant="h6" component="div">
                    {title}
                </Typography>
                <Typography className='description' component="div">
                    {description}
                </Typography>
            </Box>
        </>
    )
}

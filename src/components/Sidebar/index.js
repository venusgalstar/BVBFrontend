import React, { useContext, useState } from 'react';
import { Box, Button, List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import LogoImage from "../../assets/images/logo.png";
import Image from '../../components/Image';
import "./style.scss";
import CenterBox from '../CenterBox';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState(parseInt(localStorage.getItem("activeItem")) || 0);

    const handleListItemClick = (event, index) => {
        localStorage.setItem("activeItem", index);
        setActiveItem(index);
    }

    return (
        <>
            <Box className="sidebar-container">
                <CenterBox className="logo">
                    <Image href="https://cruiz.ai" src={LogoImage} />
                </CenterBox>
                <List component="nav" className='menu-wrapper'>
                    {/* <Link to="/">
                        <ListItemButton className={`menu-item ${activeItem === 0 ? "active" : ""}`}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon className='menu-icon'>
                                <Image src={`icons/stake${activeItem === 0 ? "_active" : ""}.svg`} />
                            </ListItemIcon>
                            <ListItemText primary="BVB Reward" className='menu-text' />
                        </ListItemButton>
                    </Link> */}
                    <Link to="/">
                        <ListItemButton className={`menu-item ${activeItem === 1 ? "active" : ""}`}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon className='menu-icon'>
                                <Image src={`icons/marketplace${activeItem === 1 ? "_active" : ""}.svg`} />
                            </ListItemIcon>
                            <ListItemText primary="My Reward" className='menu-text' />
                        </ListItemButton>
                    </Link>
                </List>
            </Box>
        </>
    )
}

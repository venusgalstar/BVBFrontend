import React from 'react';
import { Box } from '@mui/material';
import "./style.scss";
import Sidebar from '../Sidebar';
import Appbar from '../Appbar';

export default function DashboardLayout(props) {
    const { children, className, ...restProps } = props;
    return (
        <Box {...restProps}>
            <Sidebar />
            <Appbar title="CRUIZ Staking" description="Stake CRUIZ and receive CRUIZ after lock is released." />
            <Box className="main-layout">
                <Box className={className}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

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
            <Appbar title="BVB Reward" description="Hold BVB and receive BVB when you want." />
            <Box className="main-layout">
                <Box className={className}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

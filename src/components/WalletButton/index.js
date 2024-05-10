import React, { useContext, useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import "./style.scss";
import LogoutIcon from '@mui/icons-material/Logout';
import CenterBox from './../CenterBox/index';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { formatAddress } from '../../utils';
import { toast } from 'react-toastify';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'

export default function WalletButton() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { open } = useWeb3Modal();

    const onLogout = (e) => {
        e.stopPropagation();
        disconnect();
    }

    const onCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(address);
        toast.success("Copied");
    }

    const connectWallet = () => {
        open();
    }

    return (
        <Box className="wallet-container">
            {!address ?
                <Button className="btn-connect-wallet" onClick={connectWallet}>
                    <AccountBalanceWalletIcon fontSize='small' />
                    <Typography>Connect Wallet</Typography>
                </Button> :
                <Box className="account-container">
                    <CenterBox>
                        <Typography className='hold-amount'>{0 || "0.0"} BVB</Typography>
                    </CenterBox>
                    <Button className="account-wrapper" onClick={onCopy}>
                        <Typography className='address'>{formatAddress(address)}</Typography>
                        <IconButton className="logout" onClick={onLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Button>
                </Box>
            }
        </Box>
    )
}

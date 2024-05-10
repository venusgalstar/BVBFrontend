import React, { useContext, useEffect, useState } from 'react'
import "./style.scss";
import { Box, Button, Container, Grid, IconButton, Input, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import PersonIcon from '@mui/icons-material/Person';
import { toast } from 'react-toastify';
import { formatAddress } from '../../utils';
import { useAccount } from 'wagmi';
import { AppContext } from '../../';

export default function Home() {
  const [amount, setAmount] = useState();
  const { address } = useAccount();
  const { amountToken, stakeOptions, setStakeOptions } = useContext(AppContext);

  const onAmountChange = (e) => {
    const value = e.target.value;

    setAmount(value);
  }

  const onMaxClick = () => {
    setAmount(amountToken);
  }

  const onOptionSelected = (index) => {
    setStakeOptions(prev => prev.map((option, i) => {
      option.selected = i === index;
      return option;
    }));
  }

  const stakeFunds = async () => {
  }

  const onStake = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!amount) {
      toast.error("Please enter amount");
      return;
    }

    if (isNaN(parseFloat(amount)) || !isFinite(amount)) {
      toast.error("Amount is invalid");
      return;
    }

    if (amount < 100) {
      toast.error("Minimum amount to stake is 100");
      return;
    }

    if (amountToken - amount < 0) {
      toast.error("Insufficient balance");
      return;
    }

    const selectedOption = stakeOptions.find(option => option.selected);
    if (!selectedOption) {
      toast.error("Please select a stake option");
      return;
    }

    await stakeFunds();
  }

  return (
    <DashboardLayout className="home-box">
      <Box className="card">
        <Box className="card-header">
          <Box>
            <Typography className='amount-label'>Available to Stake</Typography>
            <Typography className='amount'>{amountToken} CRUIZ</Typography>
          </Box>
          <Box className="account-container">
            <Typography className='address'>{formatAddress(address)}</Typography>
            <IconButton className="avatar" size='small'>
              <PersonIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className="card-body">
          <Box className="input-group">
            <TextField value={amount} variant="outlined" placeholder="Amount to stake (min: 100)" onChange={onAmountChange} />
            <Button className="btn-max" onClick={onMaxClick}>MAX</Button>
          </Box>
          {stakeOptions.map((option, index) => (
            <Grid container className={`stake-option ${option.selected ? "selected" : ""}`} key={option.duration} onClick={() => onOptionSelected(index)}>
              <Grid item xs={4}>
                <Typography className='column-title'>Months</Typography>
                <Typography className='column-value'>{option.duration ?? 0} Month{option.duration === 1 ? "" : "s"}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className='column-title'>Reward</Typography>
                <Typography className='column-value'>{option.reward_percentage ?? 0}%</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className='column-title'>Receive</Typography>
                <Typography className='column-value'>{option.receive ?? 0} CRUIZ</Typography>
              </Grid>
            </Grid>
          ))}
          <Button className="btn-stake" onClick={onStake}>Submit</Button>
        </Box>
      </Box>
    </DashboardLayout >
  )
}

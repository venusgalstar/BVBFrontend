import React, { useContext, useEffect, useState } from 'react'
import "./style.scss";
import { Box, Button, Container, Grid, IconButton, Input, List, ListItem, TextField, Typography } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import { AppContext } from '../..';
import { toast } from 'react-toastify';
import "moment-timezone";
import moment from "moment";
import { useAccount } from 'wagmi';
import {
  getTokenBalance,
  getRewardBalance,
  claimReward
} from '../../contracts/api';

import Image from '../../components/Image';
import LogoImage from "../../assets/images/brand.jpg";

export default function StakeLog() {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(0);
  const { address, chainId } = useAccount();

  console.log("chainId");

  const updateInfo = async () => {
    const tokenBalanceInfo = await getTokenBalance(address, chainId)
    setTokenBalance(tokenBalanceInfo)

    const rewardBalanceInfo = await getRewardBalance(address, chainId)
    setRewardBalance(rewardBalanceInfo)
  }

  const onClaim = async () =>{
    await claimReward();
    await updateInfo();
  }
  useEffect(() => {
    updateInfo();
  }, [])

  return (
    <DashboardLayout className="stakelog-box">
      <Box className="card">
        <Box className="card-header">
          <Box>
            <Typography className='header-title'>My Balance</Typography>
          </Box>
          <Box className="account-container">
            <Typography className='address'>{tokenBalance} BVB Amount</Typography>
          </Box>
        </Box>
        <Box className="card-body">
          <Grid container className={`stake-option selected`} key={1}>
            <Grid xs={4} md={3} lg={6}>
              <Typography className='column-title'>Reward</Typography>
              <Typography className='column-value'>
                {rewardBalance}
              </Typography>
            </Grid>
            <Grid xs={4} md={3} lg={6}>
              <Typography className='column-title'>Claim</Typography>
              <Typography className='column-value'>
                <Button onClick={onClaim} className='!text-white'>
                  Claim Reward
                </Button>
              </Typography>
            </Grid>
            {/* <Grid item xs={4} md={3} lg={2}>
              <Typography className='column-title'>Reward</Typography>
              <Typography className='column-value'>{getStakeRewardRate(item.stake_type)}%</Typography>
            </Grid>
            <Grid item xs={4} md={3} lg={2}>
              <Typography className='column-title'>Amount</Typography>
              <Typography className='column-value'>{item.amount ?? 0} BVB</Typography>
            </Grid>
            <Grid item xs={4} md={3} lg={2}>
              <Typography className='column-title'>Receive</Typography>
              <Typography className='column-value'>
                + {getStakeRewardAmount(item.amount, item.stake_type)} BVB
              </Typography>
            </Grid>
            <Grid item xs={4} md={3} lg={2}>
              <Typography className='column-title'>
                {item.flag === 1 ?
                  <span className='rewarded'>{item.reward_amount ?? 0} BVB</span> :
                  "Days left"}
              </Typography>
              <Typography className='column-value'>
                {
                  item.flag === 1 ?
                    <Typography className='rewarded'>Rewarded</Typography> :
                    `${calulateDays(item)} days`
                }
              </Typography>
            </Grid>
            <Grid item xs={4} md={6} lg={2}>
              <Typography className='column-title'>Date</Typography>
              <Typography className='column-value'>
                {moment(item.created_at).format("DD/MM/YYYY HH:mm")}
              </Typography>
            </Grid> */}
          </Grid>
          <Image href="https://cruiz.ai" src={LogoImage} className={'stake-option' } />

        </Box>
      </Box>
    </DashboardLayout >
  )
}

import React, { useContext, useEffect, useState } from 'react'
import "./style.scss";
import { Box, Button, Container, Grid, IconButton, Input, List, ListItem, TextField, Typography } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import { AppContext } from '../..';
import { toast } from 'react-toastify';
import "moment-timezone";
import moment from "moment";
import { useAccount } from 'wagmi';

export default function StakeLog() {
  const [stakeLogs, setStakeLogs] = useState([]);
  const [totalStaked, setTotalStaked] = useState(0);
  const { address } = useAccount();
  const { stakeOptions } = useContext(AppContext);

  const getStakeDuration = (stakeType) => {
    if (!stakeOptions || stakeOptions.length === 0) return 0;

    const stakeOption = stakeOptions.find(option => option.id === stakeType);
    return stakeOption?.duration ?? 0;
  }

  const getStakeRewardRate = (stakeType) => {
    if (!stakeOptions || stakeOptions.length === 0) return 0;

    const stakeOption = stakeOptions.find(option => option.id === stakeType);
    return stakeOption?.reward_percentage ?? 0;
  }

  const getStakeRewardAmount = (amount, stakeType) => {
    if (!stakeOptions || stakeOptions.length === 0) return 0;

    const stakeOption = stakeOptions.find(option => option.id === stakeType);
    if (!stakeOption.reward_percentage) return 0;

    return amount * stakeOption?.reward_percentage / 100;
  }

  const calulateDays = (item) => {
    if (!stakeOptions || stakeOptions.length === 0) return 0;

    const stakeOption = stakeOptions.find(option => option.id === item.stake_type);
    if (!stakeOption.duration) return 0;

    const startTime = moment(item.created_at);
    const endTime = moment(startTime).add(stakeOption.duration, 'months');

    const currentTime = moment();
    const daysLeft = endTime.diff(currentTime, 'days');

    return Math.max(0, daysLeft);
  }

  const getStakeLogs = async () => {
    if (!address) {
      toast.error("Please connect your wallet first.");
      return;
    }
  }

  useEffect(() => {
    getStakeLogs();
  }, [])

  return (
    <DashboardLayout className="stakelog-box">
      <Box className="card">
        <Box className="card-header">
          <Box>
            <Typography className='header-title'>My Staking</Typography>
          </Box>
          <Box className="account-container">
            <Typography className='address'>{totalStaked} CRUIZ Staked</Typography>
          </Box>
        </Box>
        <Box className="card-body">
          {stakeLogs.map((item, index) =>
            <Grid container className={`stake-option ${item.selected ? "selected" : ""}`} key={index}>
              <Grid item xs={4} md={3} lg={2}>
                <Typography className='column-title'>Months</Typography>
                <Typography className='column-value'>
                  {getStakeDuration(item.stake_type)} Month{getStakeDuration(item.stake_type) === 1 ? "" : "s"}
                </Typography>
              </Grid>
              <Grid item xs={4} md={3} lg={2}>
                <Typography className='column-title'>Reward</Typography>
                <Typography className='column-value'>{getStakeRewardRate(item.stake_type)}%</Typography>
              </Grid>
              <Grid item xs={4} md={3} lg={2}>
                <Typography className='column-title'>Amount</Typography>
                <Typography className='column-value'>{item.amount ?? 0} CRUIZ</Typography>
              </Grid>
              <Grid item xs={4} md={3} lg={2}>
                <Typography className='column-title'>Receive</Typography>
                <Typography className='column-value'>
                  + {getStakeRewardAmount(item.amount, item.stake_type)} CRUIZ
                </Typography>
              </Grid>
              <Grid item xs={4} md={3} lg={2}>
                <Typography className='column-title'>
                  {item.flag === 1 ?
                    <span className='rewarded'>{item.reward_amount ?? 0} CRUIZ</span> :
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
              </Grid>
            </Grid>
          )}
          {stakeLogs.length === 0 &&
            <Typography className='no-data'>No data</Typography>
          }
        </Box>
      </Box>
    </DashboardLayout >
  )
}

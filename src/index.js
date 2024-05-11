import React, { useEffect, useState } from 'react';
import * as ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { useAccount, WagmiConfig } from 'wagmi'
import { holesky } from 'viem/chains'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import "./global.scss";
import Home from "./pages/home";
import StakeLog from './pages/stakelog';
import { getTokenBalance } from './contracts/api';
import { Box, Button, Stack } from '@mui/material';

const projectId = '32487a201756fc4239683ac0b3568cb9'
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [holesky]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

export const AppContext = React.createContext();

function AppProvider({ children }) {
  const { address } = useAccount();
  const [amountToken, setAmountToken] = useState(0);
  const [lookVisible, setLookVisible] = useState(false);
  const [stakeOptions, setStakeOptions] = useState([
    {
      duration: 1,
      reward_percentage: 0.5,
      selected: false
    },
    {
      duration: 3,
      reward_percentage: 2,
      selected: false
    },
    {
      duration: 6,
      reward_percentage: 4.5,
      selected: false
    },
    {
      duration: 12,
      reward_percentage: 10,
      selected: false
    },
  ]);

  useEffect(() => {
    if (address) {
      getTokenBalance(address).then(balance => {
        setAmountToken(balance);
      });
    }
  }, [address]);

  return (
    <AppContext.Provider value={{
      amountToken,
      setAmountToken,
      stakeOptions,
      setStakeOptions
    }}>
      {
        lookVisible &&
        <Box className="coming-soon">
          <Stack>
            COMING SOON!
            <Button className="btn-look" onClick={() => { setLookVisible(false) }}>Take A Look</Button>
          </Stack>
        </Box>
      }
      {children}
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={2000} hideProgressBar toastClassName="bg-toast" closeOnClick />
    </AppContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <AppProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<StakeLog />} />
          </Routes>
        </Router>
      </AppProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

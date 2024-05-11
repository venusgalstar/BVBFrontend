import BASE_ABI from './base_abi.json';
import BLAST_ABI from './blast_abi.json';
import Web3 from 'web3';
import { writeContract, waitForTransaction } from '@wagmi/core';
import { toast } from "react-toastify";
import { showError } from '../utils';

const TOAST_DELAY = 2000;
const CONTRACT_ADDRESS = '0xb5abF6622E62Aff0D95f02b0C7e4aeC4894cbA3f';

const baseWeb3 = new Web3("https://mainnet.base.org/");
const blastWeb3 = new Web3("https://rpc.blast.io");

const baseChainId = 8453;
const blastChainId = 81457;

const baseTokenContract = new baseWeb3.eth.Contract(BASE_ABI, CONTRACT_ADDRESS);
const blastTokenContract = new blastWeb3.eth.Contract(BLAST_ABI, CONTRACT_ADDRESS);

export const getContract = () => {
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
};

export const getTokenBalance = async (address, chainID) => {
    try {
        let balance = 0;
        if( chainID == blastChainId )
            balance = await blastTokenContract.methods.balanceOf(address).call();
        else if( chainID == baseChainId)
            balance = await baseTokenContract.methods.balanceOf(address).call();

        return balance / 10 ** 18;
    } catch (e) {
        return 0;
    }
}

export const getRewardBalance = async (address, chainID) => {
    try {
        let balance = 0;
        if( chainID == blastChainId )
            balance = await blastTokenContract.methods.getUnpaidEarnings(address).call();
        else if( chainID == baseChainId)
            balance = await baseTokenContract.methods.getUnpaidEarnings(address).call();

        return balance / 10 ** 18;
    } catch (e) {
        return 0;
    }
}

export const claimReward = async (address, chainID) => {
    try {
        if( chainID == blastChainId )
            await blastTokenContract.methods.claimDividend().send();
        else if( chainID == baseChainId)
            await baseTokenContract.methods.claimDividend().send();

        return balance / 10 ** 18;
    } catch (e) {
        return 0;
    }
}


export const getTokenSymbol = async () => {
    try {
        let symbol = "";
        if( chainID == blastChainId )
            symbol = await blastTokenContract.methods.symbol().call();
        else if( chainID == baseChainId)
            symbol = await baseTokenContract.methods.symbol().call();

        return symbol;
    } catch (e) {
        return 0;
    }
}

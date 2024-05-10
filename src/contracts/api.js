import ABI from './abi.json';
import TOKEN_ABI from "./token_abi.json";
import Web3 from 'web3';
import { writeContract, waitForTransaction } from '@wagmi/core';
import { toast } from "react-toastify";
import { showError } from '../utils';

const TOAST_DELAY = 2000;
const CONTRACT_ADDRESS = '0xE4393b65d2';

const web3 = new Web3("https://bsc-testnet-rpc.publicnode.com");

export const getContract = () => {
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
};

const checkAllowance = async (tokenContractAddress, ownerAddress, spenderAddress) => {
    const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenContractAddress);
    const allowance = await tokenContract.methods.allowance(ownerAddress, spenderAddress).call();
    return allowance;
};

const approveTokens = async (tokenContractAddress, stakingContractAddress, amount, userAddress, toastId) => {
    const currentAllowance = await checkAllowance(tokenContractAddress, userAddress, stakingContractAddress);

    const amountBN = web3.utils.toBN(web3.utils.toWei(amount.toString(), 'ether'));
    const currentAllowanceBN = web3.utils.toBN(currentAllowance);

    if (amountBN.gt(currentAllowanceBN)) {
        const amountToApprove = amountBN.sub(currentAllowanceBN).toString();

        const result = await writeContract({
            address: tokenContractAddress,
            abi: TOKEN_ABI,
            functionName: 'approve',
            args: [stakingContractAddress, amountToApprove],
            account: userAddress,
        });

        if (toastId) {
            toast.update(toastId, { render: "Please wait while transaction is confirmed..." });
        }

        const transactionReceipt = await waitForTransaction({
            hash: result.hash,
        });

        if (transactionReceipt.status === "success") {
            return transactionReceipt
        }

        return false;
    }

    return true;
};

export const getTokenBalance = async (tokenAddress, address) => {
    try {
        const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
        const balance = await tokenContract.methods.balanceOf(address).call();

        return balance / 10 ** 18;
    } catch (e) {
        return 0;
    }
}

export const getTokenSymbol = async (tokenAddress) => {
    try {
        const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenAddress);
        const symbol = await tokenContract.methods.symbol().call();

        return symbol;
    } catch (e) {
        return 0;
    }
}

export const createOrder = async (tokenContractAddress, tokenAmount, ethAmount, userAddress, partiallyFillable, whitelistedAddress) => {
    const toastId = toast.loading("Checking token allowance...");

    try {
        const approvalResponse = await approveTokens(tokenContractAddress, CONTRACT_ADDRESS, tokenAmount, userAddress, toastId);
        if (!approvalResponse) {
            toast.update(toastId, { render: "Cannot allow your tokens.", type: "error", isLoading: false, autoClose: TOAST_DELAY });
            return;
        }

        toast.update(toastId, { render: "Order request is now processing..." });

        const result = await writeContract({
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: 'requestOrder',
            args: [
                tokenContractAddress,
                web3.utils.toWei(tokenAmount.toString(), 'ether'),
                web3.utils.toWei(ethAmount.toString(), 'ether'),
                partiallyFillable,
                whitelistedAddress || "0x0000000000000000000000000000000000000000"
            ],
            account: userAddress,
        });

        toast.update(toastId, { render: "Please wait while offer transaction is confirmed..." });

        const transactionReceipt = await waitForTransaction({
            hash: result.hash,
        });

        console.log("transactionReceipt", transactionReceipt)

        if (transactionReceipt.status === "success") {
            toast.update(toastId, { render: "Order created successfully", type: "success", isLoading: false, autoClose: TOAST_DELAY });
        } else {
            toast.update(toastId, { render: "Transaction was unsuccessful.", type: "error", isLoading: false, autoClose: TOAST_DELAY });
        }

        return true;
    } catch (error) {
        console.error("Create Order Error: ", error);
        showError(error, toastId);
        return false;
    }
};

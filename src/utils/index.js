import { toast } from "react-toastify";

export const formatAddress = (address) => {
    if (!address) return;

    const firstFourChars = address.substr(0, 6);
    const lastFourChars = address.substr(-4);
    const styledAddress = `${firstFourChars}...${lastFourChars}`;

    return styledAddress;
}

export const roundValue = (number, decimal = 4) => {
    if (isNaN(number / 1)) return "0";

    return (Math.trunc(number * 10 ** decimal) / 10 ** decimal).toLocaleString();
}

export function formatTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return dateTimeString;
}

export const showError = (error) => {
    if (error.message) {
        toast.error(error.message);
        return;
    }

    if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMessage = "Something went wrong.";

        if (errorData.startsWith('0x')) {
            const reasonHex = errorData.startsWith('0x08c379a0')
                ? errorData.substring(138)
                : errorData;

            try {
                const decoded = web3.eth.abi.decodeParameters(['string'], reasonHex);
                errorMessage = decoded[0];
            } catch (decodingError) {
                console.error("Error decoding revert reason: ", decodingError);
            }
        }

        toast.error(errorMessage);
    } else {
        toast.error("An unknown error occurred.");
    }
}
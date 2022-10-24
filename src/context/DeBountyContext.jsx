//All smart contract connection & call will begin from here

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const DebountyContext = React.createContext();

//provides metmask connection
const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const deBountyContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return deBountyContract;
};

export const DebountyProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Mmask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setLoggedIn(true);
      localStorage.setItem("loggedIn", JSON.stringify({ entry: true }));

      console.log("Wallet connectes", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error on wallet connection", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    document.location.href = "/";
    setLoggedIn(false);
  };

  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("No wallet detected, makesure yo have metamask wallet ");
        return;
      } else {
        console.log("Wallet detected", ethereum);
      }

      const accounts = await ethereum.request({ methods: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Current active account", account);
        setLoggedIn(true);
        const logged = JSON.parse(localStorage.getItem("loggedIn")).entry;
        logged && setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerHunter = async (formData) => {
    try {
      if (ethereum) {
        console.log("Form data", formData);
        const deBountyContract = createEthereumContract();
        const { name } = formData;
        const registerTxn = await deBountyContract.registerHunter(name, {
          gasLimit: 300000,
        });

        console.log("Registering..wait", registerTxn.hash);
        await registerTxn.wait();
        console.log("Registration complete", registerTxn.hash);
        window.location.reload();
      } else {
        console.log("Failed to connect to metamask wallet");
      }
    } catch (error) {
      console.log("Reg error", error);
      window.alert("Registration Unsuccessful", error);
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <DebountyContext.Provider
      value={{
        connectWallet,
        currentAccount,
        logout,
        checkWalletConnection,
        registerHunter,
      }}
    >
      {children}
    </DebountyContext.Provider>
  );
};

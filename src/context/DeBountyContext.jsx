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
  const [validHunter, setValidHunter] = useState(false);
  const [validCompany, setValidCompany] = useState(false);
  const [allUnsolvedIssues, setAllUnsolvedIssues] = useState([]);

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
      localStorage.setItem("currentAccount", JSON.stringify(accounts[0]));

      console.log("Wallet connectes", accounts[0]);
      setCurrentAccount(accounts[0]);
      window.location.href = "/getstarted";
    } catch (error) {
      console.log("Error on wallet connection", error);
    }
  };

  //get logged in hunter details
  const getHunter = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const hunter = await deBountyContract.getHunter();
        console.log("Hunter : ", hunter);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }    
  }

  //get logged in company details
  const getCompany = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const company = await deBountyContract.getCompany();
        console.log("Company : ", company);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }    
  }

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentAccount");
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

      const accounts = await ethereum.request({ method: 'eth_accounts' })

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
        if (registerTxn.hash) {
          localStorage.setItem("user", JSON.stringify(formData));
          window.location.href = "/all-issues";
        }
        // window.location.reload();
      } else {
        console.log("Failed to connect to metamask wallet");
      }
    } catch (error) {
      console.log("Reg error", error);
      window.alert("Registration Unsuccessful", error);
    }
  };

  const registerCompany = async (formData) => {
    try {
      if (ethereum) {
        console.log("Company reg form data", formData);
        const deBountyContract = createEthereumContract();
        const { name, phone } = formData;
        const registerTxn = await deBountyContract.registerCompany(
          name,
          phone,
          {
            gasLimit: 300000,
          }
        );
        console.log("Registering..wait", registerTxn.hash);
        await registerTxn.wait();
        console.log("Registration complete", registerTxn.hash);
      } else {
        console.log("Failed to connect to metamask wallet");
      }
    } catch (error) {
      console.log("Company Reg error", error);

      window.alert("Registration Unsuccessful", error);
    }
  };

  const checkValidHunter = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const validHunte = await deBountyContract.isHunterValid();
        setValidHunter(validHunte);
        console.log("User status:", validHunte);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkValidCompany = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const validComp = await deBountyContract.isCompanyValid();
        setValidCompany(validComp);
        console.log("Company status:", validComp);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get all unsolved issues and store them in allUnsolvedIssues Array
  const getAllUnsolvedIssues = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const issues = await deBountyContract.getAllUnsolvedIssues();
        setAllUnsolvedIssues(issues);
        console.log("All unsolved issues", allUnsolvedIssues);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Posting a new issue by company
  const postIssue = async (formData) => {
    try {
      if (ethereum) {
        console.log("Company reg form data", formData);
        const { title, description, hash, reward } = formData;
        const deBountyContract = createEthereumContract();
        const postTxn = await deBountyContract.postIssue(
          title,
          description,
          hash,
          reward,
          {
            value: reward
          }
        );
        console.log("Posting issue", postTxn.hash);
        await postTxn.wait();
        console.log("Posting complete", postTxn.hash);
      } else {
        console.log("Failed to connect to metamask wallet");
      }
    } catch (error) {
      console.log("Posting issue error", error);

      window.alert("Issue Posting Unsuccessful", error);
    }
  };

  useEffect(() => {
    checkWalletConnection();
    if (
      JSON.parse(localStorage.getItem("loggedIn")) &&
      localStorage.getItem("currentAccount")
    ) {
      setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")).entry);
      setCurrentAccount(localStorage.getItem("currentAccount"));
    }
    getCompany()
  }, []);

  return (
    <DebountyContext.Provider
      value={{
        loggedIn,
        connectWallet,
        currentAccount,
        validHunter,
        checkValidHunter,
        checkValidCompany,
        validCompany,
        logout,
        checkWalletConnection,
        registerHunter,
        registerCompany,
        postIssue
      }}
    >
      {children}
    </DebountyContext.Provider>
  );
};

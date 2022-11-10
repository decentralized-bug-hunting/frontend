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
  const [allIssues, setAllIssues] = useState([])
  const [company, setCompany] = useState([]);
  const [hunter, setHunter] = useState("");
  const [allProposedSolutions, setAllProposedSolutions] = useState([])


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
        setHunter(hunter[0])
        console.log("Hunter : ", hunter);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get logged in company details
  const getCompany = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const company = await deBountyContract.getCompany();
        console.log("Company : ", company);
        setCompany(company);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      const accounts = await ethereum.request({ method: "eth_accounts" });

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
        const { name, nftMetadata } = formData;
        const registerTxn = await deBountyContract.registerCompany(
          name,
          nftMetadata,
          {
            gasLimit: 300000,
          }
        );
        console.log("Registering..wait", registerTxn.hash);
        await registerTxn.wait();
        console.log("Registration complete", registerTxn.hash);
        window.location.href = "/dashboard";
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
            value: reward,
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

  //get total number of issues on contract
  const issueCount = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const count = await deBountyContract.issueCount();
        console.log("Total num of Issues:", count.toString());
        let number = Number(count.toString());
        return number;
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Fetches all the issues on the contract
  const fetchAllIssues = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        let count = await issueCount();
        let issues = [];
        for (let i = 0; i < count; i++) {
          const issue = await deBountyContract.issues(i);
          issues.push(issue);
          // console.log("All Issues", issue);
        }
        setAllIssues(issues);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch a single Issue
  const fetchIssue = async (id) => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const issue = await deBountyContract.issues(id);
        return issue;
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //post solution
  const postSolution = async (formData) => {
    try {
      if (ethereum) {
        console.log("Solution details", formData);
        const { issueId, description } = formData;
        const deBountyContract = createEthereumContract();
        const postTxn = await deBountyContract.postSolutionProposal(
          issueId,
          description,
          {
            gasLimit: 300000,
          }
        );
        console.log("Posting Solution", postTxn.hash);
        await postTxn.wait();
        console.log("Posting solution", postTxn.hash);
      } else {
        console.log("Failed to connect to metamask wallet");
      }
    } catch (error) {
      console.log("Posting solution error", error);

      window.alert("solution Posting Unsuccessful", error);
    }
  };

  //get all proposed solution by a company by issueId
  const getAllProposedSolutions = async () => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        const allProposedSolutions = await deBountyContract.getAllProposedSolutions();
        setAllProposedSolutions(allProposedSolutions);
        console.log("All Proposed Solutions", allProposedSolutions);
        // return allProposedSolutions
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetching all proposed solution
  // const fetchAllProposedSolns = async () => {
  //   try {
  //     if (ethereum) {
  //       const deBountyContract = createEthereumContract();
  //       const allProposedSolutions = await deBountyContract.getAllProposedSolutions();
  //       console.log("All Proposed Solutions", allProposedSolutions);
  //       return allProposedSolutions
  //     } else {
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }    
  // }

  //Accept the proposed solution to an issue by the company with solution id and issueId
  const acceptProposedSolution = async (proposedSolnID, issueId) => {
    try {
      if (ethereum) {
        const deBountyContract = createEthereumContract();
        await deBountyContract.acceptProposedSolution(proposedSolnID, issueId);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
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
    issueCount()
    fetchAllIssues()
    checkValidCompany()
    checkValidHunter()
    getHunter()
    getAllProposedSolutions()
    // getAllProposedSolution(0)
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
        company,
        logout,
        checkWalletConnection,
        registerHunter,
        registerCompany,
        postIssue,
        postSolution,
        allIssues,
        getAllProposedSolutions,
        fetchIssue,
        acceptProposedSolution,
        issueCount,
        hunter,
        allProposedSolutions
      }}
    >
      {children}
    </DebountyContext.Provider>
  );
};

import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Web3Storage } from "web3.storage";
import { API_TOKEN } from "../../utils/constants";

import "./getstarted.css";
import { BsFillBugFill } from "react-icons/bs";
import { ImOffice, ImCross } from "react-icons/im";

import { RiAdminFill } from "react-icons/ri";
import { DebountyContext } from "../../context/DeBountyContext";
import { Link } from "react-router-dom";

function Getstarted() {
  const [modal, showmodal] = useState(false); //for hunter

  const [companyModal, showCompanyModal] = useState(false); //for company

  const {
    connectWallet,
    currentAccount,
    registerHunter,
    registerCompany,
    checkValidHunter,
    checkValidCompany,
    validHunter,
    validCompany,
  } = useContext(DebountyContext);

  useEffect(() => {
    checkValidHunter();
    checkValidCompany();
  }, []);

  const initialdata = {
    name: "",
  };
  const [formvalue, setFormvalue] = useState(initialdata);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [logoID, setLogoID] = useState("");
  const [initNFT, setinitNFT] = useState(false);

  const handleinputChange = (e) => {
    var { name, value } = e.target;
    setFormvalue({
      ...formvalue,
      [name]: value,
    });
    console.log(formvalue);
  };

  // Take file input from user
  const captureFile = (event) => {
    event.preventDefault();
    const fileInput = event.target;
    setFileName(fileInput.files[0].name);
    setFile(fileInput.files[0]);
  };

  function makeStorageClient() {
    return new Web3Storage({ token: API_TOKEN });
  }

  // upload file in ipfs
  async function storeFile(formData) {
    try {
      const client = makeStorageClient();
      const cid = await client.put([file]);
      setLogoID(cid);
      console.log("Stored files with cid:", cid);
      const logoUrl = `https://ipfs.io/ipfs/${cid}/${fileName}`;
      const desc = "NFT for hunters of DeBounty";
      const tokenData = JSON.stringify({
        image: logoUrl,
        description: desc,
      });
      const tokenDataFile = new File([tokenData], "metadata", {
        type: "json",
      });

      const finalCID = await client.put([tokenDataFile]);
      console.log("Final cid:", finalCID);
      formData.nftMetadata = `https://ipfs.io/ipfs/${finalCID}/metadata`;
      console.log("OKIEE--", formData);
      setinitNFT(false);
      registerCompany(formData);
    } catch (error) {
      setinitNFT(false);
      console.log("Error storing files:", error);
    }
  }

  const handleHunterFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get("name"),
    };
    console.log("OKIEE", formData);
    registerHunter(formData);
    event.currentTarget.reset();
  };

  const handleCompanyFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get("name"),
    };
    setinitNFT(true);
    storeFile(formData);
  };

  return (
    <>
      <Navbar />
      <div className="getstarted">
        <div className="title">
          <h1>Get Started</h1>
          <h2>Choose Appropriate Services</h2>
        </div>
        <div className="gcontainer">
          <div className="gcontent">
            <div className="gcard">
              <div className="icon">
                <BsFillBugFill />
              </div>
              <h2>I am a Bug Hunter</h2>

              {validHunter ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary">
                    {" "}
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <a href="#" onClick={() => showmodal(true)}>
                  <button>Signin</button>
                </a>
              )}
            </div>

            <div className="gcard">
              <div className="icon">
                <ImOffice />
              </div>
              <h2>We are a Company</h2>
              {validCompany ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary">
                    {" "}
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <a href="#" onClick={() => showCompanyModal(true)}>
                  <button>Signin</button>
                </a>
              )}
            </div>

            <div className="gcard">
              <div className="icon">
                <RiAdminFill />
              </div>
              <h2>I am a Admin </h2>
              <a href="#" onClick={() => showmodal(true)}>
                <button>Signin</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {modal === true && (
        <div className="modal">
          <div className="mcontainer">
            <h2>Register</h2>
            <form id="myform" onSubmit={handleHunterFormSubmit}>
              <div className="input_field">
                <h3>Name:</h3>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formvalue.name}
                  name="name"
                  onChange={handleinputChange}
                  id="name"
                />
              </div>

              <div className="mbutton">
                <input className="button" type="submit" value="Submit" />
              </div>
              <div className="cross" onClick={() => showmodal(false)}>
                <ImCross />
              </div>
            </form>
          </div>
        </div>
      )}

      {companyModal === true && (
        <div className="modal">
          <div className="mcontainer">
            <h2>Company Register</h2>
            <form id="myform" onSubmit={handleCompanyFormSubmit}>
              {!initNFT ? (
                <>
                  <div className="input_field">
                    <h3>Company Name:</h3>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formvalue.name}
                      name="name"
                      onChange={handleinputChange}
                      id="name"
                    />
                  </div>
                  <div className="input_field">
                    <h3>Company Logo:</h3>
                    <input
                      type="file"
                      accept="image/*"
                      name="logo"
                      onChange={captureFile}
                      id="logo"
                    />
                  </div>

                  <div className="mbutton">
                    <input className="button" type="submit" value="Submit" />
                  </div>
                </>
              ) : (
                <h3>Processing NFT Initialization. Please Wait</h3>
              )}
              <div className="cross" onClick={() => showCompanyModal(false)}>
                <ImCross />
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Getstarted;

import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "./getstarted.css";
import { BsFillBugFill } from "react-icons/bs";
import { ImOffice, ImCross } from "react-icons/im";

import { RiAdminFill } from "react-icons/ri";
import { DebountyContext } from "../../context/DeBountyContext";
import { Link } from "react-router-dom";

function Getstarted() {
  const [modal, showmodal] = useState(false);
  const {
    connectWallet,
    currentAccount,
    registerHunter,
    checkValidHunter,
    validHunter,
    getHunter
  } = useContext(DebountyContext);

  useEffect(() => {
    getHunter()
    checkValidHunter();
  }, []);

  const initialdata = {
    name: "",
    email: "",
    phone: "",
  };
  const [formvalue, setFormvalue] = useState(initialdata);

  const handleinputChange = (e) => {
    var { name, value } = e.target;
    setFormvalue({
      ...formvalue,
      [name]: value,
    });
    console.log(formvalue);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const formData = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
    };
    console.log("OKIEE", formData);
    registerHunter(formData);

    event.currentTarget.reset();
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
                  <Link to="/all-issues" className="btn btn-primary">
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
              <a href="#">
                <button onClick={() => showmodal(true)}>Signin</button>
              </a>
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
            <form id="myform" onSubmit={handleFormSubmit}>
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
              <div className="input_field">
                <h3>Email</h3>
                <input
                  type="text"
                  placeholder="Your Email Address"
                  value={formvalue.email}
                  name="email"
                  onChange={handleinputChange}
                  id="email"
                />
              </div>
              <div className="input_field">
                <h3>Phone Number:</h3>
                <input
                  type="text"
                  placeholder="Your Phone Number"
                  value={formvalue.phone}
                  name="phone"
                  onChange={handleinputChange}
                  id="phone"
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

      <Footer />
    </>
  );
}

export default Getstarted;

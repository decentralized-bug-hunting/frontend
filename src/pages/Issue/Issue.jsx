import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Issue.css";
import {DebountyContext} from '../../context/DeBountyContext'

function Issue() {
  const [issues, setIssues] = useState({
    title: "",
    description: "",
    hash: "",
    reward: 0
  });

  const {postIssue} = useContext(DebountyContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(issues);
    const {title, description, hash, reward} = issues;
    if(!title || !description || !hash || !reward){
      alert("Fill all the fields before submitting the form")
    }
    if(title && description && hash && reward){
      postIssue(issues)
    }
    // console.log("Submitted");
    // setIssues({
    //   title: "",
    //   description: "",
    //   hash: "",
    //   reward: 0
    // });
  };

  const handleChange = (e) => {
    setIssues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <form className="issue-form" onSubmit={handleSubmit}>
            <h2>Bug Submit Form</h2>
            <div>
              <p>Give a proper title to the issue</p>
              <input
                name="title"
                type="text"
                placeholder="Issue Title"
                onChange={handleChange}
                value={issues.title}
              />
            </div>
            <div>
              <p>A brief description to describe an issue to qualify as a bug</p>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                placeholder="Issue Description"
                onChange={handleChange}
                value={issues.description}
              />
            </div>
            <div>
              <p>Hash of nft</p>
              <input
                name="hash"
                type="text"
                placeholder="Hash of nft"
                onChange={handleChange}
                value={issues.hash}
              />
            </div>
            <div>
              <p>Reward amount in wei</p>
              <input
                name="reward"
                type="number"
                placeholder="Reward ether"
                onChange={handleChange}
                value={issues.reward}
              />
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Issue;

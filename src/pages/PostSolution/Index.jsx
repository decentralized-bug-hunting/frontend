import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../Issue/Issue.css";
import {useParams} from 'react-router-dom'
import {DebountyContext} from '../../context/DeBountyContext'

function PostSolution() {
  const params = useParams()
  const {id} = params;
  const [solution, setSolution] = useState({
    issueId: id,
    description: ""
  });

  const {postSolution} = useContext(DebountyContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(solution);
    postSolution(solution)
    console.log("Submitted");
  };

  const handleChange = (e) => {
    setSolution((prevState) => ({
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
            <h2>Submit Proposed solution</h2>
            <div>
              <p>Issue Id</p>
              <input
                name="issueId"
                type="text"
                placeholder="Issue ID"
                onChange={handleChange}
                value={solution.issueId}
                disabled
              />
            </div>
            <div>
              <p>A brief description of your solution</p>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                placeholder="Proposed Solution Description"
                onChange={handleChange}
                value={solution.description}
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

export default PostSolution;

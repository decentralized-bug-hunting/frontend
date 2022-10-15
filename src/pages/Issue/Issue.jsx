import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Issue.css";

function Issue() {
  const [issues, setIssues] = useState({
    title: "",
    description: "",
    expectedResult: "",
    actualResult: "",
    additionalInfo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(issues);
    console.log("Submitted");
    setIssues({
      title: "",
      description: "",
      expectedResult: "",
      actualResult: "",
      additionalInfo: "",
    });
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
        <form className="issue-form" onSubmit={handleSubmit}>
          <h2>Bug Submit Form</h2>
          <div>
            <p>Give a proper title to your Bug</p>
            <input
              name="title"
              type="text"
              placeholder="Issue Title"
              onChange={handleChange}
              value={issues.title}
            />
          </div>
          <div>
            <p>Step by step process to reproduce the bug</p>
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
            <p>What is the expected result?</p>
            <input
              name="expectedResult"
              type="text"
              placeholder="Expected Result"
              onChange={handleChange}
              value={issues.expectedResult}
            />
          </div>
          <div>
            <p>What is the actual behaviour?</p>
            <input
              name="actualResult"
              type="text"
              placeholder="Actual Result"
              onChange={handleChange}
              value={issues.actualResult}
            />
          </div>

          <div>
            <p>Submit images or screenshot links separated by comma</p>
            <input
              name="additionalInfo"
              type="text"
              placeholder="Additional Results"
              onChange={handleChange}
              value={issues.additionalInfo}
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Issue;

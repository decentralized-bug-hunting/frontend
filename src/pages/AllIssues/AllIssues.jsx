import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import IssueCard from "./IssueCard";
import "./AllIssues.css";

function AllIssues() {
  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="issues-container">
          <h2>&gt; All Issues</h2>
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllIssues;

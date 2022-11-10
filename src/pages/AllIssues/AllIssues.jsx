import React, {useContext} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import IssueCard from "./IssueCard";
import "./AllIssues.css";
import {DebountyContext} from '../../context/DeBountyContext'

function AllIssues() {
  const {allIssues} = useContext(DebountyContext)  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="issues-container">
          <h4>Issues</h4>
          <h2>Company Issues</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. </p>
          {
            allIssues.length == 0 && (
               (
                <h2 style={{marginTop: '2rem'}}>No Issues At the moment</h2>
              )
            )
          }
          {
            allIssues.map(issue => {
              return <div key={issue.id}>
                <IssueCard id={issue.id} title={issue.title} description={issue.description} reward={(issue.reward.toString()/1000000000000000000)} company={issue.creator}/>
              </div>
            })
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllIssues;

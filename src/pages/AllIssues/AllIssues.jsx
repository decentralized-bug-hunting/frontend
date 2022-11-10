import React, {useContext} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import IssueCard from "./IssueCard";
import "./AllIssues.css";
import {DebountyContext} from '../../context/DeBountyContext'

function AllIssues() {
  const {allIssues} = useContext(DebountyContext)
  const status = ['Posted','Solved','Cancelled'];
  console.log(allIssues)
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="issues-container">
          <h2>&gt; All Issues</h2>
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
                <IssueCard id={issue.id} title={issue.title} description={issue.description} reward={(issue.reward.toString()/1000000000000000000)} company={issue.creator} status={status[issue.status]}/>
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

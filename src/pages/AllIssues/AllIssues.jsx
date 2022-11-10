import React, {useContext} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import IssueCard from "./IssueCard";
import {Link} from 'react-router-dom'
import "./AllIssues.css";
import {DebountyContext} from '../../context/DeBountyContext'

function AllIssues() {
  const {allIssues, validCompany} = useContext(DebountyContext)
  const status = ['Posted','Solved','Cancelled'];
  console.log(allIssues)
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="issues-container">
          <h4>Issues</h4>
          <h2>All Issues</h2>
          <p>All the issues posted by the companies. The hunters can work on these issues and will be paid when the solution is accepted by the companies. Also a NFT issued by the company will be issued to the hunter's OpenSea wallet.</p>
          {
            validCompany && (
              <button className="issue-btn"><Link to="/issue">Post A New Issue</Link></button>
            )
          }          
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

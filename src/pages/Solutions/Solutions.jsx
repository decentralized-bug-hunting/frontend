import React, {useState, useEffect, useContext} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {useParams} from 'react-router-dom'
// import IssueCard from "./IssueCard";
// import "./AllIssues.css";
import {DebountyContext} from '../../context/DeBountyContext'
import './solutions.css';

function Solution() {
  const status = ["PROPOSED","ACCEPTED","REJECTED"]
  const params = useParams()
  const {id} = params;
  const [solutions, setSolutions] = useState([])
  const [issue, setIssue] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {allProposedSolutions, fetchIssue, acceptProposedSolution} = useContext(DebountyContext)  

  useEffect(() => {
    const fetchSolns = async () => {
        setIsLoading(true)
        let issue = await fetchIssue(id);
        setIssue(issue)
        setSolutions(allProposedSolutions)
        setIsLoading(false)
    }
    fetchSolns()
    // console.log("Solns",solutions);
  }, [])
  return (
    <>
      <Navbar />
      <div className="solutioncontainer">
        <h3>All solutions</h3>
        <h2>Solutions for {issue.title}</h2>
        {
            isLoading && (
                <h2>Loading...</h2>
            )
        }
         {
                       (allProposedSolutions.filter(soln => soln.issueID.toString() == id)).length == 0 ? (
                         <h2>No solutions for the issue.</h2>
                       ) : (allProposedSolutions.filter(soln => soln.issueID.toString() == id)).map(solution => {
                        console.log(solution);
                           let {id, issueID} = solution
                          return (
           
                    <div className="solutions" key={solution.id}>
                        <p>{solution.solutionDescription}</p>
                        <p><span>Proposed by:&nbsp;</span>{solution.proposer}</p>
                        <p><span>Status:&nbsp;</span> {status[solution.status]}</p>
                        <button onClick={() => acceptProposedSolution(id.toString())}>Accept Proposed Solution </button>
                    </div>
                
            
                )
                     })
                 }      
      </div>
      <Footer />
    </>
  );
}

export default Solution;



{/* <div className="solutions" key={solution.id}>
                        <p>{solution.solutionDescription}</p>
                        <p>{solution.proposer}</p>
                        <p>status: {status[solution.status]}</p>
                        <button onClick={() => acceptProposedSolution(id, issueID)}>Accept Proposed Solution</button>
                        <hr />
                    </div> */}





                  //   {
                  //     (allProposedSolutions.filter(soln => soln.issueID.toString() == id)).length == 0 ? (
                  //       <h2>No solutions for the issue.</h2>
                  //     ) : (allProposedSolutions.filter(soln => soln.issueID.toString() == id)).map(solution => {
                  //       console.log(solution);
                  //         let {id, issueID} = solution
                  //         return (
                  //             <div className="solutions" key={solution.id}>
                  //                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  //                 <p>Dipendra Neupane</p>
                  //                 <p>Status: Solved</p>
                  //                 <button>Accept Proposed Solution </button>
                  //                 <hr />
                  //             </div>
                  //         )
                  //     })
                  // } 
import React, {useState, useEffect, useContext} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {useParams} from 'react-router-dom'
// import IssueCard from "./IssueCard";
// import "./AllIssues.css";
import {DebountyContext} from '../../context/DeBountyContext'

function Solution() {
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
      <div className="container">
        <h2>{issue.title}</h2>
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
                    <div key={solution.id}>
                        <p>{solution.solutionDescription}</p>
                        <p>{solution.proposer}</p>
                        <button onClick={() => acceptProposedSolution(id, issueID)}>Accept Proposed Solution</button>
                        <hr />
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

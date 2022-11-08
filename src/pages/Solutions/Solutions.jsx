import React, {useState, useEffect, useContext} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// import IssueCard from "./IssueCard";
// import "./AllIssues.css";
import {DebountyContext} from '../../context/DeBountyContext'

function Solution() {
  const [solutions, setSolutions] = useState([])
  const [issue, setIssue] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {getAllProposedSolution, fetchIssue, acceptProposedSolution} = useContext(DebountyContext)  

  useEffect(() => {
    const fetchSolns = async () => {
        setIsLoading(true)
        let solns=  await getAllProposedSolution(0);
        let issue = await fetchIssue(solns[0].issueID.toString());
        setIssue(issue)
        setSolutions(solns)
        setIsLoading(false)
        // return solns;
    }
    fetchSolns()
    // console.log("Solns", );
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
            solutions.map(solution => {
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

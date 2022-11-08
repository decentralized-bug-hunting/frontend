import React, {useState, useEffect, useContext} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// import IssueCard from "./IssueCard";
// import "./AllIssues.css";
import {DebountyContext} from '../../context/DeBountyContext'

function Solution() {
  const [solutions, setSolutions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {getAllProposedSolution} = useContext(DebountyContext)  

  useEffect(() => {
    const fetchSolns = async () => {
        setIsLoading(true)
        let solns=  await getAllProposedSolution(0);
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
        {
            isLoading && (
                <h2>Loading...</h2>
            )
        }
        {
            solutions.map(solution => {
                return (
                    <div key={solution.id}>
                        <p>{solution.solutionDescription}</p>
                        <p>{solution.proposer}</p>
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

import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
// import IssueCard from "./IssueCard";
// import "./AllIssues.css";
import { DebountyContext } from "../../context/DeBountyContext";
import "./solutions.css";
import { toast } from "react-toastify";

function Solution() {
  const status = ["PROPOSED", "ACCEPTED", "REJECTED"];
  const params = useParams();
  const { id } = params;
  const [solutions, setSolutions] = useState([]);
  const [issue, setIssue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    allProposedSolutions,
    fetchIssue,
    acceptProposedSolution,
    validCompany,
    currentAccount,
    isMining,
  } = useContext(DebountyContext);

  useEffect(() => {
    const fetchSolns = async () => {
      setIsLoading(true);
      let issue = await fetchIssue(id);
      setIssue(issue);
      setSolutions(allProposedSolutions);
      setIsLoading(false);
    };
    fetchSolns();
    // console.log("Solns",solutions);
  }, []);

  isMining && toast.loading("Mining...", { autoClose: false });

  return (
    <>
      <Navbar />
      <div className="solutioncontainer">
        <h3>All solutions</h3>
        <h2>Solutions for {issue.title}</h2>
        {isLoading && <h2>Loading...</h2>}
        {allProposedSolutions.filter((soln) => soln.issueID.toString() == id)
          .length == 0 ? (
          <h2>No solutions for the issue.</h2>
        ) : (
          allProposedSolutions
            .filter((soln) => soln.issueID.toString() == id)
            .map((solution) => {
              console.log(solution.issueCreator);
              let { id, issueID } = solution;
              return (
                <div className="solutions" key={solution.id}>
                  <h3>Solutions #{solution.id.toString()}</h3>
                  <p>{solution.solutionDescription}</p>
                  <p>
                    <span>Proposed by:&nbsp;</span>
                    {solution.proposer}
                  </p>
                  <p>
                    <span>Status:&nbsp;</span> {status[solution.status]}
                  </p>
                  <p>
                    <span>Issue Created By:&nbsp;</span>
                    {solution.issueCreator}
                  </p>
                  {validCompany &&
                    solution.issueCreator.toLowerCase() == currentAccount &&
                    solution.issueStatus != "1" && (
                      <button
                        onClick={() => acceptProposedSolution(id.toString())}
                      >
                        Accept Proposed Solution
                      </button>
                    )}
                </div>
              );
            })
        )}
      </div>
      <Footer />
    </>
  );
}

export default Solution;

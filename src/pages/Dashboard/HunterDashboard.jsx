import { useEffect, useContext } from 'react'
import {DebountyContext} from '../../context/DeBountyContext'

const HunterDashboard = () => {

  const {hunter, allProposedSolutions, currentAccount, fetchIssue} = useContext(DebountyContext)
  // useEffect(() => {
  //   const getIssue = async () => {
  //     let issue = fetchIssue(id)
  //   }
  // }, [])
  return (
    <>
    <div>HunterDashboard</div>
    <h2>Hello, {hunter}</h2>
    <p>Here are all the solutions you proposed</p>
    {
      (allProposedSolutions.filter(solutions => solutions.proposer.toLowerCase() == currentAccount)).length == 0 ? (
        <h2>No solutionss posted. Post a new solutions to view here.</h2>
      ) : (allProposedSolutions.filter(solutions => solutions.proposer.toLowerCase() == currentAccount)).map(async solution => {
        let issue = await fetchIssue(solution.issueID.toString())
        console.log("Aayo ta issue", issue);
        return(
          <div key={solution.id.toString()}>{solution.solutionDescription}</div>
        )
      })
    }
    </>
  )
}

export default HunterDashboard
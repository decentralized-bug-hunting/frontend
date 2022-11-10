import { useContext } from 'react'
import { DebountyContext } from '../../context/DeBountyContext'
import './hunterdashboard.css'
import logo from '../../assets/debounty.png'
import {Link} from 'react-router-dom'

const HunterDashboard = () => {

  const { hunter, allProposedSolutions, currentAccount, fetchIssue } = useContext(DebountyContext)
  // useEffect(() => {
  //   const getIssue = async () => {
  //     let issue = fetchIssue(id)
  //   }
  // }, [])
  const mysolns = allProposedSolutions.filter(soln => soln.proposer.toLowerCase() == currentAccount);
  console.log("All proposed solutions from dashboard",allProposedSolutions);
  return (
    <div className='hunterdashboard'>
      <div className="title">
        <h4>Hello {hunter}, Welcome back</h4>
        <h2>User Dashboard</h2>
      </div>
      <div className='data'>
        <div className='left'>
          <img src={logo}></img>
        </div>
        <div className='right'>
          <div className='right-top'>
            <h2>{hunter}</h2>
            {/* <h3>{ } &nbsp; Lamachaur-16, Pokhara</h3> */}
          </div>
          <div className='right-bottom'>
            <h2>About</h2>
            <hr style={{ marginBottom: '10px' }} />
            <h4><span>Wallet:</span>&nbsp; {currentAccount}</h4>
          </div>
        </div>
      </div>
      <div className='hunterss'>
      <h1>Solutions you have proposed</h1>
      {
        mysolns.length == 0 && (
          <h3>No solutions posted by the user. Check <Link to="/all-issues">all issues</Link> to post an issue.</h3>
        )
      }
      {
      mysolns.map(soln => {
      return (
            
              
              <div className='huntersolutions' key={soln.id.toString()}>
                <h2>{soln.solutionDescription}</h2>
                  <Link to={`/all-issues/${soln.issueID.toString()}`}><button>Go to Issue</button></Link>
              </div>
            
          )
             })
           }
        
      
    </div>
    </div>
  )
}

export default HunterDashboard



// {
//   mysolns.map(soln => {
//     return (
//       <div key={soln.id.toString()}>
//         <h2>{soln.solutionDescription} on issue #<Link to={`/all-issues/${soln.issueID.toString()}`}>{soln.issueID.toString()}</Link></h2>
//       </div>
//     )
//   })
// }
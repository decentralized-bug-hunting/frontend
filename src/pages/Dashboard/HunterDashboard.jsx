import {useContext} from 'react'
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
    </>
  )
}

export default HunterDashboard
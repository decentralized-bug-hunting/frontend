import {useContext} from 'react'
import {DebountyContext} from '../../context/DeBountyContext'

const HunterDashboard = () => {
  const {hunter} = useContext(DebountyContext)
  return (
    <>
    <div>HunterDashboard</div>
    <h2>Hello, {hunter}</h2>
    <p>Here are all the solutions you proposed</p>
    </>
  )
}

export default HunterDashboard
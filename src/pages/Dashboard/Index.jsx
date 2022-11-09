import {useContext} from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import {DebountyContext} from '../../context/DeBountyContext'
import CompanyDashboard from './CompanyDashboard'
import HunterDashboard from './HunterDashboard'

const Dashboard = () => {
    const {validHunter, validCompany} = useContext(DebountyContext)
  return (
    <>
    <Navbar/>
    <div className="container">
        {validCompany && <CompanyDashboard/>}
        {validHunter && <HunterDashboard/>}
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard
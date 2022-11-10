import { useContext } from 'react'
import { DebountyContext } from "../../context/DeBountyContext"
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const CompanyProtectedRoute = ({ children }) => {
    const { validCompany } = useContext(DebountyContext)
    if (!validCompany) {
        // return <Navigate to="/getstarted"/>
        return (<>
            <Navbar />
            <div className="container">
                <div className="content" style={{textAlign:'center', margin: '10rem 0'}}>
                    <h2>You need to be a registered as a company to access this path.</h2>
                    <Link to="/">Go back to Home</Link>
                </div>
            </div>
            <Footer />
        </>)
    }
    return children
}

export default CompanyProtectedRoute

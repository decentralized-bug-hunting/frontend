import React, {useState, useContext, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import {DebountyContext} from '../../context/DeBountyContext'

const IssuePage
    = () => {
        const [loading, setLoading] = useState(false)
        const [issue, setIssue] = useState([])
        const {fetchIssue, validHunter, validCompany} = useContext(DebountyContext)
        const params = useParams();
        useEffect(() => {
            const getIssue = async () => {
                setLoading(true)
                let issue = await fetchIssue(params.id)
                setIssue(issue)
                console.log(issue);
                setLoading(false)
            }
            getIssue()
        }, [params.id])
        console.log(issue);

        const viewSolutions = () => {

        }
        return (
            <>
            <Navbar/>
            <div className="container">
                <div className="issue-content">
                    <h1 style={{margin: '2rem 0'}}>Issue Page</h1>
                    {
                        loading && (
                            <h2>Loading...</h2>
                        )
                    }
                    {
                        (!loading && issue) && (
                            <>
                                <h2>{issue.title}</h2>
                                <p>{issue.description}</p>
                                <p>Creator: {issue.creator}</p>

                                {/* <p>Reward: {issue.reward.toString()}</p> */}
                            </>
                        )
                    }
                    <div className="buttons">
                        {validHunter && <button>Post solution</button>}
                        {validCompany && <Link to={`/soltions/${issueId}`} ><button onClick={() => {console.log(issue.id.toString())}}>View all solutions</button></Link>}
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        )
    }

export default IssuePage

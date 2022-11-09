import React, {useState, useContext, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import {DebountyContext} from '../../context/DeBountyContext'

const IssuePage
    = () => {
        const [loading, setLoading] = useState(false)
        const [issue, setIssue] = useState([])
        const [reward, setReward] = useState(0)
        const {fetchIssue, validHunter, validCompany, currentAccount} = useContext(DebountyContext)
        const [owner, setOwner] = useState(false)
        const params = useParams();
        useEffect(() => {
            const getIssue = async () => {
                setLoading(true)
                let issue = await fetchIssue(params.id)
                setIssue(issue)
                setReward(issue.reward.toString()/1000000000000000000)
                setLoading(false)
                if(currentAccount == issue.creator.toLowerCase()){
                    setOwner(true)
                }
            }
            getIssue()
        }, [params.id])
        console.log(issue);
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
                                <p>{reward} eth</p>
                            </>
                        )
                    }
                    <div className="buttons">
                        {validHunter && <Link to={`/post-solution/${issue.id}`}><button>Post Solution</button></Link>}
                        {(validCompany && owner ) && <Link to={`/solutions/${issue.id}`} ><button onClick={() => {console.log(issue.id.toString())}}>View all solutions</button></Link>}
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        )
    }

export default IssuePage

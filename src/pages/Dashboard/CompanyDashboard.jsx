import { useEffect, useContext, useState } from 'react'
import { DebountyContext } from '../../context/DeBountyContext'
import { Link } from 'react-router-dom'
import companyIcon from '../../assets/brands/company-icon.png'
import rewardIcon from '../../assets/brands/reward.svg'
import logo from '../../assets/debounty.png'
import './companydashboard.css';


const CompanyDashboard = () => {
  const status = ['Posted','Solved','Cancelled'];
  const { allIssues, currentAccount, company, issueCount } = useContext(DebountyContext)
  return (
    <>
    <div className='company_details'>
      <div className='left'>
        <img src={logo}></img>
      </div>
      <div className='right'>
        <div className='right-top'>
          <h2>Company Name: {company[0]}</h2>
          {/* <h3>Wallet: {currentAccount}</h3> */}
        </div>
        <div className='right-bottom'>
          <h2>About</h2>
          <hr style={{marginBottom:'10px'}}/>
          <h4><span>Wallet</span>&nbsp; {currentAccount}</h4>

        </div>
      </div>
      </div>
      {
        (allIssues.filter(issue => issue.creator.toLowerCase() == currentAccount)).length == 0 ? (
          <h2>No Issues posted. {<Link to="/issue">Post a new issue</Link>} to view here.</h2>
        ) : (allIssues.filter(issue => issue.creator.toLowerCase() == currentAccount)).map(issue => {
          return (
              <div key={issue.id}>
                <Link to={`/all-issues/${issue.id}`}>
                <div className='company_dashboard_issues'>
                  
                    <h3 className='issue-title'>{issue.title}</h3>
                  <p className='issue_desp'>
                    {issue.description}
                  </p>
                  <div >                    
                  <p className="company">{issue.company}</p>
                  </div>
                  <p className={`${status[issue.status]} status-common`}>Status: {status[issue.status]}</p>
                  <div className="reward">
                  <p className="reward">
                    <strong>Reward: </strong>{(issue.reward.toString() / 1000000000000000000)} eth
                  </p>
                </div>
                
                </div>
                </Link>
              </div>
          )
        })
      }
    </>
  )
}

export default CompanyDashboard
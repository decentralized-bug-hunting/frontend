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
          <h3>{} &nbsp; Lamachaur-16, Pokhara</h3>
        </div>
        <div className='right-bottom'>
          <h2>About</h2>
          <hr style={{marginBottom:'10px'}}/>
          <h4><span>Phone:</span>&nbsp; 9845956700</h4>
          <h4><span>E-mail:</span>&nbsp; companymail@gmail.com</h4>
          <h4><span>Issues-Posted:</span>&nbsp; {allIssues.length}</h4>

        </div>
      </div>
      </div>
      {
        (allIssues.filter(issue => issue.creator.toLowerCase() == currentAccount)).length == 0 ? (
          <h2>No Issues posted. Post a new issue to view here.</h2>
        ) : (allIssues.filter(issue => issue.creator.toLowerCase() == currentAccount)).map(issue => {
          return (
              <div key={issue.id}>
                <Link to={`/all-issues/${issue.id}`}>
                <div className='company_dashboard_issues'>
                  
                    <h3>{issue.title}</h3>
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
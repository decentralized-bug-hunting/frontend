import { useEffect, useContext, useState } from 'react'
import { DebountyContext } from '../../context/DeBountyContext'
import { Link } from 'react-router-dom'
import companyIcon from '../../assets/brands/company-icon.png'
import rewardIcon from '../../assets/brands/reward.svg'

const CompanyDashboard = () => {
  const status = ['Posted','Solved','Cancelled'];
  const { allIssues, currentAccount, company, issueCount } = useContext(DebountyContext)
  return (
    <>
      <div>CompanyDashboard</div>
      <h2>Company Name: {company[0]}</h2>
      {
        (allIssues.filter(issue => issue.creator.toLowerCase() == currentAccount)).length == 0 ? (
          <h2>No Issues posted. Post a new issue to view here.</h2>
        ) : (allIssues.filter(issue => issue.creator.toLowerCase() == currentAccount)).map(issue => {
          return (
              <div key={issue.id}>
                <div >
                  <Link to={`/all-issues/${issue.id}`}>
                    <h3>{issue.title}</h3>
                  </Link>
                  <p>
                    {issue.description}
                  </p>
                  <div >                    
                  <p className="company">{issue.company}</p>
                  </div>
                  <p className={`${status[issue.status]} status-common`}>Status: {status[issue.status]}</p>
                </div>
                <div className="reward">
                  <p className="reward">
                    <strong>Reward: </strong>{(issue.reward.toString() / 1000000000000000000)} eth
                  </p>
                </div>
              </div>
          )
        })
      }
    </>
  )
}

export default CompanyDashboard
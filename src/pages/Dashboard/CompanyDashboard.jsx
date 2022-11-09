import { useEffect, useContext, useState } from 'react'
import { DebountyContext } from '../../context/DeBountyContext'
import {Link} from 'react-router-dom'
import companyIcon from '../../assets/brands/company-icon.png'
import rewardIcon from '../../assets/brands/reward.svg'

const CompanyDashboard = () => {
  const { allIssues, currentAccount, company, issueCount } = useContext(DebountyContext)
  return (
    <>
      <div>CompanyDashboard</div>
      <h2>Company Name: {company[0]}</h2>
      {
        allIssues.filter(issue => issue.creator.toLowerCase() == currentAccount).map(issue => {
          if (!issue) {
            return <h2 style={{ margin: '5rem 0' }}>No Issues at the moment</h2>
          }
          return (
            <>
              <div className="issue-card" key={issue.id}>
                <div className="issue-intro">
                  <Link to={`/all-issues/${issue.id}`}>
                    <h3>{issue.title}</h3>
                  </Link>
                  <p>
                    {issue.description}
                  </p>
                  <div className="additional-info">
                    <div className='company-img'>
                      <img src={companyIcon} alt="Company icon" />
                      <p className="company">{issue.company}</p>
                    </div>
                  </div>
                </div>
                <div className="reward">
                  <img src={rewardIcon} alt="reward icon" className="reward-icon" />
                  <p className="reward">
                    <strong>Reward: </strong>{(issue.reward.toString()/1000000000000000000)} eth
                  </p>
                </div>
              </div>
              <hr />
            </>
          )
        })
      }
    </>
  )
}

export default CompanyDashboard
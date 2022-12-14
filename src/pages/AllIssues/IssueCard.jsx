import React from "react";
import './IssueCard.css'
import {Link} from 'react-router-dom'
import companyIcon from '../../assets/brands/company-icon.png'
import rewardIcon from '../../assets/brands/reward.svg'

function IssueCard({id, title, description, reward, company, status}) {
  return (
    <>
    <Link to={`${id}`}>
      <div className="issue-card">
        <div className="issue-intro">
          
            <h3 className="issue-title">{title}</h3>
          
          <p>
            {description}
          </p>
          <p style={{margin:'0.7rem 0'}}><span>status: &nbsp;</span><span className={`${status} status-common`}>{status}</span></p>
          <div className="additional-info">
            <div className='company-img'>
              <img src={companyIcon} alt="Company icon" />
              <p className="company">{company}</p>
            </div>
          </div>
        </div>
        <div className="reward">
          <img src={rewardIcon} alt="reward icon" className="reward-icon" />
          <p className="reward_text">
            <span>Reward:&nbsp;</span>{reward}eth
          </p>
        </div>
      </div>
      </Link>
      <hr />
    </>
  );
}

export default IssueCard;

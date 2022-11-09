import React from "react";
import './IssueCard.css'
import {Link} from 'react-router-dom'
import companyIcon from '../../assets/brands/company-icon.png'
import rewardIcon from '../../assets/brands/reward.svg'

function IssueCard({id, title, description, reward, company}) {
  return (
    <>
      <div className="issue-card">
        <div className="issue-intro">
          <Link to={`${id}`}>
            <h3>{title}</h3>
          </Link>
          <p>
            {description}
          </p>
          <div className="additional-info">
            <div className='company-img'>
              <img src={companyIcon} alt="Company icon" />
              <p className="company">{company}</p>
            </div>
          </div>
        </div>
        <div className="reward">
          <img src={rewardIcon} alt="reward icon" className="reward-icon" />
          <p className="reward">
            <strong>Reward: </strong>{reward} eth
          </p>
        </div>
      </div>
      <hr />
    </>
  );
}

export default IssueCard;

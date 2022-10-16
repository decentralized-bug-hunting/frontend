import React from "react";
import './IssueCard.css'
import companyIcon from '../../assets/brands/company-icon.png'
import dateIcon from '../../assets/brands/date.svg'
import rewardIcon from '../../assets/brands/reward.svg'

function IssueCard() {
  return (
    <>
      <div className="issue-card">
        <div className="issue-intro">
          <h3>Security issue that exposes user details</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque,
            reprehenderit.
          </p>
          <div className="additional-info">
          <div className='company-img'>
          <img src={companyIcon} alt="Company icon" />
          <p className="company">Meta Inc.</p>
          </div>

          <div className='company-img'>
          <img src={dateIcon} alt="" />
          <p className="company">Nov 21, 2022</p>
          </div>
          </div>
        </div>
        <div className="reward">
          <img src={rewardIcon} alt="reward icon" className="reward-icon"/>
          <p className="reward">
            <strong>Reward: </strong> 0.01 eth
          </p>
        </div>
      </div>
      <hr />
    </>
  );
}

export default IssueCard;

import React from 'react'
import TransparentImg from '../assets/transparent.svg'
import decentralisedImg from '../assets/blockchain.svg'
import rewardImg from '../assets/reward.svg'
import './Features.css'

function Features() {
  return (
    <div className="features-sec">
        <h2 className='sub-heading'>Why De-Bounty?</h2>
        <p>De-Bounty provides an ultimate solution for bug reporting and rewarding system on the blockchain.</p>
        <div className="features-cards">
        <div className='feature-card'>
            <img src={decentralisedImg} alt="" />
            <h3>Decentralised</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo labore veniam adipisci ducimus ex?</p>
        </div>

        <div className='feature-card'>
            <img src={TransparentImg} alt="" />
            <h3>Transparency</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo labore veniam adipisci ducimus ex?</p>
        </div>

        <div className='feature-card'>
            <img src={rewardImg} alt="" />
            <h3>Reward</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo labore veniam adipisci ducimus ex?</p>
        </div>
        </div>
    </div>
  )
}

export default Features
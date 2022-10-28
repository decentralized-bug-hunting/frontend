import React from 'react'
import {Link} from 'react-router-dom'
import './CTA.css'

function CTA({isLoggedIn, currentAccount}) {
  return (
    <div className='cta-sec'>
        <h2 className='sub-heading'>Get Started Now!</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, iste!</p>
        {isLoggedIn ?<button className="cta-btn"><Link to='/getstarted'>Get started</Link></button> :(<button className="cta-btn">Connect Wallet</button>)}
    </div>
  )
}

export default CTA
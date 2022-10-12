import React from 'react'
import heroBanner from '../assets/hero-banner.svg'
import './Hero.css'

function Hero() {
  return (
    <section className="hero-sec">
        <div className="left">
            <h2>De-Bounty</h2>
            <p>A decentralized solution to bug bounty</p>
            <button className="btn">Connect Wallet</button>
        </div>
        <div className="right">
            <img src={heroBanner} alt="" />
        </div>
    </section>
  )
}

export default Hero
import React, { useContext } from "react";
import heroBanner from "../assets/hero-banner.svg";
import "./Hero.css";
import { DebountyContext } from "../context/DeBountyContext";

function Hero() {
  const { connectWallet, currentAccount } = useContext(DebountyContext);

  return (
    <section className="hero-sec">
      <div className="left">
        <h2>De-Bounty</h2>
        <p>A decentralized solution to bug bounty</p>

        {currentAccount ? (
          "Get Started"
        ) : (
          <button onClick={connectWallet} className="btn btn-wallet-connect">
            Connect Wallet
          </button>
        )}
      </div>
      <div className="right">
        <img src={heroBanner} alt="" />
      </div>
    </section>
  );
}

export default Hero;

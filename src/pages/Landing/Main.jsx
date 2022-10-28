import React, {useContext} from 'react'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import Features from '../../components/Features'
import CTA from '../../components/CTA'
import Footer from '../../components/Footer'
import {DebountyContext} from '../../context/DeBountyContext'

function Main() {

  const {loggedIn, currentAccount, logout} = useContext(DebountyContext)

  return (
    <div className="Main">
      <Navbar isLoggedIn = {loggedIn} logout={logout}/>
      <div className="container">
        <Hero isLoggedIn = {loggedIn} currentAccoun={currentAccount}></Hero>
        <Features/>
      </div>
        <CTA isLoggedIn = {loggedIn} currentAccount={currentAccount}/>
        <Footer/>
    </div>
  )
}

export default Main

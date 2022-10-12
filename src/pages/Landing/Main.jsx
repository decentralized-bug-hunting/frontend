import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import Features from '../../components/Features'
import CTA from '../../components/CTA'
import Footer from '../../components/Footer'

function Main() {

  return (
    <div className="Main">
      <Navbar/>
      <div className="container">
        <Hero></Hero>
        <Features/>
      </div>
        <CTA/>
        <Footer/>
    </div>
  )
}

export default Main

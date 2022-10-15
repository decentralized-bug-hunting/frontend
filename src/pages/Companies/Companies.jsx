import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CompanyCard from './CompanyCard'
import './Companies.css'

function Companies() {
  return (
    <>
    <Navbar/>
    <div className="container">
        <div className="company-cards">
            <CompanyCard/>
            <CompanyCard/>
            <CompanyCard/>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Companies
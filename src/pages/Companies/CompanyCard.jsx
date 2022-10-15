import React from 'react'
import './CompanyCard.css'
import logo from '../../assets/brands/meta.svg'

function CompanyCard() {
  return (
    <div className="company-card">
      <img src={logo} alt="" />
        <h2>Meta Inc.</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio aliquam in deleniti? Iure nihil itaque </p>
        <p class='issues'>No of Issues:<strong> 10</strong></p>
    </div>
  )
}

export default CompanyCard
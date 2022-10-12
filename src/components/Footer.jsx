import React from 'react'
import logo from '../assets/debounty.png'
import "./Footer.css"

function Footer() {
    return (
        <>
            <div className='footer'>
                <div className='footer-card'>
                    <img src={logo} alt="" />
                </div>
                <div className="footer-card">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className="contact">
                    <h3>Contact</h3>
                    <ul>
                        <li>+9779812345678</li>
                        <li>mail@debounty.com</li>
                        <li>123 XYZ Building</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <div className="copyright-text">
            <p>Copyright © 2022 De-Bounty</p>
            </div>
        </>
    )
}

export default Footer
import React from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import errorImg from '../../assets/error404.png'
import './Error.css'

function ErrorPage() {
    return (
        <>
            <Navbar />
            <div className="errorpage_container">
                <img className="error_banner" src={errorImg} alt="404 error image" />
                <h2>404 Error<br /> Page Not Found!</h2>
                <p>Go back to <Link to="/">Home</Link></p>
            </div>
            <Footer />
        </>
    )
}

export default ErrorPage
import React from 'react';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import "./getstarted.css";
import {BsFillBugFill} from 'react-icons/bs';
import {ImOffice} from 'react-icons/im';

import {RiAdminFill} from 'react-icons/ri';


function Getstarted(){
    return(
        <>
        <Navbar/>
        <div className='getstarted'>
            <div className='title'>
                <h1>Get Started</h1>
                <h2>Choose Appropriate Services</h2>
            </div>
            <div className='gcontainer'>
                <div className='gcontent'>
                    <div className='gcard'>
                        <div className='icon'>
                            <BsFillBugFill/>
                        </div>
                        <h2>I am a Bug Hunter</h2>
                        <a href="#"><button>Signin</button></a>
                    </div>

                    <div className='gcard'>
                        <div className='icon'>
                            <ImOffice/>
                        </div>
                        <h2>We are a Company</h2>
                        <a href="#"><button>Signin</button></a>
                    </div>

                    <div className='gcard'>
                        <div className='icon'>
                            <RiAdminFill/>
                        </div>
                        <h2>I am a Admin </h2>
                        <a href="#"><button>Signin</button></a>
                    </div>
                </div>
            </div>
            
            

        </div>
        <Footer/>
        </>
    )
}

export default Getstarted;
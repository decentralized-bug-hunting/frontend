import {useContext} from 'react'
import {DebountyContext} from '../../context/DeBountyContext';
import './hunterdashboard.css'
import logo from '../../assets/debounty.png'

const HunterDashboard = () => {
  const {hunter} = useContext(DebountyContext)
  return (
    <div className='hunterdashboard'>
      <div class="title">
        <h4>Hello Samir, Welcome back</h4>
        <h2>Your Dashboard is updated</h2>
      </div>
      <div className='data'>
      <div className='left'>
        <img src={logo}></img>
      </div>
      <div className='right'>
        <div className='right-top'>
          <h2>Samir Lamsal</h2>
          <h3>{} &nbsp; Lamachaur-16, Pokhara</h3>
        </div>
        <div className='right-bottom'>
          <h2>About</h2>
          <hr style={{marginBottom:'10px'}}/>
          <h4><span>Phone:</span>&nbsp; 9845956700</h4>
          <h4><span>E-mail:</span>&nbsp; hunter@gmail.com</h4>
          <h4><span>Solutions Posted:</span>&nbsp; 2</h4>

        </div>
      </div>
      </div>
    </div>
  )
}

export default HunterDashboard
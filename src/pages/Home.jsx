import React from 'react'
import LoanCategories from '../components/loancat/loancat.jsx'
import DrawerAppBar from '../components/Menu-mui/MuiMenu.jsx'
import { loanLogoPic } from '../utils/constant/pic.js'


const Home = () => {

     
  return (
    <div className='home-div'>
    <img className='logo-pic-menu' src={loanLogoPic} alt="" />   
        < DrawerAppBar/>
        < LoanCategories/>
      
    </div>
  )
}

export default Home

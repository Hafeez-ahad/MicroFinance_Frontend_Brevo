import React from 'react'
import LoanCategories from '../components/loancat/loancat'
import DrawerAppBar from '../components/Menu-mui/MuiMenu'
import { loanLogoPic } from '../utils/constant/pic'


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

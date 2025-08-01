import React from 'react'
import Navbar from '../components/Navbar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollections from '../components/FirmCollections'

const LandingPage = () => {
  return (
    <div>
     <Navbar/>
     <ItemsDisplay/>
     <Chains/>
     <FirmCollections/> 
    </div>
  )
}

export default LandingPage

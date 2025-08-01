import React from 'react'
import LandingPage from './QuickBite/Pages/LandingPage'
import "./App.css"
import {Routes, Route} from "react-router-dom"
import ProductMenu from './QuickBite/components/ProductMenu'
import Cart from './QuickBite/components/Cart'
import {Provider} from "react-redux"
import reduxStore from './QuickBite/Redux/reduxStore'

const App = () => {
  return (
    <div>
      <Provider store={reduxStore}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/products/:firmId' element={<ProductMenu/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </Provider>
    </div>
  )
}

export default App

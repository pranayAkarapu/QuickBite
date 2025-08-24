import React from 'react'
import LandingPage from './QuickBite/Pages/LandingPage'
import "./App.css"
import {Routes, Route} from "react-router-dom"
import ProductMenu from './QuickBite/components/ProductMenu'
import Cart from './QuickBite/components/Cart'
import {Provider} from "react-redux"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import reduxStore from './QuickBite/Redux/reduxStore'

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Provider store={reduxStore}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/products/:firmId' element={<ProductMenu/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </Provider>
      </QueryClientProvider>
    </div>
  )
}

export default App

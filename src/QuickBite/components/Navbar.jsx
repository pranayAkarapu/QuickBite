import React from 'react'
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const cartItems = useSelector((store)=> store.cart.items);
  return (
    <section className='navbarsection'>
        <div className='companytitle'>
          <Link to="/" className='link'>
          <h1>QuickBite</h1>
          </Link>
            
        </div>
        {/*<div className="searchbar">
            <input type="text" placeholder='Search...'/>
        </div>*/}
        <Link to="/cart" className='cart'>
          <FontAwesomeIcon icon={faShoppingCart}/>
          <span>({cartItems.length})</span>
        </Link>
    </section>
  )
}

export default Navbar

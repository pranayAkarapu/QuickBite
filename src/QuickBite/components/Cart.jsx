import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem';
import Navbar from './Navbar';

const Cart = () => {
    const cartItems = useSelector((state)=>state.cart.items);
  return (
    <div>
        <Navbar/>
        <div className='cart-container'>
            <h1>Cart</h1>
            {cartItems.length === 0? 
                <p className='empty'>No Items in the Cart</p>:
                cartItems.map((item)=>(
                <CartItem key={item.id} itemData={item}/>
            ))}
        </div>
    </div>
    
  )
}

export default Cart

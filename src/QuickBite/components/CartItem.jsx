import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../Redux/cartSlice'

const CartItem = ({itemData}) => {

    const dispatch = useDispatch()

    function handleIncrease(){
        dispatch(updateQuantity({id: itemData.id, quantity: itemData.quantity + 1}));
    }

    function handleDecrease(){
        if(itemData.quantity > 1) {
            dispatch(updateQuantity({id: itemData.id, quantity: itemData.quantity - 1}));
        }
    }

    function handleRemove(){
        dispatch(removeFromCart(itemData.id))
    }

  return (
    <div className='cart-item'>
      <img src={itemData.image} alt={itemData.productName} className='cart-item-image' />
      <div className='cart-item-info'>
        <h2 className='cart-item-name'>{itemData.productName}</h2>
        <p className='cart-item-price'>${itemData.price}</p>
        <div className='cart-item-quantity'>
            <button onClick={handleIncrease} className='quantity-button'>+</button>
            <span>{itemData.quantity}</span>
            <button onClick={handleDecrease} className='quantity-button'>-</button>
        </div>
        <button onClick={handleRemove} className='remove-button'>Remove</button>
      </div>
    </div>
  )
}

export default CartItem

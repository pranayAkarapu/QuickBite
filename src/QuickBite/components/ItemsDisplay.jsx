import React, {useRef, useState } from 'react'
import { itemData } from '../data'

const ItemsDisplay = () => {
    const scrollRef = useRef(null);
    
    const scroll = (direction)=>{
        if(direction === "left"){
            scrollRef.current.scrollBy({left: -200, behavior:"smooth"});
        }else{
            scrollRef.current.scrollBy({left: 200, behavior:"smooth"});
        }
    }
    return (
    <div className='item-wrapper'>
        <h2 className='head'>What's on your mind?</h2>
        {/*<div className='arrow left' onClick={()=>scroll('left')}>&lt;</div>
        <div className='arrow right' onClick={()=> scroll('right')}>&gt;</div>*/}
        <div className='itemsection' ref={scrollRef}>
            {itemData.map((item, index)=>(
                <div key={index} className='gallery'>
                    <img src={item.item_img} alt={`item-${index}`} className='gallery-image'/>
                </div>
            ))}
        </div>
    </div>
    )
}

export default ItemsDisplay

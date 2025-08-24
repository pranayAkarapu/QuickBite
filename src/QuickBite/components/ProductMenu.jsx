import React, {useState, useEffect} from 'react'
import { API_URL, API } from '../api'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import {useQuery} from "@tanstack/react-query"

const ProductMenu = () => {
    
    const [activeFilter, setActiveFilter] = useState("All");
    const {firmId} = useParams();

    const fetchProducts = async()=>{
        try {
            const response = await API_URL.get(`/product/${firmId}/products`);
            return response.data;
        } catch (error) {
            alert("Product failed to fetch");
            console.error("Product failed to fetch", error);
        }
    }

    const {data: restaurantData={restaurantName:"", products:[]}, isPending, isError, error} = useQuery({
        queryKey:["products", firmId],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
    })


    const handleFilterChange = (filter)=>{
        setActiveFilter(filter);
    };

    const filteredProducts = restaurantData.products.filter((product)=>{
        if(activeFilter === "All") return true;
        if(activeFilter === "Veg") return product.category.includes("Veg");
        if(activeFilter === "Non-Veg") return product.category.includes("Non-Veg");
        if(activeFilter === "BestSeller") return product.bestseller;
        return true;
    });

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        const cartItem = {
            id: product._id,
            productName: product.productName,
            price: product.price,
            image: `${API}/uploads/${product.image}`,
        };
        dispatch(addToCart(cartItem));
    };

  return (
    <div>
        <Navbar/>
        {isPending && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        <h1 className='pHeader'>{restaurantData.restaurantName}</h1>
        <section className='productsection'>
            <div className='categories'>
                {["All", "Veg", "Non-Veg", "BestSeller"].map((filter)=>(
                    <span
                    key={filter}
                    onClick={()=>handleFilterChange(filter)}
                    className={activeFilter === filter ? 'active' : ''}
                    style={{ marginRight: '10px', cursor: 'pointer', fontWeight: activeFilter === filter ? 'bold' : 'normal' }}
                    >{filter}</span>
                ))}
            </div>
            {filteredProducts.map((item, index)=>(
                <div key={index} className='product-card'>
                    <div className='product-details'>
                        <h2 className='product-name'>{item.productName}</h2>
                        <p className='price'>₹ {item.price}</p>
                        <p className='description'>{item.description}</p>
                    </div>
                    
                    <div className='product-image-container'>
                        <img src={`${API}/uploads/${item.image}`} alt={item.productName} className='product-image' />
                        <div className='add-button'>
                            <button onClick={()=>handleAddToCart(item)}>ADD</button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    </div>
  )
}

export default ProductMenu

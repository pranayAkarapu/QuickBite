import React, {useState, useEffect, useRef} from 'react'
import { API_URL } from '../api'
import { Link } from 'react-router-dom'

const Chains = () => {
    const [vendorData, setvendorData] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleVendors = async()=>{
        try {
            const response = await fetch(`${API_URL}/vendor/get-vendors`);
            const data = await response.json();
            setvendorData(data);
            setLoading(false)
        } catch (error) {
            alert("Failed to fetch data");
            console.error("failed to fetch data", error);
            setLoading(true)
        }
    }
    useEffect(() => {
        handleVendors();
    },[]);

  return (
    <div className='container'>
        <div className='loaderSection'>
            {loading && <div className='loader'>
                <p>Your 🍨 is loading...</p>
            </div>}
        </div>
        <h2 className='header'>Top restaurant chains in Hyderabad</h2>
        <section className='chainsection'>
            {vendorData.vendors && vendorData.vendors.slice(0,12).map((vendor)=>{
                return(
                    <div className='vendor-card' key={vendor._id}>
                        {vendor.firm.map((item)=>{
                            return(
                                <Link to={`/products/${item._id}`} key={item._id} className='link'>
                                    <React.Fragment>
                                        <div className='firmImage'>
                                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} className='image' />
                                            <p className='firm-offer'>{item.offer}on all items</p>
                                        </div>                            
                                        <h2 className='firmName'>{item.firmName}</h2>
                                    </React.Fragment>
                                </Link>
                            )
                        })}
                    </div>
                )
            })}
        </section>
    </div>
  )
}

export default Chains

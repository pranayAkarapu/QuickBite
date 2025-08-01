import React, {useState, useEffect} from 'react'
import { API_URL } from '../api'
import { Link } from 'react-router-dom';

const FirmCollections = () => {
    const [firmData, setfirmData] = useState([]);
    const [selectRegion, setSelectRegion] = useState("All");
    const [searchTerm, setSearchTerm] = useState("")

    const firmDataHandler = async()=>{
        try {
            const response = await fetch(`${API_URL}/vendor/get-vendors`);
            const data = await response.json();
            setfirmData(data.vendors);
        } catch (error) {
            console.error("failed to fetch", error);
        }
    }


    useEffect(()=>{
        firmDataHandler();
    },[]);

    const filterHandler = (region)=>{
        setSelectRegion(region);
    }

  return (
    <div className="firm-wrapper">
        <h2 className='firm-title'>Restaurants with online food delivery in Hyderabad</h2>
        <div className='se-filt-cont'>
            <div className="searchbar">
                <input type="text" placeholder='Search...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>
            <div className='filterButtons'>
                {/*<button onClick={()=> filterHandler("All")} className='all'>All</button>
                <button onClick={()=> filterHandler("South-Indian")}>South-Indian</button>
                <button onClick={()=> filterHandler("North-Indian")}>North-Indian</button>
                <button onClick={()=> filterHandler("Chinese")}>Chinese</button>
                <button onClick={()=> filterHandler("Bakery")}>Bakery</button>*/}
                {["All", "South-Indian", "North-Indian", "Chinese", "Bakery"].map((region) => (
                    <button
                    key={region}
                    onClick={() => filterHandler(region)}
                    className={selectRegion === region ? "active" : ""}
                    >
                        {region}
                    </button>
                ))}
            </div>
        </div>
        <section className="firm-grid">
            {firmData.map((data)=>{
                const filtedFirms = data.firm.filter((item)=>{
                    const matchesRegion = selectRegion === "All" || item.region.includes(selectRegion);

                    const matchesSearch = item.firmName.toLowerCase().includes(searchTerm.toLowerCase());
                    return matchesRegion && matchesSearch;
                });
                if(filtedFirms.length === 0) return null;
                return(
                    <div className="firm-card" key={data._id}>
                        {filtedFirms.map((item, index)=>{
                                return(
                                    <Link to={`/products/${item._id}`} key={index} className='link'>
                                        <React.Fragment>
                                            <div className='firm-image-container'>
                                                <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} className='firm-image' />
                                                <p className='offer'>{item.offer} on all items</p>
                                            </div>
                                            <h2 className='firm-name'>{item.firmName}</h2>
                                            <p className='firm-region'>{item.region.join(", ")}</p>
                                            <p className='firm-area'>{item.area}</p>
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

export default FirmCollections

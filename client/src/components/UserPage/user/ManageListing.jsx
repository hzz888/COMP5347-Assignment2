import React, {useState,useEffect, useRef} from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import BrandPicSelector from "../../../utils/BrandPicSelector";
import axios from "axios"
import './user.css';


export const ManageListing = (props) =>{
    const [email,setEmail] = useState('')
    const [expanded, setExpanded] = useState(false)
    const [id,setID] = useState('')
    const [listings,setListing] = useState(null)
    const [titleNew,setTitleNew] = useState(null)
    const [stockNew,setStockNew]= useState(null)
    const [priceNew,setPriceNew] = useState(null)
    const [brandNew,setBrandNew] = useState(null)
    const [isValid,setIsValid] =useState(true)
    const formRef = useRef(null)
    const location = useLocation();

    useEffect(()=>{
        const searchParams=new URLSearchParams(location.search)
        setEmail(searchParams.get('email'))
      
        async function fetchIDAndListing(){
          try{
            const idResponse = await axios.get("http://localhost:3001/UserPage/fetch-user-data2", {params: {Email: email}});
            // console.log(idResponse.data[0])
            const id = idResponse.data[0]._id;
      
            const listingResponse = await axios.get("http://localhost:3001/UserPage/fetchUserListings",{params:{seller_id:id}})
            const listings = listingResponse.data;
      
            setID(id);
            setListing(listings)
          }catch(error){
            console.error(error)
          }
        }
      
        fetchIDAndListing().then();
      },[location,email])

      const handleDisable = async (id) => {
        const updatedListings = await Promise.all(
          listings.map(async (listing) => {
            if (listing._id === id) {
              const response = await axios.post('http://localhost:3001/UserPage/editlisting',{
                Listing_id: id,
                Method: 'disable'
              });
              if(response.data){
                console.log("Disabled successfully!");
                return {...listing, disable: true};
              } else {
                console.log(response.data);
                alert("Something went wrong");
                return listing;
              }
            } else {
              return listing;
            }
          })
        );
        setListing(updatedListings);
      };
      
      const handleEnable = async (id) => {
        const updatedListings = await Promise.all(
          listings.map(async (listing) => {
            if (listing._id === id) {
              const response = await axios.post('http://localhost:3001/UserPage/editlisting',{
                Listing_id: id,
                Method: 'enable'
              });
              if(response.data){
                console.log("Enabled successfully!");
                return {...listing, disable: false};
              } else {
                console.log(response.data);
                alert("Something went wrong");
                return listing;
              }
            } else {
              return listing;
            }
          })
        );
        setListing(updatedListings);
      };

      const handleRemove = async (id) =>{
        const updatedListings = await Promise.all(
            listings.map(async (listing) => {
              if (listing._id === id) {
                const response = await axios.post('http://localhost:3001/UserPage/editlisting',{
                  Listing_id: id,
                  Method: 'delete'
                }
                );
                if(response.data){
                  console.log("Listing delete successfully successfully!");
                  window.location.reload()
                  return {...listing, disable: false};
                } else {
                  console.log(response.data);
                  alert("Something went wrong");
                  return listing;
                }

              } else {
                return listing;
              }
            })
          );
          setListing(updatedListings);
        };

     const handleFormExpand = () =>{
        setExpanded(true)
     }

     const validateField =()=>{
        const regEx = /^[+]?\d*\.?\d+$/;
        //check if field is empty
        if(id == null || brandNew==null || titleNew==null || priceNew==null|| stockNew == null){
            setIsValid(false)
        }
        //check if it's a valid interger 
        else if(!(/^\d+$/.test(stockNew) && Number.isInteger(Number(stockNew)) && Number(stockNew) > 0)){
            setIsValid(false)
            console.log("hi"+stockNew)
        }
        //check if it's a valid float number
        else if(!(regEx.test(priceNew) && parseFloat(priceNew) > 0)){
            console.log("hi"+priceNew)
            setIsValid(false)
        }else{
            setIsValid(true)
        }
        
     }     
     const handleSubmit = async(e) =>{
        console.log(brandNew)
        console.log(titleNew)
        console.log(priceNew)
        console.log(isValid)
        validateField()
        if(isValid){
            setExpanded(false)
            alert("New listing created successfully!")
            e.preventDefault()
            //call api to add new listing
            const response = await axios.post("http://localhost:3001/UserPage/addlisting", {
                Title:titleNew,
                Brand: brandNew,
                Image:"",
                Seller:id,
                Stock:stockNew,
                Price:priceNew,
                Disabled:false
            });
            if(response.data){
                console.log("aLL G")
                alert("New listing added successfully!")
                window.location.reload()
            }else{
                alert("Something went wrong")
            }
            formRef.current.reset()
        }else{
            alert("Invalid input")
            e.preventDefault()
            formRef.current.reset()
        }


     }
     const handleCancel = ()=>{
        setExpanded(false)
     }


    return(
        <div>
            {!expanded && <button onClick={handleFormExpand}>Add a new listing</button>}
            {expanded && (
            <div>
                <form onSubmit={handleSubmit} className="login-form" ref={formRef}>
                <h2>New Listing</h2>
                <label>Title</label>
                <input value={titleNew} onChange={(e)=>setTitleNew(e.target.value)} type="text" id="title" name="title"/>
                <label>Brand</label>
                <select value ={brandNew} name="Brand" id='brand'onChange={(e) => setBrandNew(e.target.value)}>
                    <option value="Apple">Apple</option>
                    <option value="BlackBerry">BlackBerry</option>
                    <option value="HTC">HTC</option>
                    <option value="Huawei">Huawei</option>
                    <option value="LG">LG</option>
                    <option value="Motorola">Motorola</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Sony">Sony</option>
                </select>
                <label>Stock Quantity</label>
                <input value={stockNew} onChange={(e)=>setStockNew(e.target.value)} type="text" id="stock" name="stock"/>
                <label>Price</label>
                <input value={priceNew} onChange={(e)=>setPriceNew(e.target.value)} type="text" id="price" name="price"/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
                <button type="submit" onClick={handleCancel}>Cancel</button>
                </form>
                
                
            </div>
      )}

            {listings && listings.map((listing) => (
                <div key={listing._id}>
                    {listItem(listing)}
                    {/* {console.log(listing.title)} */}
                    {listing.disable && <button onClick={() => handleEnable(listing._id)}>Enable</button>}
                    {!listing.disable && <button onClick={() => handleDisable(listing._id)}>Disable</button>}
                    <button onClick={() => handleRemove(listing._id)}>Remove</button>
                </div>
            ))}
        </div>
    )
}

function listItem({brand, price, rating, title, stock}) {
    let picUri = BrandPicSelector(brand);
    return (
        <>
            <div className="listing">
                <div>
                    <figure><img src={picUri} alt={title}/></figure>
                    <div className="card-body max-h-fit max-w-xs">
                        <h2 className="card-title max-h-full max-w-xs break-all">
                            {title}
                        </h2>
                        <p>Price: {price}</p>
                        <p>Rating: {rating}★</p>
                        <p>{stock} in stock</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">{brand}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


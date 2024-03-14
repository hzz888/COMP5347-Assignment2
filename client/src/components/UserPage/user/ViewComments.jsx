import React, {useState,useEffect, useDebugValue} from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import BrandPicSelector from "../../../utils/BrandPicSelector";
import axios from "axios"
import './user.css';


export const ViewComments = (props) =>{
    const [email,setEmail] = useState('')
    const [id,setID] = useState('')
    const [listings,setListing] = useState(null)
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
    
      fetchIDAndListing();
    },[location,email])

    function hideReview(reviewer,listing_id){
      console.log(reviewer)
      axios.post("http://localhost:3001/UserPage/toggleComment",{
        Reviewer : reviewer,
        Listing_id: listing_id,
        Is_shown:false
      })
      window.location.reload()
    }

    function showReview(reviewer,listing_id){
      axios.post("http://localhost:3001/UserPage/toggleComment",{
        Reviewer : reviewer,
        Listing_id: listing_id,
        Is_shown:true
      })
      window.location.reload()
    }


    
    function renderReviews(reviews,listing_id) {
      console.log(reviews)
      if (reviews.length !== 0 ){
        return reviews.map((review) => (
          <div key={review.reviewer} className="review-container">
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            {review.is_shown ? (
            <button className="blue-button" onClick={() => hideReview(review.reviewer,listing_id)}>Hide</button>
          ) : (
            <button className="blue-button" onClick={() => showReview(review.reviewer,listing_id)}>Show</button>
          )}
          </div>
        ));
      }else{
        return <>
          <p className="no-review"> There is no comment for this Listing</p>
        </>
      }
    }


      return(
        <div>
        <h2></h2>
            <table>
                {listings && listings.map((listing) => (
                <tr>
                  <td key={listing._id}>
                      {listItem(listing)}
                  </td>
                  {renderReviews(listing.reviews,listing._id)}
                </tr>
            ))}
            </table>
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




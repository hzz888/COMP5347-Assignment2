import {useEffect, useState} from "react";
import "./MainPage.css"
import {RatingMaker} from "../../utils/RatingMaker";
import BrandPicSelector from "../../utils/BrandPicSelector";
import {ReviewItem} from "./ReviewItem";
import {useNavigate} from "react-router-dom";


export function ItemStateContent({
                                     cart,
                                     id,
                                     user,
                                     setMainPageState,
                                     setSelectedItemId,
                                     setSearchInput,
                                     setFinalSearchInput,
                                     setCart,
                                     totalAmount,
                                     setTotalAmount
                                 }) {
    const [itemDetails, setItemDetails] = useState({});
    const [sellerDetails, setSellerDetails] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [numReviews, setNumReviews] = useState(3);
    const [addedQuantity, setAddedQuantity] = useState(0);


    useEffect(() => {
        async function fetchItemDetails() {
            try {
                const res = await fetch(`http://localhost:3001/MainPage/get-item-by-id/${id}`);
                const data = await res.json();
                setItemDetails(data);
            } catch (error) {
                console.error(error);
            }
        }


        async function getAddedQuantity() {
            // console.log(cart)
            if (cart && Array.isArray(cart)) {
                cart.forEach(item => {
                    if (item['listing_id'] === id) {
                        setAddedQuantity(item['quantity']);
                    }
                })
            }
        }

        fetchItemDetails().then();
        getAddedQuantity().then();
    }, [id, user, cart]);

    useEffect(() => {
        async function fetchSellerDetails() {
            try {
                const res = await fetch(`http://localhost:3001/UserPage/fetch-user-data/${itemDetails.seller}`)
                const data = await res.json();
                setSellerDetails(data);
            } catch (error) {
                console.error(error);
            }
        }

        if (itemDetails.seller) {
            fetchSellerDetails().then();
        }
    }, [itemDetails]);


    function showMoreReviews() {
        setNumReviews(numReviews + 3);
    }

    function showLessReviews() {
        setNumReviews(3);
    }


    function Reviews({user, item, seller}) {
        if (!item.reviews || item.reviews.length === 0) {
            return (<div>No Reviews.</div>)
        } else {
            return (
                <>
                    <div className="text-orange-500">Reviews:</div>
                    <br/>
                    {item.reviews.slice(0, numReviews).map((reviewItem, index) =>
                        <ReviewItem review={reviewItem} user={user} item={item} seller={seller}
                                    key={index}></ReviewItem>
                    )}

                </>
            )
        }
    }

    async function submitComment() {
        console.log(user)
        console.log(user._id)
        if (user._id && user._id !== "0") {
            try {

                const res = await fetch(`http://localhost:3001/MainPage/post-new-comment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        User_id: user._id,
                        Listing_id: id,
                        Comment: comment,
                        Rating: rating
                    })
                });
                if (res) {
                    setComment("");
                } else {
                    console.error("Error posting comment");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please login to post a comment")
        }
    }

    const navigate = useNavigate();

    function addToCart() {
        if (!user._id || user._id === "0") {
            return navigate('/signin');
        } else {
            // if item is already in cart, update quantity
            // else add to cart
            if (cart && quantity > 0) {
                if (cart.length === 0) {
                    let cartObj = {
                        listing_id: id,
                        title: itemDetails.title,
                        quantity: quantity,
                        price: itemDetails.price,
                        stock: itemDetails.stock
                    };
                    cart.push(cartObj);
                    setCart(cart);
                } else {
                    let found = false;
                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i].listing_id === id) {
                            cart[i].quantity += quantity;
                            setCart(cart);
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        let cartObj = {
                            listing_id: id,
                            title: itemDetails.title,
                            quantity: quantity,
                            price: itemDetails.price,
                            stock: itemDetails.stock
                        };
                        cart.push(cartObj);
                        setCart(cart);
                    }
                }
            }


            setAddedQuantity(addedQuantity + quantity);
            setTotalAmount(totalAmount + quantity);
            setQuantity(0)
            document.getElementById("quantity").value = 0;

        }
    }

    return (
        <>
            <div className="ml-3">
                <div>
                    <button className="text-blue-400" onClick={() => {
                        setMainPageState("Home");
                        setSelectedItemId("");
                        setSearchInput("");
                        setFinalSearchInput("");
                    }}>Back To Home
                    </button>
                </div>
                <div className="text-3xl text-white w-fit h-fit m-3">{itemDetails.title}</div>

                <div className="flex">
                    <span className="mt-1 max-w-xl">
                        <img className="max-w-xl w-fit"
                             src={itemDetails.image === "imageurl" ? BrandPicSelector(itemDetails.brand) : itemDetails.image}
                             alt={itemDetails.title}></img>
                        <div>
                            <div className="text-white mt-2">{addedQuantity} has been added to cart.</div>
                        <input id="quantity" type="number" defaultValue="0" min="0"
                               max={itemDetails.stock - addedQuantity > 0 ? itemDetails.stock - addedQuantity : 0}
                               onChange={(i) => setQuantity(Number(i.target.value))}/>
                        <button className="text-orange-500" onClick={addToCart}>Add to cart</button>
                        </div>
                    </span>
                    <span className="ml-10">
                        <div className="text-white">Brand: {itemDetails.brand}</div>
                        <div className="text-white">Price: {itemDetails.price}</div>
                        <div className="text-white">Rating: {RatingMaker(itemDetails)}★</div>
                        <div className="text-white">{itemDetails.stock} in stock.</div>
                        <div className="text-white">Seller: {sellerDetails.firstname} {sellerDetails.lastname}</div>
                        <br/>
                        {itemDetails.reviews && <div>
                            <Reviews user={user} item={itemDetails} seller={sellerDetails}></Reviews>
                            {itemDetails.reviews.length > 3 ? (itemDetails.reviews.length > numReviews ?
                                <button className="text-blue-400" onClick={showMoreReviews}>Show More Reviews</button> :
                                <button className="text-blue-400" onClick={showLessReviews}>Show Less
                                    Reviews</button>) : null}
                        </div>}
                        {!itemDetails.reviews && <div>No Reviews.</div>}
                        <div className="text-blue-400">Add Comment: <br/>Rating: <input type="number" min="1" max="5"
                                                                                        defaultValue="5"
                                                                                        onChange={(i) => setRating(Number(i.target.value))}/> Comment: <input
                            type="text" onChange={(i) => setComment(i.target.value)}/><button
                            onClick={submitComment}>Submit</button></div>
                    </span>
                </div>

            </div>
        </>
    )
}
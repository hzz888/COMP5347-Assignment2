import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import './CheckOutPage.css'


function CheckoutPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(location.state.cart);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(
        () => {
            async function calculateTotalPrice() {
                let total = 0;
                if (cart && cart.length > 0) {
                    for (let i = 0; i < cart.length; i++) {
                        total += cart[i].price * cart[i].quantity;
                    }
                }
                setTotalPrice(parseFloat(total.toFixed(2)));
            }

            calculateTotalPrice().then();

        }, [location, cart, totalPrice]
    )

    const removeItem = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    }

    const changeQuantity = (index, newQuantity) => {
        const newCart = [...cart];
        if (newQuantity === 0) {
            newCart.splice(index, 1);
        } else {
            newCart[index].quantity = newQuantity;
        }
        setCart(newCart);
    }

    const confirm = async () =>{
        console.log(cart)
        let cartArray = [];
        cart.forEach(
            (item) => {
                cartArray.push({
                    "Listing_id": item.listing_id,
                    "Quantity": Number(item.quantity)
                })
            }
        )
        console.log(cartArray)
        const res = await fetch('http://localhost:3001/CheckOut/check-out',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartArray: cartArray
            })
        })



        if (res.ok === true) {
            navigate('/', {state: {cart: [], login: true, email: location.state.email}});
        }
        console.log(res)
    }


    return (
        <div className="base">
            <h1 className="text-orange-500 italic m-2">CheckOut</h1>
            <button onClick={
                () => {
                    navigate("/", {state: {cart: cart, login: true, email: location.state.email}});
                }
            } className="text-blue-400">Back to home
            </button>
            <div className="text-orange-500 m-2 text-xl">Shopping Cart:</div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Change Quantity</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map(
                        (item, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td><input type="number" min="0" max={item.stock} defaultValue={item.quantity}
                                           className="max-w-full"/>
                                    <button className="text-blue-400" onClick={() => {
                                        const newQuantity = parseInt(document.querySelectorAll('input[type=number]')[index].value);
                                        changeQuantity(index, newQuantity);
                                    }}>change
                                    </button>
                                </td>
                                <td>
                                    <button className="text-red-600" onClick={() => removeItem(index)}>remove</button>
                                </td>
                            </tr>
                    )}
                    </tbody>
                </table>
                <div className="absolute right-1 text-blue-500 text-2xl m-1">Total Price: {totalPrice}</div>
                <br/>
                <button className="absolute right-1 text-blue-500 text-2xl m-1 mt-3" onClick={confirm}>Confirm</button>
            </div>
        </div>
    )
}


export default CheckoutPage
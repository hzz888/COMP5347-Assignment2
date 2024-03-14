import React, {useState, useEffect} from 'react';
import './MainPage.css';
import {SoldOutSoonPhoneItem} from "./SoldOutSoonPhoneItem";
import {BestSellerItem} from "./BestSellerItem";
import {RatingMaker} from "../../utils/RatingMaker";

// This component displays when the UserPage has not searched anything or select any item
export function HomeStateContent({setMainPageState, setSelectedItemId}) {
    const [soldLoaded, setSoldLoaded] = useState(false);
    const [bestLoaded, setBestLoaded] = useState(false);
    const [soldOutSoonList, setSoldOutSoonList] = useState([]);
    const [bestSellerList, setBestSellerList] = useState([]);

    async function fetchSoldOutList() {
        try {
            const res = await fetch('http://localhost:3001/MainPage/low-stock');
            // console.log(res)
            const data = await res.json();
            // console.log(data)
            // convert data to array
            const soldOutSoonList = [...data];
            // console.log(phoneList)

            setSoldOutSoonList(soldOutSoonList);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchBestSellerList() {

        try {
            const res = await fetch('http://localhost:3001/MainPage/best-seller');

            const data = await res.json();

            const bestSellerList = [...data];
            setBestSellerList(bestSellerList);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSoldOutList().then(() => setSoldLoaded(true));
        fetchBestSellerList().then(() => setBestLoaded(true));
    }, []);

    return (
        <>
            <section className="SoldOutSoon">
                <h2 className="text-2xl font-bold ml-3 mb-5 text-orange-500 italic bg-pink-200 w-fit rounded p-2">Sold
                    Out Soon</h2>
                <div className="flex justify-center">
                    {soldLoaded === true ? soldOutSoonList.map((item) => (
                        <SoldOutSoonPhoneItem brand={item.brand} price={item.price} stock={item.stock}
                            title={item.title} key={item._id} image={item.image} id={item._id}
                            rating={RatingMaker(item)} setMainPageState={setMainPageState} setSelectedItemId={setSelectedItemId}/>
                    )) : <div className="text-yellow-300">Loading...</div>}
                </div>
            </section>

            <div className="divider mt-1"></div>

            <section className="BestSellers">
                <h2 className="text-2xl font-bold ml-3 mb-5 text-orange-500 italic bg-pink-200 w-fit rounded p-2">Best
                    Sellers</h2>
                <div className="flex justify-center">
                    {bestLoaded === true ? bestSellerList.map((item) => (
                        <BestSellerItem brand={item.brand} price={item.price} title={item.title} image={item.image}
                            rating={RatingMaker(item)} key={item._id} id={item._id} stock={item.stock} setMainPageState={setMainPageState} setSelectedItemId={setSelectedItemId}/>
                    )) : <div className="text-yellow-300">Loading...</div>}
                </div>
            </section>
        </>
    )
}
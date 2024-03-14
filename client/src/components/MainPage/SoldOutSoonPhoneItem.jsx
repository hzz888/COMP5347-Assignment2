import React from 'react'
import './MainPage.css';
import BrandPicSelector from '../../utils/BrandPicSelector'

export function SoldOutSoonPhoneItem({id, brand, price, stock, title, image, rating, setMainPageState, setSelectedItemId}) {
    let picUri = image === "imageurl" ? BrandPicSelector(brand) : image;
    // console.log("PicUri:", picUri);
    return (
        <>
            <div>
                <div
                    className="card bg-base-100 shadow-xl flex flex-row flex-wrap m-1 max-w-xs max-h-fit hover:border-orange-400 hover:border-4" onClick={() => {
                        setMainPageState("Item");
                        setSelectedItemId(id);
                    }}>
                    <figure><img src={picUri} alt={title}/></figure>
                    <div className="card-body">
                        <h2 className="card-title break-words">
                            {title}
                        </h2>
                        <div className="badge badge-lg badge-secondary text-xs p-2 whitespace-nowrap">Low Stock</div>
                        <p>Price: {price}</p>
                        <p>Rating: {rating}★</p>
                        <p>Only {stock} left</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">{brand}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
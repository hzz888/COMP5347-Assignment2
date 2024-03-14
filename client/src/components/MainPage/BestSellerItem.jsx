import BrandPicSelector from "../../utils/BrandPicSelector";
import React from "react";
import './MainPage.css';

export function BestSellerItem({id, brand, price, rating, title, stock, image, setMainPageState, setSelectedItemId}) {
    let picUri = image === "imageurl" ? BrandPicSelector(brand) : image;
    return (
        <>
            <div>
                <div
                    className="card bg-base-100 shadow-xl flex flex-row flex-wrap m-1 max-h-full max-w-xs hover:border-orange-400 hover:border-4" onClick={() => {
                        setMainPageState("Item");
                        setSelectedItemId(id);
                    }}>
                    <figure><img src={picUri} alt={title}/></figure>
                    <div className="card-body max-h-fit max-w-xs">
                        <h2 className="card-title max-h-full max-w-xs break-all">
                            {title}
                        </h2>
                        <div className="badge badge-lg badge-primary text-xs p-2 whitespace-nowrap">Best Seller</div>
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
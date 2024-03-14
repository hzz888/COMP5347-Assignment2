import React from "react";
import BrandPicSelector from "../../utils/BrandPicSelector";

export function SearchResultItem({id, brand, title, price, stock, rating, image, setMainPageState, setSelectedItemId}) {
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
import React, {useEffect, useState} from "react";
import {SearchResultItem} from "./SearchResultItem";
import {RatingMaker} from "../../utils/RatingMaker";
import './MainPage.css';

export function SearchStateContent({searchInput, brand, maxPrice, setMainPageState, setSelectedItemId}) {

    const [loaded, setLoaded] = useState(false);
    const [resultList, setResultList] = useState([]);


    useEffect(() => {

        async function fetchSearchResults() {
            try {
                let res = "";
                // encode search input to avoid special characters
                searchInput = encodeURIComponent(searchInput)

                res = await fetch(`http://localhost:3001/MainPage/search?Title=${searchInput}&Brand=${brand}&Price=${maxPrice}`);

                const data = await res.json();
                const resultList = [...data];
                setResultList(resultList);
            } catch (error) {
                console.error(error);
            }
        }

        setLoaded(false)
        fetchSearchResults().then(
            () => {
                setLoaded(true);
            }
        );
    }, [searchInput, brand, maxPrice]);


    function Result(resultList, loaded) {
        // console.log(loaded);
        // console.log(resultList);
        if (loaded && resultList.length === 0) {
            return <div className="text-yellow-300">No results found</div>
        } else if (loaded && resultList.length > 0) {
            return resultList?.map((item) => (
                <SearchResultItem key={item._id} id={item._id} brand={item.brand} title={item.title} price={item.price}
                                  stock={item.stock} rating={RatingMaker(item)}  image={item.image} setMainPageState={setMainPageState} setSelectedItemId={setSelectedItemId}/>))
        } else {
            return <div className="text-yellow-300">Loading...</div>
        }

    }

    return (
        <>
            <section className="SearchResults">
                <h2 className="text-2xl font-bold ml-3 mb-5 text-orange-500 italic bg-pink-200 w-fit rounded p-2">Search
                    Results</h2>
                <div className="flex flex-wrap justify-center">
                    {Result(resultList, loaded)}
                </div>
            </section>
        </>
    )
}
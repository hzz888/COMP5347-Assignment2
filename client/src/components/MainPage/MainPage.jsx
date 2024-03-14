import React, {useEffect, useState} from 'react'
import './MainPage.css';
import {HomeStateContent} from "./HomeStateContent";
import {SearchStateContent} from "./SearchStateContent";
import {useLocation, useNavigate} from "react-router-dom";
import {ItemStateContent} from "./ItemStateContent";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


document.title = "OldPhoneDeals";


function MainPage() {
    const [mainPageState, setMainPageState] = useState("Home");
    const [searchInput, setSearchInput] = useState("");
    const [finalSearchInput, setFinalSearchInput] = useState("");
    const [existMaxPrice, setExistMaxPrice] = useState(1000);
    const [existMinPrice, setExistMinPrice] = useState(0);
    const [existBrands, setExistBrands] = useState([]);
    const [searchPrice, setSearchPrice] = useState(existMaxPrice);
    const [brand, setBrand] = useState("All");
    const [loginState, setLoginState] = useState(false);
    const [user, setUser] = useState({"_id": "0"});
    const [userEmail, setUserEmail] = useState("");
    const [selectedItemId, setSelectedItemId] = useState("");
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);


    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchMaxPrice() {
            try {
                const res = await fetch('http://localhost:3001/MainPage/max-price')
                const data = parseFloat(await res.json());
                setExistMaxPrice(Math.floor(data + 1));
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchMinPrice() {
            try {
                const res = await fetch('http://localhost:3001/MainPage/min-price')
                const data = parseFloat(await res.json());
                setExistMinPrice(Math.floor(data + 1));
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchExistBrands() {
            try {
                const res = await fetch('http://localhost:3001/MainPage/brands')
                const data = await res.json();
                let brandList = [...data].sort((a, b) => a.localeCompare(b));
                setExistBrands(brandList);
            } catch (error) {
                console.error(error);
            }
        }

        async function userLogin() {

            let loginState = location.state?.login ?? false;
            let userEmail = location.state?.email ?? "";
            if (loginState) {
                setLoginState(true);
                setUserEmail(userEmail);
            } else {
                setLoginState(false);
                setUserEmail("");
            }
        }

        async function updateCart(){
            let newCart = location.state?.cart ?? null;
            if (newCart) {
                setCart(newCart);
            }
        }

        async function fetchUserDetail(email){
            try {
                const res = await fetch(`http://localhost:3001/UserPage/fetch-user-data2?Email=${userEmail}`);
                const data = await res.json();
                const user = [...data][0];
                setUser(user);
            } catch (error) {
                console.error(error);
            }
        }

        async function calculateTotalAmount() {
            let totalAmount = 0;
            if (cart.length > 0) {
                for (let i = 0; i < cart.length; i++) {
                    totalAmount += cart[i].quantity;
                }
            }else {
                totalAmount = 0;
            }
            setTotalAmount(totalAmount);
        }


        fetchMaxPrice().then()

        fetchMinPrice().then()

        fetchExistBrands().then()

        if (loginState === false) {
            userLogin().then();
        }else {
            fetchUserDetail().then();
        }

        updateCart().then();

        calculateTotalAmount().then()


    },[location.state?.login, location.state?.email, location.state?.cart, loginState, cart, totalAmount]);



    return (
        <div className="MainPage Base overflow-scroll">
            <div className="headbar flex item-center w-full align-middle">
                <span className="Title italic ml-5 hover:bg-pink-200 mt-1 rounded"
                      onClick={() => {
                          setMainPageState("Home");
                          setSearchInput("");
                          setFinalSearchInput("");
                          setBrand("All");
                          setSearchPrice(existMaxPrice);
                          setSelectedItemId("");
                      }}>OldPhoneDeals</span>
                <input type="text" placeholder="Search product"
                       className="input input-bordered input-secondary w-30 max-w-xs ml-10 mt-3 align-top"
                       value={searchInput} onChange={(i) => {
                    setSearchInput(i.target.value);
                }}/>
                <button className="btn mt-3 align-top SearchButton text-white ml-2"
                        onClick={() => {
                            setMainPageState("Search");
                            setFinalSearchInput(searchInput);
                        }}>Search
                </button>
                {mainPageState === "Search" ?
                    <select className="select select-info max-w-xs mt-3 align-top ml-3 w-30 BrandSelector"
                            defaultValue="All" onChange={(i) => setBrand(i.target.value)}>
                        <option>All</option>
                        {existBrands.map((brand) => {
                            return <option key={brand}>{brand}</option>
                        })}
                    </select> : null}

                {mainPageState === "Search" ?
                    <div className="ml-2 mb-5 mt-3 border-2 border-orange-400 rounded-md">
                        <span className="mt-2 ml-2 text-orange-300">Max Price:</span>
                        <input type="range" min={existMinPrice} max={existMaxPrice} defaultValue={existMaxPrice}
                               step="1"
                               className="ml-2 mr-2 mt-4 PriceRangeSelector p-0 h-3"
                               onChange={(i) => setSearchPrice(parseInt(i.target.value))}/>
                        <span className="text-orange-400 mr-1 ml-1">{searchPrice}</span>
                    </div> : null}
                <div className="align-right absolute right-0">
                    <span className='mr-2 text-blue-600 underline border-2 p-2 rounded border-purple-500'><ShoppingCartIcon color="secondary" className='m-1'/>{totalAmount}</span>
                    <button className="btn btn-active btn-primary mt-3 CheckOutButton mr-2" onClick={
                        () => {
                            loginState ? navigate("/checkout", {state: {cart:cart, email:user['email']}}) : navigate("/signin");
                        }
                    }>CheckOut</button>
                    {!loginState ? <button className="btn btn-info mt-3 SignInButton align-right mr-2"
                                           onClick={() => navigate("/signin")}>Sign In</button> : null}
                    {loginState ?

                        <button className="btn btn-success ProfileButton mt-3 align-right mr-2"  onClick={() => navigate("/user?email="+userEmail, {state:{cart:cart}})}>Profile</button> : null}
                    {loginState ? <button className="btn btn-error bg-red-500 SignOutButton mt-3 align-right mr-2" onClick={() => {
                        setLoginState(false);
                        setUserEmail("");
                        location.state.login = false;
                        location.state.email = "";
                        location.state.cart = [];
                        setCart([]);
                    }}>Sign Out</button> : null}
                </div>
            </div>
            <div className="divider mt-1"></div>
            <div className="MainPageContent w-full" id="MainPageContent">
                {mainPageState === "Home" ? <HomeStateContent setMainPageState={setMainPageState}
                                                              setSelectedItemId={setSelectedItemId}/> : (mainPageState === "Search" ?
                    <SearchStateContent searchInput={finalSearchInput} brand={brand} maxPrice={searchPrice}
                                        setMainPageState={setMainPageState} setSelectedItemId={setSelectedItemId}/> :
                    <ItemStateContent id={selectedItemId} setMainPageState={setMainPageState} setSelectedItemId={setSelectedItemId} setSearchInput={setSearchInput} setFinalSearchInput={setFinalSearchInput} user={user} cart={cart} setCart={setCart} loginState={loginState} totalAmount={totalAmount} setTotalAmount={setTotalAmount}></ItemStateContent>)}
            </div>
            <footer className="w-full bg-orange-500 rounded mt-3 mb-3">
                <div className="text-center text-white">USYD-COMP5347-2023S1-Assignment2</div>
            </footer>
        </div>)
}


export default MainPage
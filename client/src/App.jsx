import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PhoneList from './components/PhoneList';
// import Heading from './components/test'
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import MainPage from './components/MainPage/MainPage';
import {SignInPage, ResetPassword} from './components/LoginAndRegister/SignInPage';
import UserPage from './components/UserPage/UserPage';


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>} exact/>
                    <Route path="/user" element={<UserPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/test" element={<PhoneList/>}/>
                    <Route path="/resetpassword" element={<ResetPassword/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}


export default App;

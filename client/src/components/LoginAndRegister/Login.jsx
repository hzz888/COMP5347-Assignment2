import React, {useState} from "react"
import axios from "axios"
import './register.css';
import {useNavigate} from "react-router-dom";

//import the hash function to hash the password
let sha256 = require('js-sha256')


export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate();


    // This will need back-end support
    const handleSubmit = async (e) => {
        e.preventDefault(); // Page will get reloaded and lose the state


        try {
            //Hash the password
            let pass_hashed = sha256(pass)
            // console.log(pass)
            // console.log(pass_hashed)
            //Call the verify api to check the email password validation

            const response = await axios.post("http://localhost:3001/login", {
                Email: email,
                Password: pass_hashed,
            })
            console.log(response.data)
            if (response.data) {
                // alert("Login Successfully!")

                //redirect to the home page

               
                navigate("/", {state: {login: true, email: email}});
            } else {
                alert("Email invalid or Password is not correct")

            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="email">Email</label>
                <input className="PW" value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                       placeholder="youremail@domain.com" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input className="PW" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********"
                       id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="link-b" onClick={() => props.onFormSwitch('resetoption')}>Reset Password</button>
            <button className="link-b" onClick={() => props.onFormSwitch("register")}>Don't have an account? Register
                here.
            </button>
        </div>
    )
}
import React, {useState,useEffect} from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"
import './register.css';

export const ResetPwOption=(props) =>{
    const [Email,setEmail] = useState('')
    
    // This will need back-end support
    const handleSubmit = async(e) => {
        e.preventDefault(); // Page will get reloaded and lose the state
        console.log(Email);
        try{
            const response = await axios.post("http://localhost:3001/reset-password",{Email});
            console.log(response.data)
            if(response.data===false){
                alert("We dont have an account associated with this email, please try again")
                //reload the page
                props.onFormSwitch('resetoption')
            }else{
                alert("We have sent the reset link to your email address, please check!")
            }
        }catch(error){
            console.error(error)
        }
    }

    return(
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor ="email">Email</label>
                <input value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="youremail@domain.com" id="email" name="email"/>
                <button type="submit">Send reset link</button>
            </form>

            <button className="link-b" onClick={()=> props.onFormSwitch('login')}>Already have an account? Login here.</button>
            <button className="link-b" onClick={()=> props.onFormSwitch("register")}>Don't have an account? Register here.</button>
        </div>
    )
}


//import the hash function to hash the password
var sha256 = require('js-sha256')

export const ResetPw=(props) =>{
    const [email,setEmail] = useState('')
    const [password,setPasswod]= useState('')
    const [confirm_pass,set_confirm_password] = useState('')
    const [passError,setPassError] = useState(null)

    const navigate = useNavigate();
    const location = useLocation();
    //Extra email addres from URL query string
    useEffect(()=>{
        const searchParams=new URLSearchParams(location.search)
        setEmail(searchParams.get('email'))
    },[location])

    const validatePassword = () =>{
        let isValid = true 

        if(password !== confirm_pass){
            console.log(password)
            console.log(confirm_pass)
            setPassError('Password do not match')
            isValid = false
        }
        if(password.length <8 ){
            setPassError('Password must be at least 8 charcters long')
            isValid = false
        }
        //Regular expression for at least one uppercase letter, one lowercase letter, one number and one symbol
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        if(!regex.test(password)){
            console.log(password)
            setPassError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol')
            isValid = false
        }
        if (isValid){
            setPassError(null)
            return true
        }else{
            return false
        }
    }

    // This will need back-end support
    const handleSubmit = async(e) => {
        e.preventDefault(); // Page will get reloaded and lose the state
        if(validatePassword()){
            var pass_hashed = sha256(password)

            setPassError(null)
            //Calling API to update password
            const response = await axios.post("http://localhost:3001/update-password",{
                Email:email,
                Password: pass_hashed
            })
            alert("Password update successfully! Please procced to Log In")
            navigate('/signin')
        }else{
            alert('Issues with new password, please try again')
        }

        

    }

    return(
        <div className="Login">
            <div className="auth-form-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor ="email">Email</label>
                    <input value={email}  type="text" id="email" name="email" disabled/>

                    <label htmlFor ="password">New Password</label>
                    <input value={password} onChange={(e)=>setPasswod(e.target.value)} type="password" onInput={()=>setPassError(null)} placeholder="*********" id="password" name="password" />
                    <label htmlFor ="confirm_password">Confirm Password</label>
                    <input value={confirm_pass} onChange={(e)=>set_confirm_password(e.target.value)} type="password" onInput={()=>setPassError(null)} placeholder="*********" id="confirm_password" name="confirm_password" className={passError ? "highlight" : ""}/>
                    {passError && <div style={{color: 'red'}}>{passError}</div>}
                    <button  type="submit">Confirm New Password</button>
                </form>

            </div>
        </div>
    )
}


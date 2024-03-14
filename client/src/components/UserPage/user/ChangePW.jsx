import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"



//import the hash function to hash the password
let sha256 = require('js-sha256')


export const ChangePW = (props) =>{
    const [email,setEmail] = useState('')
    const [currentpassword,setCurrentPassword] = useState('')
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

    const handleSubmit = async(e) => {
        e.preventDefault(); // Page will get reloaded and lose the state
        //verify current password
        try{
            if(validatePassword()){
                var pass_hashed = sha256(password)
                var current_pass_hash = sha256(currentpassword)
                console.log(currentpassword)
                const verification = await axios.post("http://localhost:3001/login",{
                    Email: email,
                    Password: current_pass_hash,
                })
                console.log(verification.data)
                if(verification.data){
                
                setPassError(null)
                //Calling API to update password
                const response = await axios.post("http://localhost:3001/update-password",{
                    Email:email,
                    Password: pass_hashed
                })
                const sendEmail = await axios.post("http://localhost:3001/UserPage/pwUpdateNotification",{
                    Email:email
                })
                alert("Password update successfully! Please procced to Log In")
                navigate('/signin')
                }else{
                    alert('Current Password Incorrect')
                }
    
            }else{
                alert('Issues with new password, please try again')
            }

        }catch(error){
            console.error(error)
        }
    }

    return(
        <div className="Login">
            <div className="auth-form-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor ="email">Email</label>
                    <input value={email}  type="text" id="email" name="email" disabled/>

                    <label htmlFor ="currentpassword">Current Password</label>
                    <input value={currentpassword}onChange={(e)=>setCurrentPassword(e.target.value)} type="password" placeholder="*********" id="current password" name="password" />

                    <label htmlFor ="password">New Password</label>
                    <input value={password}onChange={(e)=>setPasswod(e.target.value)} type="password" onInput={()=>setPassError(null)} placeholder="*********" id="password" name="password" />
                    <label htmlFor ="confirm_password">Confirm New Password</label>
                    <input value={confirm_pass} onChange={(e)=>set_confirm_password(e.target.value)} type="password" onInput={()=>setPassError(null)} placeholder="*********" id="confirm_password" name="confirm_password" className={passError ? "highlight" : ""}/>
                    {passError && <div style={{color: 'red'}}>{passError}</div>}
                    <button  type="submit">Confirm New Password</button>
                </form>

            </div>
        </div>
    )



}
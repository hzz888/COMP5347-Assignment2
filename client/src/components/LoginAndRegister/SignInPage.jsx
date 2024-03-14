import React, {useState} from 'react'
import './login.css';
import {Register} from './Register';
import {Login} from './Login';
import {ResetPwOption,ResetPw} from './resetPW'


export function SignInPage(){
    const [currentForm, setCurrentForm] = useState('login') // To choose whether login form or register form should show
    
    const toggleForm= (formName) => {
        setCurrentForm(formName)
    }
    
    return(
        <div className='Login Base'>
            {
                currentForm === "login" ? <Login onFormSwitch={toggleForm} /> :currentForm === "resetoption" ? <ResetPwOption onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
            }
        </div>
    )
}

export function ResetPassword(){

    return (
        <div>
            <ResetPw />
        </div>
    )
}

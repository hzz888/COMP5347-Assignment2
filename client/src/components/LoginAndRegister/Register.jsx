import React, {useState} from "react"
import axios from "axios"
import './register.css';

//import the hash function to hash the password
const sha256 = require('js-sha256');


export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirm_pass, setConfirmPassword] = useState('')
    const [first_name, set_first_name] = useState('')
    const [last_name, set_last_name] = useState('')
    const [passError, setPassError] = useState(null)
    const [FirstNameError, setFirstNameError] = useState(null)
    const [LastNameError, setLastNameError] = useState(null)
    const [EmailError, setEmailError] = useState(null)


    // Check if the password follow the right rules
    const validatePassword = () => {
        let isValid = true

        if (pass !== confirm_pass) {
            console.log(pass)
            console.log(confirm_pass)
            setPassError('Password do not match')
            isValid = false
        }
        if (pass.length < 8) {
            setPassError('Password must be at least 8 characters long')
            isValid = false
        }
        //Regular expression for at least one uppercase letter, one lowercase letter, one number and one symbol
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        if (!regex.test(pass)) {
            setPassError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol')
            isValid = false
        }
        if (isValid) {
            setPassError(null)
            return true
        } else {
            return false
        }
    }
    //check if UserPage has insert last name, first name and email address
    const validateOtherField = () => {
        let isValid = true

        //check first name is entered?
        if (first_name.trim() === '') {
            setFirstNameError('Please enter your first name')
            isValid = false
        }
        //check last name is entered?
        if (last_name.trim() === '') {
            setLastNameError('Please enter your last name')
            isValid = false
        }

        //check if email is entered and valid
        const emailFormat = /\S+@\S+\.\S+/
        if (email.trim() === '') {
            setEmailError('Please enter your email address')
            isValid = false
        } else if (!emailFormat.test(email.trim())) {
            setEmailError("Please enter a valid email address")
            isValid = false
        }
        if (isValid) {
            setEmailError(null)
            setFirstNameError(null)
            setLastNameError(null)
            return true
        } else {
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Page will get reloaded and lose the state
        console.log(email);


        if (validatePassword() && validateOtherField()) {
            setPassError(null)

            //pass the data to the database
            try {
                let pass_hashed = sha256(pass)
                let new_user_info = {
                    Email: email,
                    Password: pass_hashed,
                    Firstname: first_name,
                    Lastname: last_name,
                }
                console.log(new_user_info)

                //pass this new UserPage data into the db using the api
                const response = await axios.post("http://localhost:3001/register-user", new_user_info)
                // console.log(response)
                if (response.data === false) {
                    alert("There is an account associated with this email already! Try another email address or try to log in! ")
                    props.onFormSwitch('register')
                } else {
                    alert("Account registration successful, a verification link has sent to your email please verify your email to log in")
                    props.onFormSwitch('login')
                }

            } catch (error) {
                console.log(error)
            }
        }

    }


    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="register-form">
                <label htmlFor="first name">First Name</label>
                <input value={first_name} onChange={(e) => set_first_name(e.target.value)}
                       onInput={() => setFirstNameError(null)} placeholder="First Name" id="fist_name"
                       name="first_name"/>
                {FirstNameError && <div style={{color: 'red'}}>{FirstNameError}</div>}

                <label htmlFor="last name">Last Name</label>
                <input value={last_name} onChange={(e) => set_last_name(e.target.value)}
                       onInput={() => setLastNameError(null)} placeholder="last Name" id="last_name" name="last_name"/>
                {LastNameError && <div style={{color: 'red'}}>{LastNameError}</div>}
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                       onInput={() => setEmailError(null)} placeholder="youremail@domain.com" id="email" name="email"/>
                {EmailError && <div style={{color: 'red'}}>{EmailError}</div>}
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"
                       onInput={() => setPassError(null)} placeholder="*********" id="password" name="password"/>
                {passError && <div style={{color: 'red'}}>{passError}</div>}
                <label htmlFor="confirm_password">Confirm Password</label>
                <input value={confirm_pass} onChange={(e) => setConfirmPassword(e.target.value)} type="password"
                       onInput={() => setPassError(null)} placeholder="*********" id="confirm_password"
                       name="confirm_password" className={passError || confirm_pass !== pass ? "highlight" : ""}/>
                {passError && <div style={{color: 'red'}}>{passError}</div>}
                <button type="submit">Register</button>
            </form>

            <button className="link-b" onClick={() => props.onFormSwitch('login')}>Already have an account? Login
                here.
            </button>
        </div>
    )
}
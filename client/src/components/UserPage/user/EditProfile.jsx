import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"

//import the hash function to hash the password
let sha256 = require('js-sha256')

export const EditProfile =(props) => {
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [id,setId] = useState('')

    const [FirstNameError,setFirstNameError] = useState(null)
    const [LastNameError,setLastNameError] =useState(null)
    const [EmailError,setEmailError] = useState(null)
    const [password, setPassword] = useState(null);
    const [showUpperForm, setShowUpperForm] = useState(true);
    const [showLowerForm, setShowLowerForm] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
          const searchParams = new URLSearchParams(location.search);
          setEmail(searchParams.get('email'))
          async function fetchEmail() {
            try {
                console.log(email);
                const res = await axios.get("http://localhost:3001/UserPage/fetch-user-data2", {params: {Email: email}});
                console.log(res.data[0]);
                setFirstname(res.data[0].firstname);
                setLastname(res.data[0].lastname);
                setId(res.data[0]._id);
            } catch (error) {
              console.error(error);
            }
          }
          fetchEmail()
      }, [location,email]);

    // console.log(userID)
    //check if user has insert last name, first name and email address
    const validateOtherField = () =>{
        let isValid = true

        //check first name is entered?
        if (firstname.trim()===''){
            setFirstNameError('Please enter your first name')
            isValid = false
        }
        //check last name is entered?
        if (lastname.trim()===''){
            setLastNameError('Please enter your last name')
            isValid = false
        }

        //check if email is entered and valid
        const emailFormat = /\S+@\S+\.\S+/
        if(email.trim()===''){
            setEmailError('Please enter your email address')
            isValid = false
        }else if(!emailFormat.test(email.trim())){
            setEmailError("Please enter a valid email address")
            isValid = false
        }
        if(isValid){
            setEmailError(null)
            setFirstNameError(null)
            setLastNameError(null)
            return true
        }else{
            return false
        }
        

    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateOtherField()){
            
          try{
            setShowLowerForm(true)
            setShowUpperForm(false)
            // handleUpdateClick()
            // your API call and logic here
          }catch(error){
            console.error(error)
          }
        }
      }

    const handlePasswordSubmit = async(e) =>{
        e.preventDefault();
        if(password !== null){
            var pass_hash= sha256(password)
            const response = await axios.post("http://localhost:3001/login",{
                Email: email,
                Password: pass_hash,
            })
            if(response.data){
                const update = await axios.post("http://localhost:3001/UserPage/updateProfile",{
                    Email:email,
                    FirstName:firstname,
                    LastName: lastname,
                    ID: id
            })
                if(update.data){           
                alert("Update successfully!")
                // navigate(`?email=${email}`)
                }else{
                    alert("Error while updating, please try again")
                    // navigate(`?email=${email}`)
                }

            }else{
                alert("Password is not correct")
            }

        }else{
            alert("Do not accept empty password")
        }
    }
    return (
        <div className=".Login">
            {showUpperForm ? (
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor ="email">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email"/>
                {EmailError && <div style={{color: 'red'}}>{EmailError}</div>}
                
                <label htmlFor ="firstname">First Name</label>
                <input value={firstname} onChange={(e)=>setFirstname(e.target.value)} type="text"  id="firstname" name="Firstname"/>
                {FirstNameError && <div style={{color: 'red'}}>{FirstNameError}</div>}

                <label htmlFor ="lastname">Last Name</label>
                <input value={lastname} onChange={(e)=>setLastname(e.target.value)} type="text" id="lastname" name="Lastname"/>
                {LastNameError && <div style={{color: 'red'}}>{LastNameError}</div>}
                <button type="button"  className="link-b" onClick={handleSubmit}>Update</button>
            </form>
            ) : null}

            {showLowerForm ? (
            <form onSubmit={handlePasswordSubmit} className="login-form">
                <label htmlFor ="password">Please enter your password to update your profile</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password"/>
                <button type="submit"  className="link-b">Confirm</button>
            </form>
            ) : null}

        </div>
    )
}
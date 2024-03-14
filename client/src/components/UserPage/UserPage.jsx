import React from 'react'
import './user/user.css'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { EditProfile } from './user/EditProfile';
import {ManageListing} from './user/ManageListing';
import { ViewComments } from './user/ViewComments';
import {ChangePW} from './user/ChangePW'


function LinkTab(props) {
    return (
      <Tab
        component='a'
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

function UserPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  // get email from url
  const url = window.location.href;
  const email = url.split('?')[1].split('=')[1];
        
  
    return (
    <div className='User'>
        <h1 className="ml-2">User Page</h1>
        <button onClick={() => navigate("/", {state: {login: true, email: email, cart: location.state.cart}})}>Back To Home</button>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' ,height: '100%'}}>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
          <LinkTab label="Edit Profile" href="/" index={0} />
          <LinkTab label="Change Password" href="/" index={1} />
          <LinkTab label="Manage Listings" href="/" index={2} />
          <LinkTab label="View Comments" href="/" index={3} />
        </Tabs>
      </Box>
      <hr className='black-bar'></hr>

      <div className="tab-content active">
        {value ===0 && <EditProfile/>}
        {value ===1 && <ChangePW/>}
        {value ===2 && <ManageListing/>}
        {value ===3 && <ViewComments/>}
      </div> 
    </div>
    );
}


export default UserPage
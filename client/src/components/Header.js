import { Link } from 'react-router-dom'
import './Header.css'
import React from "react";
const Header = ({accountName, setAccountName}) => {
    
    const username = accountName.accountName
    
    return (
        <div className="header"> 
           
           <div className="otsikko"> 
            <Link to="/" className='linkki'>MyShowMoList</Link>
            {username && (
            <div className='profile'>
                
                <ul className='UlProfile'>
                <li>
                
              <a className='Profiili'> {username} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            
                <ul className='Droppi'> 
                    <li>
                    <Link to="/UserProfile">Profile</Link>
                    <Link to="/accountSettings">Account settings</Link>
                    <Link to="/YourGroups">Groups</Link>
                    <Link to="/YourReviews">Reviews</Link>
                    
                    <Link to="/Logout" onClick={() => setAccountName({})}>Logout</Link>
                    
                    
                    </li>
                </ul>
                </li>
                </ul>
            </div>
            )}
            {!username && (
            <div className="headermenu">
                
            <Link to="/login">
            <button type="button">Login/Sign Up</button>
            </Link>
        
             
        
            </div>
            )}
            </div>

            </div>
    );
};

export default Header;

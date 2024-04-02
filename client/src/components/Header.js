import { Link } from 'react-router-dom'
import './Header.css'
import React from "react";

const Header = () => {

    return (
        <div className="header"> 
           
            <div className="otsikko"> 
            <Link to="/" className='linkki'>MyShowMoList</Link>
            <div className='profile'>
                
                <ul className='UlProfile'>
                <li>
                <a className='Profiili'> Username</a> 
                <ul className='Droppi'> 
                    <li>
                    <Link to="/UserProfile">Profile</Link>
                    <Link to="/MovieSearch">Groups</Link>
                    <Link to="/MovieSearch">Reviews</Link>
                    <Link to="/MovieSearch">Logout</Link>


                    </li>
                </ul>
                </li>
                </ul>
            </div>
            
            <div className="headermenu">
            <Link to="/login">
            <button type="button"> Login</button>
            <button type="button"> Sign Up</button>
            </Link>
            </div>
            </div>

            </div>
    );
};

export default Header;
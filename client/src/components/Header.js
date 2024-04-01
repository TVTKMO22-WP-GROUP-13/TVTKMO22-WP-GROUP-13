import { Link } from 'react-router-dom'
import './Header.css'
import React from "react";

const Header = () => {

    return (
        <div className="header"> 
           
            <div className="otsikko"> 
            <Link to="/" className='linkki'>MyShowMoList</Link>
            
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
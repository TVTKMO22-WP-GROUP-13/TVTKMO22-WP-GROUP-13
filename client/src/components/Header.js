import './Header.css'
import React from "react";

const Header = () => {

    return (
        <div className="header"> 
           
            <div className="otsikko"> MyShowMoList
            <div className="headermenu">
            <button type="button"> Login</button>
            <button type="button"> Sign Up</button>
            </div>
            </div>

            </div>
    );
};

export default Header;
import { Link } from 'react-router-dom'
import './Header.css'
import React from "react";

const Header = ({user}) => {

    return (
        <div className="header"> 
           
            <div className="otsikko"> 
            <Link to="/" className='linkki'>MyShowMoList</Link>
            <div className='profile'>
                
                <ul className='UlProfile'>
                <li>
                {user &&
                <a className='Profiili'> Username</a> 
            }
                <ul className='Droppi'> 
                    <li>
                    <Link to="/UserProfile">Profile</Link>
                    <Link to="/YourGroups">Groups</Link>
                    <Link to="/YourReviews">Reviews</Link>
                    { user &&
                    <Link to="/Logout">Logout</Link>
                    }

                    </li>
                </ul>
                </li>
                </ul>
            </div>
            
            <div className="headermenu">
                {user === null &&
            <Link to="/login">
            <button type="button">Login/Sign Up</button>
            </Link>
             }
             
        
            </div>
            </div>

            </div>
    );
};

export default Header;
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
            <ul>
              <li>
                <a href="#" > Movies</a>
              <ul className="dropdownmenu">
                <li><a href="#"> Movie Search</a></li>
                <li><a href="#"> Top Movies </a></li>
              </ul>
              </li>
              <li><a href="" > Series</a>
              <ul className="dropdownmenu">
              <li><a href="#"> Series Search</a></li>
              <li><a href="#"> Top Series </a></li>
              </ul>
              </li>
              <li><a href="" > Groups</a>
              <ul className="dropdownmenu">
              <li><a href="#"> Group Search</a></li>
              <li><a href="#"> Your Groups </a></li>
              </ul>
              </li>
              <li><a href="" > Reviews</a>
              <ul className="dropdownmenu">
              <li><a href="#"> Reviews search </a></li>
              </ul>
              </li>  
              <li><a href="" > Dinnkino</a></li>  
              <select id="category">
                <option value="All">All</option>
                <option value="Movies">Movies</option>
                <option value="Series">Series</option>
                <option value="Users">Users</option>
                <option value="Groups">Groups</option>
              </select>
              <input type="text" id="search" placeholder="Search" ></input>           
              

            </ul>
            
            </div>
    );
};

export default Header;
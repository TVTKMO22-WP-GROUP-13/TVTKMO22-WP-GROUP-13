import { Link } from 'react-router-dom'
import './Navbar.css'
import React from 'react'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a> Movies</a>
          <ul className="dropdownmenu">
            <li>
              <Link to="/MovieSearch">Movie Search</Link>
            </li>
            <li>
            <Link to="/TopMovies">Top Movies</Link>
            </li>
          </ul>
        </li>
        <li><a> Series &nbsp; </a>
          <ul className="dropdownmenu">
          <li>
          <Link to="/SeriesSearch">Series Search</Link>
          </li>
          <li>
            <Link to="/TopSeries">Top Series</Link>
            </li>
          </ul>
        </li>
        <li><a> Groups</a>
          <ul className="dropdownmenu">
          <li>
          <Link to="/GroupSearch">Group Search</Link>
          </li>
          <li>
            <Link to="/YourGroups">Your Groups</Link>
            </li>
          </ul>
        </li>
        <li><a> Reviews</a>
          <ul className="dropdownmenu">
          <li>
            <Link to="/ReviewsSearch">Reviews search</Link>
            </li>
          </ul>
        </li>
        <li>  
            <Link to="/Dinnkino">Dinnkino</Link>
        </li>
        <select id="category">
          <option value="All">All</option>
          <option value="Movies">Movies</option>
          <option value="Series">Series</option>
          <option value="Users">Users</option>
          <option value="Groups">Groups</option>
        </select>
        <input type="text" id="search" placeholder="Search" ></input>


      </ul>
      </nav>
  )
}

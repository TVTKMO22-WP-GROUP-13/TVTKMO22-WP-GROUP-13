import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieSearch from './pages/MovieSearch';
import TopMovies from './pages/TopMovies';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import SeriesSearch from './pages/SeriesSearch';
import TopSeries from './pages/TopSeries';
import GroupSearch from './pages/GroupSearch';
import YourGroups from './pages/YourGroups';
import ReviewsSearch from './pages/ReviewsSearch';
import Dinnkino from './pages/Dinnkino';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import UserFavorites from './pages/UserFavorites';
import MakeGroup from './pages/MakeGroup';
import UserComplitedPages from './pages/UserCompletedPages';
import UserWatchingPages from './pages/UserWatchingPages';
import UserPlanToWatchPages from './pages/UserPlanToWatchPages';
import YourReviews from './pages/YourReviews';
import LogOut from './pages/LogOut';
import AccountSettings from './pages/accountSettings';
import React, {useState} from 'react';


function App() {
  
      const [accountName, setAccountName] = useState({})
      const [passu, setPassu] = useState({})
  return (
    <>
      <Header accountName={accountName} setAccountName={setAccountName}/>
      <Navbar />
      
      <div className='container'>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/MovieSearch" element={<MovieSearch />}/>
        <Route path='/TopMovies' element={<TopMovies/>}/>
        <Route path='/SeriesSearch' element={<SeriesSearch/>}/>
        <Route path='/TopSeries' element={<TopSeries/>}/>
        <Route path='/GroupSearch' element={<GroupSearch/>}/>
        <Route path='/YourGroups' element={<YourGroups/>}/>
        <Route path='/YourReviews' element={<YourReviews/>}/>
        <Route path='/LogOut' element={<LogOut/>}/>
        <Route path='/ReviewsSearch' element={<ReviewsSearch/>}/>
        <Route path='/Dinnkino' element={<Dinnkino/>}/>
        <Route path='/Login' element={<Login setAccountName={setAccountName} setPassu={setPassu}/>}/>
        <Route path='/UserProfile' element={<UserProfile/>}/>
        <Route path='/AccountSettings' element={<AccountSettings accountName={accountName} passu={passu} setAccountName={setAccountName}/>}/>
        <Route path='/UserFavorites' element={<UserFavorites/>}/>
        <Route path='/MakeGroup' element={<MakeGroup/>}/>
        <Route path='/UserCompletedPages' element={<UserComplitedPages/>}/>
        <Route path='/UserWatchingPages' element={<UserWatchingPages/>}/>
        <Route path='/UserPlanToWatchPages' element={<UserPlanToWatchPages/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </div>
      
      <Footer />
    </>
    
  );
};

export default App;

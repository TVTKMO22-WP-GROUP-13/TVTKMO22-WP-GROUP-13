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
function App() {
  return (
    <>
      <Header />
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
        <Route path='/ReviewsSearch' element={<ReviewsSearch/>}/>
        <Route path='/Dinnkino' element={<Dinnkino/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </div>
      
      <Footer />
    </>
    
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeriesSearch.css';
import { jwtToken } from '../components/AuSignal';

const genresList = [
  'action & adventure', 'animation', 'comedy', 'crime', 'documentary',
  'drama', 'family', 'kids', 'sci-fi & fantasy', 'history', 'mystery',
  'news', 'reality', 'science fiction', 'soap', 'talk', 'war & politics', 'western'
];
const genreIdsMap = {
  "action": 28,
  "adventure": 12,
  "animation": 16,
  "comedy": 35,
  "crime": 80,
  "documentary": 99,
  "drama": 18,
  "family": 10751,
  "fantasy": 14,
  "history": 36,
  "horror": 27,
  "music": 10402,
  "mystery": 9648,
  "romance": 10749,
  "science fiction": 878,
  "tv": 10770,
  "thriller": 53,
  "war": 10752,
  "western": 37,
  "action & adventure": 10759,
  "kids": 10762,
  "news": 10763,
  "reality": 10764,
  "sci-fi & fantasy": 10765,
  "soap": 10766,
  "talk": 10767,
  "war & politics": 10786
};

const MovieResults = ({ movies }) => {
  const [Choice, SetChoice] = useState('');
  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [showChoices, setshowChoices] = useState(false);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const GetGroups = async (url, setUserGroups, groupType) => {
      //console.log(`Get ${groupType} groups`)
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        })
        //console.log(`${groupType} groups`, response.data)
        const groupData = groupType === 'created' ? response.data.groups : response.data.groupsJoined
        if (groupData && groupData.length > 0) {
          setUserGroups(groupData)

        } else {
          console.log(`No ${groupType} groups found`)
        }
      } catch (error) {
        console.error(`Error fetching ${groupType} groups:`, error)
      }
    }

    if (jwtToken.value) {
      GetGroups('http://localhost:3001/user_group/getUserCreatedGroups', setCreatedGroups, 'created');
      GetGroups('http://localhost:3001/group_member/groups_joined', setJoinedGroups, 'joined');
      setshowChoices(true)
    } else {
      console.log("no token")
      setshowChoices(false)

    }
  }, [])
  const handleAdd = async (movieData, Choice) => {
    const { id } = movieData
    console.log("SelectedMovie:", id)
    console.log("SelectedChoice:", Choice)
    if (Choice === 'Favorite') {
      console.log("Add to favorites")
      axios.post(`http://localhost:3001/list_entry/addEntry`, {
        tmdb_id: id,
        media_type: 'tv',
        list_type: 'Favorite'
      },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        }).then(response => {
          console.log("Success:", response.data.message)
        })
    } else if (Choice === 'Select' && Choice === '') {

      alert("Please select a group or Favorite to add the movie to.")

    }
    else {
      console.log("Add to group")
      axios.post(`http://localhost:3001/list_entry/addEntry`, {
        tmdb_id: id,
        media_type: 'tv',
        list_type: 'GroupMedia',
        group_id: Choice
      }, {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      }).then(response => {
        console.log("Success:", response.data.message)
      })
    }
  }
  // Käsittelijät arvostelun ja arvostelunumeron päivittämiseen
  const handleReviewChange = (movieId, text) => {
    setReviews({ ...reviews, [movieId]: text });
  };

  const handleRatingChange = (movieId, rating) => {
    setRatings({ ...ratings, [movieId]: rating });
  };

  // Käsittelijä arvostelun lähettämiselle
  const handleSubmitReview = async (movieId) => {
    const review = reviews[movieId];
    const rating = ratings[movieId];
    console.log('Arvostelu:', review);
    console.log('Arvosana:', rating);

    axios.post('http://localhost:3001/review/addReview', {
      media_type: 'tv',
      tmdb_id: movieId,
      rating: rating,
      review_text: review
    }, {
      headers: {
        'Authorization': `Bearer ${jwtToken.value}`
      }
    }).then(response => {
      console.log('Arvostelu lisätty:', response.data.message);
    }).catch(error => {
      console.error('Virhe arvostelun lisäämisessä:', error);
    });
    // Lähetä arvostelu backendiin...
    // Tyhjennä arvostelukentät
    setReviews({ ...reviews, [movieId]: '' });
    setRatings({ ...ratings, [movieId]: 0 });
  };

  return (
    <div className="movie-results-wrapper">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-result">
        <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
          <img src={movie.poster_path} alt={movie.title} />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        </a>
          <div>
            {showChoices && (
              <select onChange={(e) => SetChoice(e.target.value)}>
                <option value="Select">Select</option>
                <option value="Favorite">Favorite</option>
                {createdGroups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>{group.group_name}</option>
                ))}
                {joinedGroups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>{group.group_name}</option>
                ))}
                <option value="WriteReview">Write Review</option>
              </select>
            )}
            {(Choice !== 'Favorite' && Choice !== 'WriteReview' && Choice !== 'Select' && Choice !== '') && (
              <button onClick={() => handleAdd(movie, Choice)}>Save to group</button>
            )}
            {Choice === 'Favorite' && (
              <button onClick={() => handleAdd(movie, Choice)}>Add to Favorite</button>
            )}
            {Choice === 'WriteReview' && (
              <>
                <textarea
                  placeholder="Write your review here"
                  value={reviews[movie.id] || ''}
                  onChange={(e) => handleReviewChange(movie.id, e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Rating (0-5)"
                  min="0"
                  max="5"
                  value={ratings[movie.id] || ''}
                  onChange={(e) => handleRatingChange(movie.id, e.target.value)}
                />
                <button onClick={() => handleSubmitReview(movie.id)}>Submit Review</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const Movies = () => {
  const [query, setQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [genreQuery, setGenreQuery] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const genreIds = Array.from(selectedGenres).map(genre => genreIdsMap[genre]).join(',');
    setGenreQuery(genreIds);
  }, [selectedGenres]);

  const handleSearch = async () => {
    try {
      let response;
      if (query !== '') {
        response = await axios.get('http://localhost:3001/tmdb/tv/search', {
          params: {
            query: query,
            page: page,
            year: year
          }
        });
      } else {
        response = await axios.get('http://localhost:3001/tmdb/tv/discover', {
          params: {
            with_genres: genreQuery,
            sort_by: 'popularity.desc',
            page: page,
            year: year
          }
        });
      }
      console.log('tarkasta', response.data);
      console.log('haku:', query);
      console.log('haku:', genreQuery);
      setMovies(response.data);
    } catch (error) {
      console.error('Hakuvirhe:', error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prevSelectedGenres => {
      const updatedGenres = new Set(prevSelectedGenres);
      if (updatedGenres.has(genre)) {
        updatedGenres.delete(genre);
      } else {
        updatedGenres.add(genre);
      }
      return updatedGenres;
    });
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="search-wrapper">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for series..."
            value={query}
            onChange={handleInputChange}
          />
        </div>

        <div className="genre-container">
          <h2>Genres</h2>
          <div></div> {genresList.map(genre => (
            <button
              key={genre}
              className={`genre-button ${selectedGenres.has(genre) ? 'selected' : ''}`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="year-container">
          <h2>Year</h2>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            placeholder="Year"
          />
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <MovieResults movies={movies} />
    </div>
  );
};

export default Movies;
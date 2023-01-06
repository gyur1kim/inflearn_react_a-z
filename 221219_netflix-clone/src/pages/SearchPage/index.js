import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import axios from '../../api/axios'
import './SearchPage.css'

export default function SearchPage(props) {

  const [searchResult, setSearchResult] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get("q");
  // console.log(searchTerm);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      setSearchResult(request.data.results);
    }
    catch (error) {
      console.log(error);
    }
  }

  console.log(searchResult)

  const renderSearchResults = () => {
    return searchResult.length > 0? (
      <section className="search-container">
        {searchResult.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            return (
              <div className="movie" key={`movie__column-${movie.id}`}>
                <div className="movie__column-poster">
                  <img src={movieImageUrl} alt="movie poster" className="movie__poster" />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) :
    (
      <section className="no-results">
        <div className="no-results__text">
          <p>"{searchTerm}" 와/과 관련된 영화가 존재하지 않습니다</p>
        </div>
      </section>
    )
  }

  return renderSearchResults();
}

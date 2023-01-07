import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from '../../api/axios'
import { useDebounce } from "../../hooks/useDebounce";
import './SearchPage.css'

export default function SearchPage(props) {

  const [searchResult, setSearchResult] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // console.log(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(debouncedSearchTerm);
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (debouncedSearchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      )
      setSearchResult(request.data.results);
    }
    catch (error) {
      console.log(error);
    }
  }

  const renderSearchResults = () => {
    return searchResult.length > 0? (
      <section className="search-container">
        {searchResult.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            return (
              <div className="movie" key={`movie__column-${movie.id}`}>
                <div className="movie__column-poster" onClick={() => { navigate(`/${movie.id}`) }}>
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
          <p>"{debouncedSearchTerm}" 와/과 관련된 영화가 존재하지 않습니다</p>
        </div>
      </section>
    )
  }

  return renderSearchResults();
}

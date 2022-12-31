import React, {useEffect, useState} from 'react';

import axios from '../api/axios';
import './Row.css'

function Row({title, id, isLargeRow, fetchUrl}) {

  const [movies, setMovies] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/original"

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  }

  return (
    <section className="row">
      {/* title */}
      <h2>{title}</h2>

      {/* 캐로셀 구현 */}
      <div className="slider">
        <div className="slider__arrow-left">
          {/* {"<"}로 표현한 이유 : 안그러면 태그로 인식해서 에러가 남 */}
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth -80
            }}
          >
            {"<"}
          </span>
        </div>

        <div id={id} className="row__posters">
          {/* 영화 포스터 */}
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${BASE_URL}${isLargeRow? movie.poster_path : movie.backdrop_path}`}
                loading="lazy"
                alt={movie.name}
              />
            )
          })}
        </div>

        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth -80
            }}
          >
            {">"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Row;
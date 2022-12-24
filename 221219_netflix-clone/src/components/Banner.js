import React, {useEffect, useState} from 'react';

// axios 모듈을 사용하는 것이 아니라 우리가 만든 instance를 사용!
import axios from '../api/axios'
import requests from '../api/requests'

function Banner(props) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져온다
    const request = await axios.get(requests.fetchNowPlaying);
    console.log(request)

    // 현재 상영중인 영화 중 하나의 영화 랜덤 선택
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    // 그 영화의 정보 가져오기
    const {data: movieDetail} = await axios.get(`/movie/${movieId}`,{
      params: {append_to_response: "videos" },
    });
    console.log(movieDetail)
    setMovie(movieDetail);
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover"
      }}
    >
      <div className="banner__contents">
        <h1>{ movie.title || movie.name || movie.original_name }</h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button info">More Information</button>
        <h1 className="banner_description">{movie.overview}</h1>
        </div>
      </div>

      <div className="banner--fadeBottom" />

    </header>
  );
}

export default Banner;
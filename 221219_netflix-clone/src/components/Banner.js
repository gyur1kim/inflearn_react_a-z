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

    // 현재 상영중인 영화 중 하나의 영화 랜덤 선택
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    // 그 영화의 정보 가져오기
    const {data: movieDetail} = await axios.get(`/movie/${movieId}`,{
      params: {append_to_response: "videos" },
    });

    setMovie(movieDetail);
  }

  return (
    <div>
      {movie.title}
    </div>
  );
}

export default Banner;
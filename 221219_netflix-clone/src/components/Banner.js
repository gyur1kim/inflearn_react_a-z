import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

// axios 모듈을 사용하는 것이 아니라 우리가 만든 instance를 사용!
import axios from '../api/axios'
import requests from '../api/requests'

import './Banner.css'

function Banner(props) {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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

  const truncate = function (text, n){
    return text?.length > n? text.slice(0, n) + '...' : text
  }

  // play 버튼을 누른 경우
  if (isClicked) {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=1&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            allow="autoplay;"
            allowFullScreen></Iframe>
        </HomeContainer>
      </Container>
    );
  }
  // play 버튼을 누르지 않은 경우
  else {
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
          <h1 className="banner__title">{ movie.title || movie.name || movie.original_name }</h1>
          <div className="banner__buttons">
            {/* video가 존재하는 경우에만 동영상 play를 할 수 있도록 하자!*/}
            {movie.videos?.results.length ?
              <button className="banner__button play" onClick={() => setIsClicked(true)}>Play</button> : null
            }
            <button className="banner__button info">More Information</button>
          </div>
          <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
        </div>

        <div className="banner--fadeBottom" />

      </header>
    );
  }
}

// CSS in JS 이용 -> 컴포넌트 생성
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  // position: static 속성때문에 z-index는 적용되지 않는다...
  //z-index: -1;
  border: none;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

export default Banner;
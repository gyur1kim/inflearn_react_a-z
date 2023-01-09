import React, {useEffect, useState} from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import axios from '../api/axios';
import './Row.css'

import MovieModal from './MovieModal/MovieModal'

function Row({title, id, isLargeRow, fetchUrl}) {

  const BASE_URL = "https://image.tmdb.org/t/p/original"
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({})

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  }

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  return (
    <section className="row">
      {/* title */}
      <h2>{title}</h2>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}

        // 몇 개씩 보여줄건지!
        // 반응형 웹페이지에서는 breakpoints를 이용함
        // slidesPerView={3}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6      // 한 번에 몇 개씩 넘길 것인지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3
          }
        }}
        navigation                              // arrow btn
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        loop={true}                            // 무한반복
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >

        <div id={id} className="row__posters">
          {/* 영화 포스터 */}
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${BASE_URL}${isLargeRow? movie.poster_path : movie.backdrop_path}`}
                  loading="lazy"
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            )
          })}
        </div>

      </Swiper>

      {/* ModalOpen이 true면 같이 렌더링됨 */}
      { modalOpen && (
          <MovieModal
            {...movieSelected}
            setModalOpen={setModalOpen}
          />
        )}
    </section>
  );
}

export default Row;
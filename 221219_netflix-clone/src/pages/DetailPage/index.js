import React, {useEffect, useState} from 'react';

import { useParams } from 'react-router-dom'
import axios from '../../api/axios'

export default function DetailPage(props) {

  // 구조 분해 할당
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);

  if (movie) {
    return (
      <section>
        <img
          className="modal__poster-img"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="movie backdrop_path"
        />
      </section>
    )
  }
  else {
    return (
      <div>loading...</div>
    )
  }
}
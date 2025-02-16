import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomPagination from "./../components/CustomPagination";
import Geners from "./../components/Geners";
import useGenre from "./../hooks/useGenre";
import ContentModal from "./../components/ContentModal";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreForURL = useGenre(selectedGenres);
  console.log("genres =>", selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );
    console.log("movie data =>", data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreForURL, page]);
  return (
    <div>
      <span className="page-title">Discover Movies</span>
      <Geners
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content?.map((item) => (
            <ContentModal
              key={item?.id}
              id={item?.id}
              poster={item.poster_path}
              title={item?.title || item?.name}
              date={item?.first_air_date || item?.release_date}
              media_type="movie"
              vote_average={item?.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;

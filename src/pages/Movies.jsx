import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMedia,
  setGenres,
  setPage,
  setSelectedGenres,
} from "../store/slices/mediaSlice";
import CustomPagination from "./../components/CustomPagination";
import Geners from "./../components/Geners";
import useGenre from "./../hooks/useGenre";
import ContentModal from "./../components/ContentModal";

const Movies = () => {
  const dispatch = useDispatch();
  const { genres, selectedGenres, page, content, numOfPages, status, error } =
    useSelector((state) => state.media);
  const genreForURL = useGenre(selectedGenres);
  const mediaUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`;

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchMedia({ mediaUrl }));
    // eslint-disable-next-line
  }, [dispatch, genreForURL, page]);

  return (
    <div>
      <span className="page-title">Discover Movies</span>
      <Geners
        style={{ color: "white" }}
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={(genres) => dispatch(setSelectedGenres(genres))}
        genres={genres}
        setGenres={(genres) => dispatch(setGenres(genres))}
        setPage={(page) => dispatch(setPage(page))}
      />
      {status === "loading" && <p>Loading movies...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <div className="app-design">
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
        <CustomPagination
          setPage={(page) => dispatch(setPage(page))}
          numOfPages={numOfPages}
        />
      )}
    </div>
  );
};

export default Movies;

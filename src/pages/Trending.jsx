import React, { useEffect } from "react";
import ContentModal from "./../components/ContentModal";
import CustomPagination from "./../components/CustomPagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchMedia, setPage } from "../store/slices/mediaSlice";

const Trending = () => {
  const dispatch = useDispatch();
  const { page, content, status, error } = useSelector((state) => state.media);
  const mediaUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchMedia({ mediaUrl }));
    // eslint-disable-next-line
  }, [dispatch, page]);
  return (
    <div>
      <span className="page-title">Trending Today</span>
      {status === "loading" && <p>Loading Trending...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <div className="app-design">
        {content &&
          content.map((item) => (
            <ContentModal
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={(page) => dispatch(setPage(page))} />
    </div>
  );
};

export default Trending;

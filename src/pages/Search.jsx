import React, { useEffect } from "react";
import {
  Button,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ContentModal from "../components/ContentModal";
import CustomPagination from "../components/CustomPagination";
import "../styles/Search.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMedia,
  setPage,
  setSearchText,
  setType,
} from "../store/slices/mediaSlice";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const dispatch = useDispatch();
  const { page, content, numOfPages, error, status, searchText, type } =
    useSelector((state) => state.media);

  const mediaUrl = `https://api.themoviedb.org/3/search/${
    type ? "tv" : "movie"
  }?api_key=${
    process.env.REACT_APP_API_KEY
  }&language=en-US&query=${searchText}&page=${page}&include_adult=false`;

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchMedia({ mediaUrl }));
    // eslint-disable-next-line
  }, [dispatch, type, page]);

  return (
    <div>
      {
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="search-box"
              label="Search"
              variant="filled"
              onChange={(e) => dispatch(setSearchText(e.target.value))}
            />
            <Button
              onClick={() => dispatch(fetchMedia({ mediaUrl }))}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon />
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, newValue) => {
              dispatch(setType(newValue));
              dispatch((page) => setPage(page));
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs"
          >
            <Tab
              style={{ width: "50%", color: "white" }}
              label="Search Movies"
            />
            <Tab
              style={{ width: "50%", color: "white" }}
              label="Search TV Series"
            />
          </Tabs>
        </ThemeProvider>
      }
      {status === "loading" && <p>Loading Searching Media...</p>}
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
              media_type={type === 0 ? "movie" : "tv"}
              vote_average={item.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
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

export default Search;

import React, { useEffect } from "react";
import { Chip } from "@mui/material";

const Geners = ({
  selectedGenres,
  setSelectedGenres,
  setGenres,
  setPage,
  genres,
  type,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    if (typeof setPage === "function") setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    if (typeof setPage === "function") setPage(1);
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
`
      );
      const data = await res.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("finding error in genres => ", error);
    }
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          color="secondary"
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Geners;

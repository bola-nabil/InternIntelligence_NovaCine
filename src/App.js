import React from "react";
import { Routes, Route } from "react-router-dom";
// pages
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Container } from "@mui/material";

const App = () => {
  return (
    <div>
      <Header />
      <div className="app">
        <Container sx={{ pb: 8 }}>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
      <NavBar />
    </div>
  );
};

export default App;

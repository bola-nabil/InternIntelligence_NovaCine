import React, { useState, useEffect } from "react";
import { img_300, noPicture } from "../config/config";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/Carousel.css";

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);
  const handleDragStart = (e) => {
    e.preventDefault();
  };

  const items = credits.map((item) => (
    <div className="carousel-item">
      <img
        src={item.profile_path ? `${img_300}/${item.profile_path}` : noPicture}
        alt={item?.name}
        onDragStart={handleDragStart}
        className="carousel-item__img"
      />
      <b className="carousel-item__txt">{item?.name}</b>
    </div>
  ));
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);
  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Carousel;

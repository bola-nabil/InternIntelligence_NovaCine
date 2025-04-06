import React, { useEffect } from "react";
import { img_300, noPicture } from "../config/config";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/Carousel.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchCredits } from "../store/slices/carouselSlice";

const handleDragStart = (e) => {
  e.preventDefault();
};

const Gallery = ({ media_type, id }) => {
  const dispatch = useDispatch();
  const { credits } = useSelector((state) => state.carousel);
  const mediaUrl = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

  const items = credits.map((item) => (
    <div className="carousel-item" key={item.cast_id}>
      <img
        src={item.profile_path ? `${img_300}/${item.profile_path}` : noPicture}
        alt={item?.name}
        onDragStart={handleDragStart}
        className="carousel-item__img"
      />
      <b className="carousel-item__txt">{item.name}</b>
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

  useEffect(() => {
    dispatch(fetchCredits({ mediaUrl }));
    // eslint-disable-next-line
  }, [media_type, id]);
  return (
    <>
      <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </>
  );
};

export default Gallery;

import React, { useEffect } from "react";
import { Fade, Modal, Backdrop, Button, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";

import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config/config";
import "../styles/ContentModal.css";
import Carousel from "./Carousel";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, fetchVideo, setOpen } from "../store/slices/modalSlice";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    padding: "10px",
  },
}));

const ContentModal = ({
  media_type,
  id,
  vote_average,
  poster,
  title,
  date,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, content, video } = useSelector((state) => state.modal);

  const handleOpen = () => {
    dispatch(setOpen(true));
  };
  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const dataUrl = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const videoUrl = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

  useEffect(() => {
    dispatch(fetchData({ dataUrl }));
    dispatch(fetchVideo({ videoUrl }));
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <div>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        <Badge
          badgeContent={vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
          overlap="rectangular"
        />
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <span className="sub-title">
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="sub-title">{date}</span>
        </span>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        arial-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="content-modal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="content-modal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="content-modal__landscape"
                />
                <div className="content-modal__about">
                  <span className="content-modal__title">
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="content-modal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
};

export default ContentModal;

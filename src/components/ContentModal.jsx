import React, { useState, useEffect } from "react";
import axios from "axios";
import { Fade, Modal, Backdrop, Button, Badge } from "@mui/material";
import { YouTube } from "@mui/icons-material";
import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config/config";
import "../styles/ContentModal.css";
import Carousel from "./Carousel";
const ContentModal = ({
  media_type,
  id,
  vote_average,
  poster,
  title,
  date,
}) => {
  // const useStyles = makeStyles((theme) => ({
  //   modal: {
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   paper: {
  //     width: "90%",
  //     height: "80%",
  //     backgroundColor: "#39445a",
  //     border: "1px solid #282c34",
  //     borderRadius: 10,
  //     color: "white",
  //     // boxShadow: theme.shadows[5],
  //     // padding: theme.spacing(1, 1, 3),
  //   },
  // }));
  // const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        <Badge
          color={vote_average > 6 ? "primary" : "secondary"}
          overlap="rectangular"
        />
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="subTitle">{date}</span>
        </span>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        arial-describedby="transition-modal-description"
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
            <div>
              <div className="content-modal">
                <img
                  src={
                    content.poster_path
                      ? `{${img_500}/${content.poster_path}}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="content-modal__portrait"
                />
                <img
                  src={
                    content.backgrop_path
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
                    startIcon={YouTube}
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

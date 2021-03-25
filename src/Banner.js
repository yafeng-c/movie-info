import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      var index = Math.floor(Math.random() * request.data.results.length - 1);
      setMovie(request.data.results[index]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({
      type: "SELECT_VIDEO",
      selectedVideo: movie,
    });
  }, [movie]);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <Link to={`/video/${movie.id}`}>
            <button className="banner_button">More Info...</button>
          </Link>
        </div>
        <h1 className="banner_description">{movie?.overview}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;

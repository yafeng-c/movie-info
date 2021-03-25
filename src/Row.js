import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";
import { Redirect } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import grey from "./imgs/grey.png";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [videos, setVideos] = useState([]);
  const [selectvideo, setSelectVideo] = useState(null);
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setVideos(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    dispatch({
      type: "SELECT_VIDEO",
      selectedVideo: selectvideo,
    });
  }, [selectvideo]);

  if (selectvideo) return <Redirect to={`/video/${selectvideo.id}`} />;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {videos.map((video) => (
          <div className="movie" onClick={() => setSelectVideo(video)}>
            <img
              key={video.id}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={
                isLargeRow
                  ? `${base_url}${video.poster_path}`
                  : video.backdrop_path
                  ? `${base_url}${video.backdrop_path}`
                  : grey
              }
            />
            <span className="movie_title">
              {video.original_name ? video.original_name : video.original_title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;

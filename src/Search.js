import React, { useState, useEffect } from "react";
import VideoRow from "./VideoRow";
import "./Search.css";
import { useStateValue } from "./StateProvider";
import grey from "./imgs/grey.png";
import { Redirect } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

function Search() {
  const [{ results }, dispatch] = useStateValue();
  const [selectvideo, setSelectVideo] = useState(null);

  useEffect(() => {
    dispatch({
      type: "SELECT_VIDEO",
      selectedVideo: selectvideo,
    });
    //console.log(selectvideo);
  }, [selectvideo]);

  if (selectvideo) return <Redirect to={`/video/${selectvideo.id}`} />;

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="searchPage">
      <div className="searchContainer">
        {results?.map((result) => (
          <VideoRow
            key={result.id}
            id={result.id}
            rate={result.vote_average}
            time={result.first_air_date || result.release_date}
            title={result.name || result.title}
            image={
              result.poster_path ? `${base_url}${result.poster_path}` : grey
            }
            overview={truncate(result.overview, 100)}
            video={result}
            onClick={() => setSelectVideo(result)}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;

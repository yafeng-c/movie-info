import React, { useState, useEffect } from "react";
import "./VideoRow.css";
import { Redirect } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function VideoRow({ id, rate, time, title, image, overview, onClick }) {
  const [{ selectedVideo }, dispatch] = useStateValue();

  return (
    <div className="videoRow">
      <img src={image} alt="" />
      <div className="videoRow_text">
        <h3 className="videoRow_name" onClick={onClick}>
          {title}
        </h3>

        <p className="videoRow_headline">
          {time} · {rate} scores
        </p>
        <p className="videoRow_overview">{overview}</p>
      </div>
    </div>
  );
}

export default VideoRow;

import React from "react";
import requests from "./requests";
import Row from "./Row";
import Banner from "./Banner";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Banner />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Documentary" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
    </div>
  );
}

export default Home;

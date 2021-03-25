export const api_key = "b76b73aeb3197dd032588c39ab5f3af6";

const requests = {
  fetchTrending: `/trending/movie/week?api_key=${api_key}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${api_key}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${api_key}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${api_key}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${api_key}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${api_key}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${api_key}&with_genres=99`,
  fetchSearchTV: `/search/tv?api_key=${api_key}`,
  fetchSearchMovie: `/search/movie?api_key=${api_key}`,
  fetchMultiSearch: `/search/multi?api_key=${api_key}`,
};

export default requests;

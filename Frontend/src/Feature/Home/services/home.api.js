import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function all_movies() {
  const response = await api.get("/api/movies/all-movies");

  return response.data.movies;
}

export async function addWatchLater(title, PosterUrl, genre, year) {
  const response = await api.post("/api/movies/watch-later", {
    title,
    PosterUrl,
    genre,
    year,
  });

  return response.data.movie;
}

export async function getmovieData(movieId) {
  const response = await api.get(`/api/movies/get-movie/${movieId}`);
  return response.data.movie;
}

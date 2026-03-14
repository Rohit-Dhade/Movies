import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function all_movies() {
  const response = await api.get("/api/movies/all-movies");
//   console.log(response.data.movies);
  
  return response.data.movies;
}
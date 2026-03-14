import { useContext, useEffect } from "react";
import { all_movies, getmovieData, addWatchLater } from "../services/home.api";

import { MovieContext } from "../movie.context";

export const useMovie = () => {
  const context = useContext(MovieContext);

  const { movies, setmovies, loading, setLoading, watchlater, setwatchlater } =
    context;

  async function handleAllMovies() {
    setLoading(true);
    const data = await all_movies();
    setmovies(data);
    setLoading(false);
  }

  // async function handleGetmovie(movieId) {
  //   setLoading(true);
  //   const data = await getmovieData(movieId);
  //   setwatchlater((prev) => [...prev, data]);
  //   setLoading(false);
  // }

  async function handleWatchLater(userId, title, PosterUrl, year, genre) {
    setLoading(true);
    const data = await addWatchLater(userId, title, PosterUrl, year, genre);
    setwatchlater((prev) => [...prev, data]);
    setLoading(false);
  }

  return {
    movies,
    loading,
    watchlater,
    handleAllMovies,
    handleWatchLater,
  };
};

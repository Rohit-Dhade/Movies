import { useContext, useEffect , useState } from "react";
import { all_movies, getmovieData, addWatchLater,RemoveWatchMovieLater } from "../services/home.api";

import { MovieContext } from "../movie.context";

export const useMovie = () => {
  const context = useContext(MovieContext);
  const [selected, setselected] = useState(null);

  const { movies, setmovies, loading, setLoading, watchlater, setwatchlater } =
    context;

  async function handleAllMovies() {
    setLoading(true);
    const data = await all_movies();
    setmovies(data);
    setLoading(false);
  }

  async function handleGetmovie(movieId) {
    setLoading(true);
    const data = await getmovieData(movieId);
    setselected(data);
    setLoading(false);
  }

  async function handleWatchLater(userId, title, PosterUrl, year, genre) {
    const data = await addWatchLater(userId, title, PosterUrl, year, genre);
    setwatchlater((prev) => [...prev, data]);
  }

  async function handleRemoveWatchLater(userId , movieTitle) {
    const data = await RemoveWatchMovieLater(userId , movieTitle);
    setwatchlater((prev) => prev.filter((movie) => movie.title !== movieTitle));
  }

  return {
    movies,
    loading,
    watchlater,
    selected,
    handleAllMovies,
    handleWatchLater,
    handleRemoveWatchLater,
    handleGetmovie
  };
};

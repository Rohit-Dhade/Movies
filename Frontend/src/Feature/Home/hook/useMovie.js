import { useContext, useEffect } from "react";
import { all_movies } from "../services/home.api";

import { MovieContext } from "../movie.context";

export const useMovie = () => {
  const context = useContext(MovieContext);

  const { movies, setmovies, loading, setLoading } = context;

  async function handleAllMovies() {
    setLoading(true);
    const data = await all_movies();
    setmovies(data);
    setLoading(false);
  }

  return {
    movies,
    loading,
    handleAllMovies
  };
};
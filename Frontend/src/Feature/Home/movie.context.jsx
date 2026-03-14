import { useEffect } from "react";
import { createContext, useState } from "react";
import { all_movies, addWatchLater } from "./services/home.api";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [movies, setmovies] = useState([]);
  const [watchlater, setwatchlater] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await all_movies();
        setmovies(data);
      } catch {
        setmovies(null);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setmovies,
        loading,
        setLoading,
        watchlater,
        setwatchlater,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

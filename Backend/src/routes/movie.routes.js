import express from "express";
import {
  addMovieController,
  getAllMovies,
  addWatchlaterMovie,
  getmovie,
  GetWatchLaterMovies,
  deleteMovieFromWatchLater
} from "../Controllers/movie.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovieController);
movieRouter.get("/all-movies", getAllMovies);
movieRouter.post("/watch-later", addWatchlaterMovie);
movieRouter.get("/get-movie/:id", getmovie);
movieRouter.get("/get-watch-later-movie", identifyUser,GetWatchLaterMovies);
movieRouter.delete("/remove-movie" ,identifyUser,deleteMovieFromWatchLater);

export default movieRouter;

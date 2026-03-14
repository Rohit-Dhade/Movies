import express from "express";
import {
  addMovieController,
  getAllMovies,
  addWatchlaterMovie,
  getmovie,
} from "../Controllers/movie.controller.js";

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovieController);
movieRouter.get("/all-movies", getAllMovies);
movieRouter.post("/watch-later", addWatchlaterMovie);
movieRouter.get("/get-movie/:id", getmovie);

export default movieRouter;

import Movie from "../models/movies.model.js";
import watchlaterModel from "../models/watch_later.model.js";

export const addMovieController = async (req, res) => {
  try {
    const movieData = req.body;
    const newMovie = await Movie.create(movieData);
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add movie", error: err.message });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find();

    if (!allMovies) {
      res.status(500).json({
        message: "No movies found",
      });
    }

    res.status(200).json({
      message: "All movies fetched successfully",
      movies: allMovies,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetched all movies",
      error: err.message,
    });
  }
};

export const addWatchlaterMovie = async (req, res) => {
  const { userId, title, PosterUrl, year, genre } = req.body;
  try {
    if (!userId || !title || !PosterUrl || !year || !genre) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existing = await watchlaterModel.findOne({ title });

    if (existing) {
      return res.status(400).json({
        message: "Movie already in watch later list",
      });
    }

    const movie = await watchlaterModel.create({
      userId,
      title,
      PosterUrl,
      year,
      genre,
    });

    res.status(201).json({
      message: "Movie added in watch later section",
      movie: movie,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add movies in watch later section",
      error: err.message,
    });
  }
};

export const getmovie = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(400).json({
        message: "No Movie found",
      });
    }

    res.status(200).json({
      message: "Movie Fetched.",
      movie: movie,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get movies from movies section",
      error: err.message,
    });
  }
};

export const GetWatchLaterMovies = async (req, res) => {
  const userId = req.user.id;

  const movies = await watchlaterModel.find({userId});

  if (!movies) {
    return res.status(400).json({
      message: "No Movies found in watch later section",
    });
  }

  res.status(200).json({
    message: "Movies Fetched",
    movies: movies,
  });
};

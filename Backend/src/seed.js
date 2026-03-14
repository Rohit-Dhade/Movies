import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import axios from "axios";
import Movie from "./models/movies.model.js";

const API_KEY = "31ca42b5";

const movieTitles = [
  "Guardians of the Galaxy Vol. 2",
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Avengers: Endgame",
  "Avengers: Infinity War",
  "Titanic",
  "Avatar",
  "Gladiator",
  "The Matrix",
  "Spider-Man",
  "Spider-Man 2",
  "Spider-Man 3",
  "Doctor Strange",
  "Black Panther",
  "Thor",
  "Thor: Ragnarok",
  "Captain America: The First Avenger",
  "Captain America: Civil War",
  "Captain America: The Winter Soldier",
  "Iron Man",
  "Iron Man 2",
  "Iron Man 3",
  "Ant-Man",
  "Ant-Man and the Wasp",
  "Guardians of the Galaxy",
  "Doctor Strange in the Multiverse of Madness",
  "Black Widow",
  "Shang-Chi and the Legend of the Ten Rings",
  "Eternals",
  "The Incredible Hulk",
  "The Avengers",
  "Avengers: Age of Ultron",
  "Batman Begins",
  "The Dark Knight Rises",
  "Joker",
  "Man of Steel",
  "Wonder Woman",
  "Wonder Woman 1984",
  "Justice League",
  "Zack Snyder's Justice League",
  "Suicide Squad",
  "The Suicide Squad",
  "Aquaman",
  "The Flash",
  "Shazam!",
  "Shazam! Fury of the Gods",
  "Harry Potter and the Sorcerer's Stone",
  "Harry Potter and the Chamber of Secrets",
  "Harry Potter and the Prisoner of Azkaban",
  "Harry Potter and the Goblet of Fire",
  "Harry Potter and the Order of the Phoenix",
  "Harry Potter and the Half-Blood Prince",
  "Harry Potter and the Deathly Hallows: Part 1",
  "Harry Potter and the Deathly Hallows: Part 2",
  "Fantastic Beasts and Where to Find Them",
  "Fantastic Beasts: The Crimes of Grindelwald",
  "The Lord of the Rings: The Fellowship of the Ring",
  "The Lord of the Rings: The Two Towers",
  "The Lord of the Rings: The Return of the King",
  "The Hobbit: An Unexpected Journey",
  "The Hobbit: The Desolation of Smaug",
  "The Hobbit: The Battle of the Five Armies",
  "Star Wars: Episode I - The Phantom Menace",
  "Star Wars: Episode II - Attack of the Clones",
  "Star Wars: Episode III - Revenge of the Sith",
  "Star Wars: Episode IV - A New Hope",
  "Star Wars: Episode V - The Empire Strikes Back",
  "Star Wars: Episode VI - Return of the Jedi",
  "Star Wars: Episode VII - The Force Awakens",
  "Star Wars: Episode VIII - The Last Jedi",
  "Star Wars: Episode IX - The Rise of Skywalker",
  "Jurassic Park",
  "The Lost World: Jurassic Park",
  "Jurassic Park III",
  "Jurassic World",
  "Jurassic World: Fallen Kingdom",
  "Jurassic World Dominion",
  "Fast & Furious",
  "2 Fast 2 Furious",
  "Tokyo Drift",
  "Fast & Furious 6",
  "Furious 7",
  "The Fate of the Furious",
  "F9",
  "Mission: Impossible",
  "Mission: Impossible II",
  "Mission: Impossible III",
  "Mission: Impossible - Ghost Protocol",
  "Mission: Impossible - Rogue Nation",
  "Mission: Impossible - Fallout",
  "Top Gun",
  "Top Gun: Maverick",
  "Mad Max: Fury Road",
  "The Terminator",
  "Terminator 2: Judgment Day",
  "Alien",
  "Aliens",
];

async function seedMovies() {
  try {
    await mongoose.connect(
      "mongodb+srv://rohitdhade99_db_user:Lm1kPJFtu4XYpLNm@cluster0.ycxhgvm.mongodb.net/Movies",
    );

    const movies = [];

    for (let title of movieTitles) {
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`,
      );

      if (res.data && res.data.Response === "True") {
        movies.push(res.data);
      }
    }

    await Movie.insertMany(movies);

    console.log(`${movies.length} movies inserted successfully`);

    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seedMovies();

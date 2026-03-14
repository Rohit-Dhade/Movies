import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth.routes.js";
import movieRouter from "./routes/movie.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", AuthRouter);
app.use("/api/movies", movieRouter);

export default app;

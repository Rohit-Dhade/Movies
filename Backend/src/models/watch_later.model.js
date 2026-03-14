import mongoose from "mongoose";

const watchlaterSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    PosterUrl: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

/* watchlaterSchema.index({ userId: 1 }, { unique: true }); */

const watchlaterModel = mongoose.model("watch_later", watchlaterSchema);

export default watchlaterModel;

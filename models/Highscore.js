const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HighscoreSchema = new Schema(
  {
    game_title: { type: String, required: true },
    name: { type: String, required: true },
    lrn: { type: String, required: true },
    points: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Highscore || mongoose.model("Highscore", HighscoreSchema);

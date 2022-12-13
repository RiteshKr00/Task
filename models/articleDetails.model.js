const mongoose = require("mongoose");

const articleDetails = new mongoose.Schema({
  end_year: String,
  start_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});
const ArticleDetails = mongoose.model("ArticleDetails", articleDetails);
module.exports = ArticleDetails;

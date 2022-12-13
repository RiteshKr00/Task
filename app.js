const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const product = require("./routes/product.route");
var corsOptions = {
  origin: "*", // restrict calls to those this address
};
// NEW - replace custom middleware with the cors() middleware
app.use(cors());

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", (e) => {
  console.log(e);
  console.log("error connecting to mongo");
  //exit
  process.exit(1);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//routes
app.use("/api/v1/product", product);
app.get("/", async (req, res) => {
  try {
    res.send("200");
  } catch (error) {
    res.send(error);
  }
});
app.listen(process.env.PORT || 8080, () => {
  console.log("Server is runnng at port", process.env.PORT);
});

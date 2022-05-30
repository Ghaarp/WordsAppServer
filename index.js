require("dotenv").config();

const cors = require("cors");
const express = require("express");
const sequelize = require("./db");
const models = require("./models/model");
const appRouter = require("./routes/index");
const PORT = process.env.PORT;

const app = express();
const googleImages = require("google-images");
const client = new googleImages(
  process.env.GOOGLE_CSE_ID,
  process.env.GOOGLE_API_KEY
);

app.use(cors());
app.use(express.json());

app.use(appRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(parseInt(PORT), () => console.log(`Started on port ${PORT}`));

    //client.search("chicken").then((img) => {
    //  console.log(JSON.stringify(img));
    //});
  } catch (e) {
    console.log(e);
  }
};

start();

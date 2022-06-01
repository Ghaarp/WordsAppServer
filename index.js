require("dotenv").config();

//DEV
const translator = require("./core/translator");
//DEV

const cors = require("cors");
const express = require("express");
const sequelize = require("./db");
const models = require("./models/model");
const appRouter = require("./routes/index");
const PORT = process.env.PORT;
const errorHandlingMiddleware = require("./middleware/errorHandling");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", appRouter);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(parseInt(PORT), () => console.log(`Started on port ${PORT}`));

    //await translator.translateWord("roll");
    //let a = 0;
  } catch (e) {
    console.log(e);
  }
};

start();

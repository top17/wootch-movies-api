require("dotenv").config();
import express from "express";
import config from "config";
import cors from "cors";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(cors());
app.use(express.json());

app.use(deserializeUser);

app.use(router);

const port = config.get("port");

connectToDb().then(() =>
  app.listen(process.env.PORT || port, () => {
    log.info(`Listening on port ${port}`);
  })
);

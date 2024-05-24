import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
import router from "./routes.js";
import { createEmailList } from "./emailList.js";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.SERVER_PORT || 3000;
process.on("SIGINT", () => process.exit());

(() => {
  try {
    createEmailList(
      "bast",
      router,
      "/subscribe",
      "/unsubscribe",
      "/verify",
    );

    const expressApp = express();
    expressApp.use(bodyParser.json());
    if (dev) {
      expressApp.use(cors());
    }
    expressApp.use(morgan("short"));
    expressApp.use("/", router);
    expressApp.use(express.static("dist"));

    expressApp.listen(port, (err) => {
      if (err) throw err;
      logger.info(
        `Ready on localhost:${port} - env ${
          dev ? "development" : "production"
        }`,
      );
    });
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
})();

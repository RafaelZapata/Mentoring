import "dotenv/config";
import express from "express";
import cors from "cors";

import applyRoutes from "routes";
import { logger } from "utilities/logger";
import connectDB from "utilities/database";

const app = express();
const port = 7002;

logger.console = false;

app.use(express.json());
app.use(cors());

app.use( async (req, res, next) => {
  try {
    req.database = await connectDB();
    next();
  } catch (e) {
    console.log(e);
    next();
  }
});

applyRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

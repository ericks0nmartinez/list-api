import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import purchaseRoute from "./routes/purchaseRoutes.js";  // Note the ".js" extension for ES modules
import productRoute from "./routes/productRoutes.js";    // Note the ".js" extension for ES modules
import basicListRoute from "./routes/basicListRoutes.js"; // Note the ".js" extension for ES modules
import storeRoutes from "./routes/storeRoutes.js";        // Note the ".js" extension for ES modules
import userRoutes from "./routes/userRoutes.js";          // Note the ".js" extension for ES modules
import versionRoutes from "./routes/versionRoutes.js";    // Note the ".js" extension for ES modules
import dotenv from "dotenv";

dotenv.config();

const app = express();
const { DB_USER, ID_DB, DB_PASSWORD, DB, PORT } = process.env;
const port = PORT || 4001;

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/", versionRoutes);
app.use("/user", userRoutes);
app.use("/store", storeRoutes);
app.use("/purchase", purchaseRoute);
app.use("/product", productRoute);
//app.use("/basic", basicListRoute);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.${ID_DB}.mongodb.net/${DB}`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err: any) => console.error(err));

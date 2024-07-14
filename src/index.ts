import express from "express";
const cors = require('cors');
import mongoose from "mongoose";
import bodyParser from "body-parser";
import purchaseRoute from "./routes/purchaseRoutes";
import productRoute from "./routes/productRoutes";
import basicListRoute from "./routes/basicListRoutes";
import storeRoutes from "./routes/storeRoutes";
import userRoutes from "./routes/userRoutes";
import versionRoutes from "./routes/versionRoutes";
require("dotenv").config();

const app = express();
const USER = process.env.DB_USER;
const ID_DB = process.env.ID_DB;
const PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DB;
const port = process.env.PORT || 4001;
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
    `mongodb+srv://${USER}:${PASSWORD}@cluster0.${ID_DB}.mongodb.net/${DB}`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

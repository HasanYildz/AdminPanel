import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";


// data import 

import User from "./models/User.js";
import {dataUser} from "./data/index.js";



//configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP 
const PORT = process.env.PORT || 9000;
const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
    console.error("MONGO_URL is not defined in the environment variables.");
    process.exit(1);
}

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));


        // Only add it one time
        // User.insertMany(dataUser);
    })
    .catch((error) => {
        console.error(`Failed to connect to MongoDB: ${error}`);
        process.exit(1);
    });
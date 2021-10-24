import express from "express";
import passport from "passport";
import session from "express-session";
import mongodb from "./configs/database";
import apiRouter from "./routes/api";
import dotenv from "dotenv";
import passportConfig from "./configs/passport";
import { errorHandler } from "./helpers/error";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import path, { dirname } from "path";
dotenv.config();

//Initializing
const app = express();

//Connecting to DB
const db = mongodb();

//Middle-wares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
if (process.NODE_ENV == "production") {
  console.log("Production Mode");
  app.use(compression());
  app.use(helmet());
  app.use(cors());
} else {
  console.log("Development Mode");
}
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

//Routing
if (process.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "/../../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/../../client/build", "index.html"));
  });
} else {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}
app.use("/api", apiRouter);

app.use(errorHandler);

//Activating
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Express application is listening on port ${port}`);
});

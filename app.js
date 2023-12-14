import express from 'express'
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import ReviewRoutes from "./reviews/routes.js";
import session from 'express-session';
import "dotenv/config";
import ReviewsRoutes from './reviews/routes.js';


mongoose.connect("mongodb://127.0.0.1:27017/cinemate");
const app = express();
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
      origin: process.env.FRONTEND_URL
    })
   );

   const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
ReviewsRoutes(app);
app.listen(process.env.PORT || 4000);





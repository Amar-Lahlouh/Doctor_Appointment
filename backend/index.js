import express from "express";
//import cookieParser from "cookie-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import DoctorRouter from "./routes/doctors.js";
import ReviewRouter from "./routes/review.js";
import ImageKitRouter from "./routes/imagekit.js";
import bookingRouter from "./routes/booking.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
//Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected");
  } catch (err) {
    console.log("Mongodb database is connection failed", err);
  }
};
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    credentials: true, // if you need cookies/auth
  })
);

app.use("/imagekit/auth", ImageKitRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/doctors", DoctorRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/bookings", bookingRouter);
app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});

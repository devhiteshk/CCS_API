import express from "express";
import cors from "cors";
import searchRoute from "./routes/search.js";
// import createDBrouter from "./routes/createdb.js";

import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 Minutes
  limit: 15, // Limit each IP to 10 requests per 15 minutes
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

app.use(express.json());
app.use(cors());

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Welcome to the Country City State API.",
    howToUse:
      "Please use /api/v1/search-db?search='yourSearchQuery'?limit='yourlimit'?offSet='youroffset' to search the database",
  });
});

// DB created on MONDAY 18th September 2023
// app.use("/create-csc-db", createDBrouter);

app.use("/api/v1", searchRoute);

export default app;

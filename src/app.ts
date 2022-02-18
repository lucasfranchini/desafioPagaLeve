import "@/setup";

import express from "express";
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

export async function init() {
  await mongoose.connect(process.env.DATABASE_URL, {
    authSource: "admin",
  });
}

export default app;

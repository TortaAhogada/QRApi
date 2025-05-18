import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import qrRoutes from "./qr.controller.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credential: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(qrRoutes);

app.listen(process.env.PORT || 3000);

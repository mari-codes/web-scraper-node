import express from "express";
import { scraperRouter } from "./routes/scraper.routes.js";

export const app = express();

app.use(express.json());
app.use(scraperRouter);

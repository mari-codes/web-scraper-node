import { Router } from "express";
import { scrapeController } from "../controllers/scraper.controller.js";

export const scraperRouter = Router();

scraperRouter.get("/scrape", scrapeController);

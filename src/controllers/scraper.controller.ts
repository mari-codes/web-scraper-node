import { Request, Response } from "express";
import { ScraperService } from "../services/scraper.service.js";

const scraperService = new ScraperService();

export async function scrapeController(req: Request, res: Response) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({
      error: "A valid URL query parameter is required.",
    });
  }

  try {
    const product = await scraperService.scrape(url);

    if (!product.title && !product.price) {
      return res.status(404).json({
        error: "Product data not found on the page.",
      });
    }

    return res.status(200).json(product);
  } catch (error: any) {
    console.error("Scraping error:", error?.message || error);

    if (error?.response) {
      return res.status(502).json({
        error: "Failed to fetch external page.",
      });
    }

    return res.status(500).json({
      error: "Internal server error while scraping.",
    });
  }
}

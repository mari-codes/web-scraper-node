import axios from "axios";
import * as cheerio from "cheerio";
import { Product } from "../types/product.type.js";

export class ScraperService {
  async fetchHtml(url: string): Promise<string> {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    return response.data;
  }

  extractTitle($: cheerio.CheerioAPI): string | null {
    const title = $("h1").first().text().trim();
    return title || null;
  }

  extractPrice(html: string): string | null {
    const match = html.match(/"saleInCents":\s*(\d+)/);

    if (!match) {
      return null;
    }

    const priceInCents = Number(match[1]);

    if (Number.isNaN(priceInCents)) {
      return null;
    }

    return `R$ ${(priceInCents / 100).toFixed(2).replace(".", ",")}`;
  }

  extractImage(html: string, $: cheerio.CheerioAPI): string | null {
    const structuredDataMatch = html.match(/"image":\[(.*?)\]/s);

    if (structuredDataMatch) {
      const firstImageMatch = structuredDataMatch[1].match(/"([^"]+)"/);

      if (firstImageMatch) {
        return firstImageMatch[1];
      }
    }

    const imageFromMeta =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content");

    return imageFromMeta || null;
  }

  extractDescription($: cheerio.CheerioAPI): string | null {
    const description = $("p.features--description")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    if (description.length > 30) {
      return description;
    }

    const longParagraph = $("p")
      .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
      .get()
      .find((text) => text.length > 100);

    if (longParagraph) {
      return longParagraph;
    }

    return (
      $('meta[name="description"]')
        .attr("content")
        ?.replace(/\s+/g, " ")
        .trim() || null
    );
  }

  async scrape(url: string): Promise<Product> {
    const html = await this.fetchHtml(url);
    const $ = cheerio.load(html);

    return {
      title: this.extractTitle($),
      price: this.extractPrice(html),
      image: this.extractImage(html, $),
      description: this.extractDescription($),
    };
  }
}

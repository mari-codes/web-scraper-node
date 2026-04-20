# Web Scraper - Netshoes

## Read this in other languages

- [Português (Brasil)](./docs/README.pt-BR.md)

Web scraper built to extract product data from Netshoes.

This service exposes a simple HTTP endpoint that fetches a product page, parses the HTML and extracts key information such as title, price, image and description.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js + Express** | API server |
| **TypeScript** | Application logic and type safety |
| **Axios** | HTTP requests |
| **Cheerio** | HTML parsing |
| **Docker** | Containerized environment (optional) |

---

## Features

- Fetches HTML from a Netshoes product page
- Extracts product title from `<h1>`
- Extracts price from structured data (`saleInCents`)
- Extracts image from structured product data with fallback
- Extracts description from product section (`features--description`)
- Fallback strategies when data is not found

---

## API Endpoint

```http
GET /scrape?url={product_url}
```

### Example

```http
GET /scrape?url=https://www.netshoes.com.br/p/camisa-brasil-nike-i-202627-torcedora-pro-feminina-amarelo+verde-SGL-051U-046
```

http://localhost:3000/scrape?url=https://www.netshoes.com.br/p/camisa-brasil-nike-i-202627-torcedora-pro-feminina-amarelo+verde-SGL-051U-046

---

## Development

Clone the repository:

```bash
git clone https://github.com/mari-codes/web-scraper-node.git
cd web-scraper-node
```

Install dependencies:

```bash
npm install
```
Run the development server:

```bash
npm run dev
```
The server will run at:

http://localhost:3000

---

## Build and Run (Production)

```bash
npm run build
npm start
```
---

## Docker (Optional)

Build image:

```bash
docker build -t web-scraper-node .
```

Run container:

```bash
docker run -p 3001:3000 web-scraper-node
```

Access via:

http://localhost:3001

> The container runs on port 3000 internally. If this port is already in use locally, it can be mapped to another port (e.g. 3001).

---

## Results

Example execution results, including API output and screenshots, can be found here:

[docs/results.md](./docs/results.md)

---

## Notes

- Data is extracted directly from page content whenever possible
- Meta tags are used only as fallback
- The scraping logic is exposed via an HTTP endpoint to make testing and integration easier
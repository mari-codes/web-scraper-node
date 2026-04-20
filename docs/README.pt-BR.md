# Web Scraper - Netshoes

## Leia em outros idiomas

- [English](../README.md)

Web scraper desenvolvido para extrair dados de produtos do site Netshoes.

Este serviço expõe um endpoint HTTP simples que realiza a requisição de uma página de produto, interpreta o HTML e extrai informações como título, preço, imagem e descrição.

---

## Tecnologias

| Tecnologia | Finalidade |
|---|---|
| **Node.js + Express** | Servidor da API |
| **TypeScript** | Lógica da aplicação e tipagem |
| **Axios** | Requisições HTTP |
| **Cheerio** | Parsing de HTML |
| **Docker** | Ambiente containerizado (opcional) |

---

## Funcionalidades

- Realiza requisição da página de produto da Netshoes
- Extrai o título do produto a partir da tag `<h1>`
- Extrai o preço a partir de dados estruturados (`saleInCents`)
- Extrai a imagem a partir de dados estruturados com fallback
- Extrai a descrição da seção do produto (`features--description`)
- Utiliza estratégias de fallback quando necessário

---

## Endpoint da API

```http
GET /scrape?url={product_url}
```

### Exemplo

```http
GET /scrape?url=https://www.netshoes.com.br/p/camisa-brasil-nike-i-202627-torcedora-pro-feminina-amarelo+verde-SGL-051U-046
```

http://localhost:3000/scrape?url=https://www.netshoes.com.br/p/camisa-brasil-nike-i-202627-torcedora-pro-feminina-amarelo+verde-SGL-051U-046

---

## Desenvolvimento

Clone o repositório:

```bash
git clone https://github.com/mari-codes/web-scraper-node.git
cd web-scraper-node
```

Instalar dependências

```bash
npm install
```
Rodar o servidor em desenvolvimento:

```bash
npm run dev
```
A aplicação será executada em:

http://localhost:3000

---

## Build e Execução (Produção)

```bash
npm run build
npm start
```
---

## Docker (Opcional)

Build da imagem:

```bash
docker build -t web-scraper-node .
```

Rodar o container:

```bash
docker run -p 3001:3000 web-scraper-node
```

Acesse via:

http://localhost:3001

> O container roda internamente na porta 3000. Caso essa porta já esteja em uso na sua máquina, você pode mapear para outra (ex: 3001).

---

## Results

Os resultados da execução, incluindo exemplos de saída da API e prints, estão disponíveis em:

[docs/results.md](./results.md)

---

## Observações

- Os dados são extraídos diretamente do conteúdo da página sempre que possível
- Meta tags são utilizadas apenas como fallback
- A lógica de scraping foi exposta por meio de um endpoint HTTP para facilitar testes e integração
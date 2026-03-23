# Image Editor

A full-stack image editing application with AI capabilities, authentication, and subscription payments. Built with Next.js and Fabric.js for canvas manipulation.

🔗 **[Live Demo](https://editor-dvr.vercel.app/editor/1)**

> ⚠️ Some features are disabled on the live demo: image upload is turned off, authentication has been removed, and the database is no longer active. The AI generation API key has also been revoked to prevent abuse. All features are fully implemented and can be enabled locally.

---

## Features

**Editor**
- Canvas-based image editor powered by **Fabric.js**
- **Shapes** — rectangles, circles, and more with configurable fill, stroke color, stroke width, stroke type, and opacity
- **Text** — text boxes, headings, subheadings, and paragraphs with a full font picker (20+ fonts)
- **Images** — upload and place images onto the canvas *(disabled on demo)*
- **Drawing mode** — freehand brush with configurable width and color
- **Filters** — 20+ image filters including polaroid, sepia, kodachrome, greyscale, brownie, vintage, technicolor, pixelate, invert, blur, sharpen, emboss, vibrance, hue rotation, saturation, gamma, and more
- **Canvas settings** — configurable width, height, and background color

**AI**
- **AI image generation** — generate images from text prompts via Replicate API *(disabled on demo)*
- **AI background removal** — remove image backgrounds using Replicate *(disabled on demo)*

**Export**
- Export projects as **PNG, SVG, JPG, and JSON**

**Auth**
- Authentication via **NextAuth v5 (Auth.js)** *(removed on demo)*

**Persistence**
- Projects saved to **PostgreSQL (Neon)** via **Drizzle ORM**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Canvas | Fabric.js |
| Database | PostgreSQL (Neon) |
| ORM | Drizzle ORM |
| Auth | NextAuth v5 (Auth.js) |
| AI | Replicate API |
| UI | shadcn/ui, Tailwind CSS |
| Language | TypeScript |

---

## Getting Started

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Fill in:
# DATABASE_URL        - Neon PostgreSQL connection string
# NEXTAUTH_SECRET     - random secret for Auth.js
# REPLICATE_API_KEY   - Replicate API key for AI features

# Run database migrations
bunx drizzle-kit migrate

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

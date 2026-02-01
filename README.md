# WordPuzzle - Free Word Search Puzzles

A modern, SEO-friendly word search puzzle website built with Next.js 14, TypeScript, and Tailwind CSS. Optimized for 100% PageSpeed scores.

## Features

- 🎮 **Interactive Word Search Puzzles** - Click and drag to find words
- 🔧 **Puzzle Maker** - Create custom puzzles with your own words
- 🎯 **Multiple Categories** - 25+ categories with 1000+ puzzles
- 🖨️ **Print Support** - Optimized print styles for offline play
- 🎲 **Hangman Game** - Classic word guessing game
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **100% PageSpeed** - Optimized for Core Web Vitals
- 🔍 **SEO Optimized** - Structured data, sitemap, meta tags

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Inter (Google Fonts with `next/font`)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or download the project

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your site URL

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cat/[slug]/        # Category pages
│   ├── puzzle/[id]/[slug]/ # Puzzle game pages
│   ├── maker/             # Puzzle maker tool
│   ├── hangman/           # Hangman game
│   ├── printable/         # Printable puzzles
│   ├── search/            # Search functionality
│   └── ...
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PuzzleCard.tsx
│   ├── WordSearchGrid.tsx
│   └── ...
├── data/                  # Static data
│   ├── categories.ts
│   └── puzzles.ts
├── lib/                   # Utilities
│   ├── puzzle-generator.ts
│   └── utils.ts
└── types/                 # TypeScript types
    └── index.ts
```

## SEO Features

- **Meta Tags:** Comprehensive Open Graph and Twitter Cards
- **Structured Data:** JSON-LD for games, pages, and breadcrumbs
- **Sitemap:** Auto-generated XML sitemap
- **Robots.txt:** Proper crawling directives
- **Canonical URLs:** Prevent duplicate content
- **Semantic HTML:** Proper heading hierarchy and ARIA labels

## PageSpeed Optimizations

- **Font Loading:** Optimized with `next/font`
- **Image Optimization:** Next.js Image component ready
- **Code Splitting:** Automatic with App Router
- **CSS:** Tailwind CSS with PurgeCSS
- **Caching:** Static generation where possible
- **Compression:** Gzip/Brotli enabled

## Adding More Puzzles

Edit `src/data/puzzles.ts` to add new puzzles:

```typescript
{
  id: 'unique-id',
  title: 'Puzzle Title',
  slug: 'puzzle-title',
  categoryId: '1',
  categoryName: 'Category Name',
  categorySlug: 'category-slug',
  words: ['WORD1', 'WORD2', 'WORD3'],
  difficulty: 'easy' | 'medium' | 'hard',
  gridSize: 15,
  description: 'Optional description',
  createdAt: '2024-01-01',
}
```

## Adding Categories

Edit `src/data/categories.ts` to add new categories.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- AWS Amplify
- Docker

## License

MIT License - feel free to use for personal or commercial projects.

## Contributing

Contributions are welcome! Please open an issue or pull request.

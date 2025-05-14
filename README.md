# Real Estate NL Platform

Een moderne vastgoed website gebouwd met Next.js, Tailwind CSS, en Supabase.

## Features

- Modern en responsief design
- Uitgebreide woningzoeker
- Gedetailleerde woningpagina's
- Contact formulier
- Supabase integratie voor data opslag

## Technische Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- React Icons

## Installatie

1. Clone de repository:
```bash
git clone [repository-url]
cd real-estate-platform
```

2. Installeer dependencies:
```bash
npm install
```

3. Configureer environment variables:
Maak een `.env.local` bestand aan met de volgende variabelen:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start de development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Database Schema

De Supabase database bevat de volgende tabellen:

### Properties
- id: uuid (primary key)
- title: string
- description: text
- price: number
- address: string
- city: string
- postal_code: string
- square_meters: number
- bedrooms: number
- bathrooms: number
- features: string[]
- images: string[]
- property_type: enum (apartment, house, villa, penthouse)
- status: enum (for_sale, sold, reserved)
- created_at: timestamp
- updated_at: timestamp

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

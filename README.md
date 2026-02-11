# Shift Close Toolkit

End-of-shift helper app for retail closing: quickly totals a cash drawer by entering bill/coin counts (optionally includes unopened coin rolls), shows drawer total vs target (ex: $200), and exports/records results for a clean closeout workflow.

## Features

- **Denomination Inputs**: Support for all common coins (Penny, Nickel, Dime, Quarter) and bills ($1, $5, $10, $20, $50, $100)
- **Coin Rolls**: Optional toggleable section for unopened coin rolls
- **Live Calculations**: Real-time subtotals and grand total with over/short comparison
- **Data Persistence**: Automatically saves your work using localStorage
- **Mobile-Friendly**: Responsive design optimized for mobile devices
- **Offline-Capable**: Works without an internet connection

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **localStorage** - Data persistence

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

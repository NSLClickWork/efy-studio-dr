# EFY Studio — Boutique Pilates Berlin

![EFY Studio](/public/images/hero.png)

A modern, premium web application built for **EFY Studio**, a boutique Pilates studio located in Lichterfelde West, Berlin. The site features a sophisticated design system, smooth animations, and a seamless bilingual (German/English) user experience.

## ✨ Features

- **Premium Design Aesthetics**: Custom UI with elegant typography, muted color palettes, and glassmorphism elements.
- **Bilingual Support**: Built-in Context-based language switcher (DE/EN) using `localStorage` for a seamless, hydration-safe experience.
- **Dynamic Image Galleries**: Interactive carousels powered by Embla Carousel.
- **Smooth Animations**: Scroll reveal effects using Framer Motion and intersection observers.
- **Responsive Layouts**: Fully responsive grids adapting perfectly to desktop, tablet, and mobile viewing.
- **SEO Optimized**: Fully integrated Schema.org structured data, metadata, and semantic HTML structure.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** Vanilla CSS / CSS Modules
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com/)

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NSLClickWork/efy-studio-dr.git
   cd efy-studio-dr
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) (or whichever port Next.js assigns, e.g., 3001) in your browser.

## 🚂 Deployment (Railway)

This project is configured to be deployed effortlessly on **[Railway](https://railway.app/)**.

### Steps to Deploy:
1. Log in to your Railway dashboard.
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select this repository (`NSLClickWork/efy-studio-dr`).
4. Railway will automatically detect the Next.js environment and configure the build settings.
5. *(Optional)* Add any required Environment Variables in the Variables tab.
6. Click **Deploy**. Railway will build the production bundle (`npm run build`) and start the server (`npm start`).

Once deployed, Railway will generate a live URL where your Next.js application will be hosted securely with SSL.

---

*Designed and developed for EFY Studio Berlin.*

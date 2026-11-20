# Prathamesh Gongle — Portfolio Website

This repository contains the source code for my personal portfolio website, built with Next.js, React, Three.js (React Three Fiber), and Framer Motion.  
It showcases my projects, skills, and includes a contact form with a live backend.

## ✨ Features
- Dark/Light Theme Toggle (custom switch with icons)  
- Modern UI/UX with smooth animations using Framer Motion  
- Responsive Design (optimized for desktop & mobile)  
- Projects Section with hover effects & external links (GitHub, Behance, etc.)  
- About Section with intro & background  
- Contact Form with backend (Next.js API + Resend)  
- Deployed on Vercel for fast, serverless hosting  
- Next.js API Routes + Resend for email functionality  
- Custom theming with CSS Modules  

## 🚀 Deployment
Deployed on [Vercel](https://prathameshgongle.vercel.app/).  

## 🛠️ Setup
1. Clone the repo  
   ```bash
   git clone https://github.com/PrathameshCoder/portfolio-website.git
   cd portfolio-website
   pnpm install
   pnpm dev
   ```

## Version 2

- **Motion**: a counting preloader, Lenis smooth scrolling, headings whose letters rise out of a mask, and an accent colour that cross-fades as each chapter reaches the middle of the screen (`src/lib/sectionStore.js`, colours in `src/app/globals.css`).
- **Siemens chapter** (`src/components/v2/SiemensChapter.js`): the five-layer "controlled openness" recommendation as a 3D stack, the platform benchmark and the business model shift, from the final presentation.
- **Cranberry chapter** (`src/components/v2/CranberryChapter.js`): a small working copy of the dashboard (role switcher, search, user admin with a 403 for employees), the permission table and the sign-in path.
- **AI work**: poster cards that open case studies as a sheet over the page. Links like `/#documind` open one directly.
- All copy lives in `src/data/content.js`.

The previous version is kept in `_backups/v1-sunset/` (never committed).

The contact form needs `RESEND_API_KEY`, `RESEND_FROM` and `RESEND_TO` in `.env.local`.

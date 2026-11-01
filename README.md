# ResumeLens 🔍

**Intelligent AI-Powered Resume Analysis Platform**  
*Your career insights, simplified.*

---

## 🌟 Overview

**ResumeLens** is a modern career-tech dashboard engineered to help students and job seekers evaluate, score, and tailor their resumes for applicant tracking systems (ATS). Designed with the aesthetic and functional rigor of a high-end corporate SaaS product (Stripe, Linear, Workday), ResumeLens eliminates "AI slop" in favor of clean typography, transparent rule-based scoring criteria, and actionable feedback.

---

## ✨ Key Features

- **Floating Summary Metrics**: Real-time evaluation cards showcasing **Resume Score**, **ATS Compatibility**, **Skills Detected**, and **Job Match Relevance**.
- **Resume Health Visualization**: Clean circular SVG gauge with sub-score breakdowns across:
  - *Content Quality*
  - *Skills & Keywords*
  - *Formatting*
  - *Impact & Quantified Outcomes*
- **Actionable AI Rewrites**: Contextual bullet rewrites displaying exact **Before** vs **Optimized After** formulations with quantifiable metrics.
- **Score History Line Chart**: Iterative version progression tracking improvements across drafts.
- **Dynamic Job Match Engine**: Paste any target job description to instantly compare matched skills against missing keywords with copy-to-resume shortcuts.
- **Recently Analyzed Resumes**: Multi-resume switcher with status badges (`Needs Review`, `Strong`, `Improve`, `Excellent`), report downloads, and deletion controls.
- **Private & Local Text Extraction**: Supports `.pdf`, `.txt`, `.docx`, and `.md` using client-side PDF parsing (`pdfjs-dist`).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 5.8
- **Styling**: Tailwind CSS v4 (Inter font stack)
- **Icons**: Lucide React
- **Text & PDF Parsing**: `pdfjs-dist` (Client-side native extraction)
- **Tooling & Build**: Vite 8, Oxlint

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v24)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/nebula8002-lab/resumelens.git
cd resumelens

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Typecheck & build
npm run build

# Preview build locally
npm run preview
```

---

## 🔒 Privacy & Architecture

ResumeLens performs all document text parsing, tokenization, and ATS scoring directly in the browser. No personal contact details or confidential resume data leave your machine.

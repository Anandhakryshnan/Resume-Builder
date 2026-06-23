# 🚀 Antigravity Resume Builder

![Resume Builder Banner](https://img.shields.io/badge/Status-Live_on_Vercel-success?style=for-the-badge) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

A blazingly fast, modern, privacy-first Resume Builder designed to help professionals create beautiful resumes instantly. Built with React 19, Vite, and Tailwind CSS. 

**🔴 Live Demo:** [https://resume-builder-krysh.vercel.app/](https://resume-builder-krysh.vercel.app/)

---

## ✨ Key Features

- **Privacy-First (No Backend):** All your personal data is saved securely in your browser's local storage. No servers, no tracking, no signups required.
- **7 Professional Templates:** Choose from Classic, Modern, Minimalist, Centered, Compact, Timeline, or Creative Duo to match your industry and style.
- **Full Drag & Drop Reordering:** 
  - **Macro Layout:** Drag and drop massive section blocks (e.g., move "Skills" above "Education") and watch your live resume adapt its layout.
  - **Micro Sorting:** Drag and drop individual items within sections (like sorting your job history or project list).
- **Real-Time Preview:** A live, side-by-side A4 canvas that updates the exact millisecond you type.
- **Advanced Print Engine:** Built with a bulletproof custom CSS architecture. Download your resume as a pixel-perfect PDF that properly paginates across multiple pages without cutting off text or backgrounds. 
- **Dynamic Glassmorphism UI:** Features a premium, blur-heavy aesthetic in the editor.
- **Light & Dark Mode:** An intuitive, fully responsive theme toggle that adapts the app's UI without ever modifying your actual pure-white resume canvas.

## 🛠 Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4 + Vanilla CSS Variables (Theme System)
- **Drag & Drop:** `@hello-pangea/dnd`
- **Icons:** Lucide React

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/Anandhakryshnan/Resume-Builder.git
   ```
2. Navigate into the directory:
   ```bash
   cd Resume-Builder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
src/
├── components/
│   ├── FormEditor/       # Editor accordions and drag-and-drop form inputs
│   └── ResumePreview/    # A4 canvas and template rendering logic
├── context/
│   └── ResumeContext.tsx # Global state management and localStorage sync
├── types/
│   └── resume.ts         # TypeScript interfaces for resume data
└── App.tsx               # Main layout and Dark/Light theme toggle
```

## 📄 License
© 2026 Anandha Krishnan. All rights reserved.

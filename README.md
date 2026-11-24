# Rana Qasim — Personal Portfolio Website

A modern, high-performance personal portfolio website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** for **Rana Qasim** (Frontend Web Developer).

---

## 👨‍💻 Developer Profile

* **Name:** Rana Qasim
* **Role:** Frontend Web Developer
* **Email:** [ranaqasimali555@gmail.com](mailto:ranaqasimali555@gmail.com)
* **Phone / WhatsApp:** [+923257525617](tel:+923257525617)
* **Location:** Pakistan

---

## ✨ Features & Sections

1. **Responsive Sticky Navigation:**
   * Dynamic glassmorphism backdrop blur (`16px`) with elevation on scroll.
   * Animated 3-line hamburger menu that transforms into a symmetrical 'X'.
   * Slide-out mobile navigation drawer with backdrop dimming overlay.
   * Full accessibility: keyboard trap, <kbd>Esc</kbd> key auto-close, and overlay click dismiss.

2. **Hero Section:**
   * Two-column desktop layout with entrance animations (`fadeInUp` & `fadeInRight`).
   * **Live Animated Typing Text** cycling smoothly through:
     * *Frontend Web Developer*
     * *Creative Web Designer*
     * *JavaScript Developer*
   * Real profile photo framed with a rounded squircle border and ambient blue glow.
   * Automated initials fallback if the image asset is unavailable.
   * Live availability badge with an animated pulsing status dot.
   * **"View My Work"** and **"Download CV"** buttons (with automatic asset verification).

3. **About Me:**
   * Professional philosophy narrative emphasizing clean code and accessible UI architecture.
   * Interactive contact cards (Location, Direct Email, Phone/WhatsApp, Specialization).
   * **"Contact Me"** button triggering an email draft.

4. **Skills Showcase:**
   * 6 Technology cards: **HTML5**, **CSS3**, **JavaScript**, **Responsive Web Design**, **UI/UX Design**, **Git & GitHub**.
   * Custom inline SVG icons and contextual tech pills.
   * **Zero invented percentages or fake progress bars.**
   * Micro-interactions: 3D hover elevation, accent border transitions, and icon rotation.

5. **Services:**
   * 4 Core service offerings:
     * **Frontend Development**
     * **Responsive Website Design**
     * **Landing Page Development**
     * **Website Redesign**
   * Detailed feature checkmarks and animated top gradient accent borders.

6. **Experience — Learning Journey Timeline:**
   * Modern vertical left-stem timeline with glowing pulse dots.
   * 4 Honest learning milestones from foundational HTML5/CSS3 to interactive ES6+ JavaScript, design systems, and independent portfolio applications.

7. **Advanced Project Showcase:**
   * 4 Sample project cards with floating project numbers (`01`–`04`) and transparent `Sample Project` badges.
   * Interactive **3D Card Perspective Tilt** following mouse movement.
   * Mockup graphics with smooth `scale(1.08)` image zoom on hover.
   * Glassmorphism overlay with **Live Demo** and **Source Code** buttons.

8. **Interactive Contact Section:**
   * One-click **"Copy Email Address"** button with direct clipboard integration and visual feedback.
   * Direct clickable phone and email links.
   * Social profile placeholder buttons for GitHub and LinkedIn.
   * Modern **Floating Label Contact Form** with animated focus rings, validation checks, and client-side error shakes.
   * Transparent mailto fallback with clear instructions for backend form service integration.

9. **Performance, SEO & Accessibility (Step 06):**
   * Page preloader entrance animation.
   * Smooth Back-to-top button appearing after 350px of scroll.
   * Material-style button click ripple effect.
   * Optional subtle desktop custom cursor.
   * Full `@media (prefers-reduced-motion: reduce)` compliance.
   * Comprehensive SEO meta tags, Open Graph, Twitter Cards, SVG Favicon, `robots.txt`, and `sitemap.xml`.

---

## 🛠️ Technology Stack

* **Markup:** Semantic HTML5 (W3C standard landmarks, ARIA attributes)
* **Styling:** Modern CSS3 (Custom properties/variables, Flexbox, CSS Grid, 3D Transforms, Keyframe Animations)
* **Scripting:** Vanilla JavaScript (ES6+, DOM Manipulation, IntersectionObserver, Clipboard API, Fetch API)
* **Dependencies:** None (No Bootstrap, Tailwind, jQuery, or React)

---

## 📁 Project Structure

```
ports2/
├── assets/
│   └── images/
│       └── profile.png          # Real profile picture (optimized)
├── css/
│   └── style.css                # Consolidated design system, components & media queries
├── js/
│   └── main.js                  # Vanilla JS interactions, typing effect, tilt, validation
├── favicon.svg                  # Vector SVG brand favicon
├── index.html                   # Semantic HTML5 markup
├── README.md                    # Project documentation & deployment guide
├── robots.txt                   # Search engine crawler instructions
├── sitemap.xml                  # XML search engine sitemap
└── WhatsApp Image...            # Original image asset preserved
```

---

## 🚀 Local Development Setup

No build tools, bundlers, or package managers are required!

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open the website directly in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Running through a local web server allows all browser security features (such as `fetch` HEAD checks for `assets/cv.pdf`) to operate smoothly:

Using Python 3:
```bash
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

Using VS Code Live Server:
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 Deployment Instructions

### Method 1: Deploy to GitHub Pages (Free & Recommended)

1. **Create a GitHub Repository:**
   * Go to [GitHub](https://github.com/) and create a new repository (e.g., `portfolio` or `ranaqasim.github.io`).
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   * Go to repository **Settings** → **Pages**.
   * Under **Branch**, select `main` and root folder `/ (root)`.
   * Click **Save**.
   * Your site will be live at `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/` within minutes!

---

### Method 2: Deploy to Netlify (Drag & Drop)

1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `ports2` folder directly into the browser window.
3. Netlify will deploy the site instantly and provide a live URL (e.g., `https://rana-qasim.netlify.app`).
4. (Optional) Connect a custom domain in **Domain management**.

---

## 📝 Customization Guide for Rana Qasim

* **Adding Real Project Links:**
  * In `index.html`, locate `<section id="projects">`.
  * Replace the `href="#"` attributes on the Live Demo and Source Code buttons with your real deployment URLs and GitHub repositories.
* **Adding your CV / Resume:**
  * Place your PDF resume in `assets/` and name it `cv.pdf` (`assets/cv.pdf`).
  * The **"Download CV"** button will immediately detect it and enable direct downloads.
* **Connecting Contact Form to an Automated Email Service:**
  * To receive emails directly in your inbox without using `mailto:`, sign up for a free service like [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/).
  * Update the `<form id="contact-form">` action attribute with your endpoint URL:
    ```html
    <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    ```

---

## 📄 License & Attribution

Designed and developed for **Rana Qasim**.
Copyright © 2026 Rana Qasim. All rights reserved.

# Akash Pandhre — Developer & Academic Portfolio

A modern, responsive, and high-performance personal developer portfolio built with semantic **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed with a futuristic dark theme, glassmorphism aesthetics, dynamic data rendering, and full mobile optimization.

---

## 🚀 Live Demo & Links

- **GitHub Profile**: [dev-akashpandhre](https://github.com/dev-akashpandhre)
- **LinkedIn**: [Akash Pandhre](https://www.linkedin.com/in/akash-pandhre-032a87420/)
- **Contact Email**: [akashpandhre84@gmail.com](mailto:akashpandhre84@gmail.com)

---

## ✨ Features

- **Dark / Light Mode Switcher**: Supports seamless theme toggling with `localStorage` persistence and OS-level color scheme detection.
- **Glassmorphic UI Design**: Blue and purple accent palettes, sleek gradient backdrops, frosted glass cards, and soft ambient glows.
- **Interactive Particle Network**: HTML5 Canvas particle system with cursor deflection and dynamic distance-based node connections.
- **Dynamic Typing Effect**: Animated typewriter showcasing key technical roles in the Hero section.
- **Modular Data Architecture**: Dynamic content loading for projects, skills, and certifications via structured JSON files with built-in offline/`file://` fallbacks.
- **Live GitHub REST API Integration**: Real-time retrieval of public statistics and latest repositories for `@dev-akashpandhre`.
- **Responsive Layout**: Fluid UI optimized across 4K displays, laptops, tablets, and small mobile viewports (down to 320px).
- **Accessible & SEO Optimized**: Semantic HTML5 markup, ARIA roles, Open Graph metadata, Twitter Cards, `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Tech Stack

- **Core Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling Architecture**: Custom CSS Variables, Glassmorphism, CSS Grid, Flexbox, Keyframe Animations
- **Icons & Typography**: Font Awesome 6, Google Fonts (*Plus Jakarta Sans*, *JetBrains Mono*)
- **Programming & Data Tools**: Python, NumPy, Pandas, Matplotlib, Seaborn, SQL, Flask, Git, VS Code

---

## 📁 Project Structure

```text
Akash-Portfolio/
│
├── index.html                  # Homepage (All Core Sections)
├── README.md                   # Project Documentation
├── LICENSE                     # MIT License
├── sitemap.xml                 # Search Engine Sitemap
├── robots.txt                  # Web Crawler Directives
│
├── assets/
│   ├── images/
│   │   ├── profile.png         # Main Profile Portrait
│   │   ├── hero-bg.jpg         # Hero Background Graphic
│   │   ├── about.png           # About Section Illustration
│   │   ├── logo.png            # Brand Logo
│   │   ├── favicon.png         # Browser Tab Icon
│   │   ├── certificates/       # Certificate Previews
│   │   │   └── certificate-placeholder.png
│   │   └── projects/           # Project Thumbnails
│   │       ├── student-analysis.png
│   │       ├── sql-assignment.png
│   │       └── github-project.png
│   │
│   ├── resume/
│   │   └── resume.pdf          # Official Resume PDF
│   └── icons/                  # Custom Vector Icons
│
├── css/
│   ├── variables.css           # Color Palettes & Design Tokens
│   ├── style.css               # Core Styles & Layouts
│   ├── responsive.css          # Media Queries (Mobile to 4K)
│   ├── animations.css          # Keyframe Animations & Transitions
│   └── scrollbar.css           # Custom Scrollbar Styles
│
├── js/
│   ├── script.js               # Main Data Fetcher & DOM Orchestrator
│   ├── typing.js               # Hero Typewriter Animation
│   ├── darkmode.js             # Theme Switching & Persistence
│   ├── navbar.js               # Mobile Menu & ScrollSpy
│   ├── scroll.js               # Scroll Progress & Back-to-Top
│   ├── github.js               # GitHub REST API Integration
│   ├── particles.js            # HTML5 Canvas Particle System
│   ├── contact.js              # Form Validation & Dispatch
│   └── loader.js               # Preloader Controller
│
├── data/
│   ├── projects.json           # Project Portfolio Dataset
│   ├── skills.json             # Technical Skill Matrix
│   └── certificates.json       # Certification Records
│
├── pages/
│   ├── projects.html           # Full Projects Catalog
│   ├── certificates.html       # Full Certifications Directory
│   └── contact.html            # Dedicated Contact Page
│
└── libraries/                  # Optional Vendor Libraries
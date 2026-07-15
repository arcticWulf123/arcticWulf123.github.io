# Jade Roland Eduard — Portfolio Website

A single-page personal portfolio built with plain HTML, CSS, and JavaScript — no framework, no build step. All content (bio, projects, skills, education, socials) is driven by one JSON file, so updates don't require touching any code.

---

## Folder layout

```
portfolio-static/
├── html/
│   └── index.html         ← entry point (open this in the browser)
├── css/
│   └── styles.css         ← design system, breakpoints, animations
├── js/
│   └── script.js          ← loads JSON, renders DOM, typing effect, menu
├── data/
│   └── portfolio.json     ← single source of truth for ALL content
└── assets/                ← icons, graphics, screenshots
```

---

## How to run it

Because `script.js` uses `fetch()` to load `data/portfolio.json`, browsers block that request over `file://`. Run a local server from the `portfolio-static/` folder instead:

**Python:**
```bash
cd portfolio-static
python3 -m http.server 8000
# then open http://localhost:8000/html/index.html
```

**Node:**
```bash
cd portfolio-static
npx serve .
# then open the URL it prints
```

**VS Code:** install the "Live Server" extension, right-click `html/index.html` → "Open with Live Server".
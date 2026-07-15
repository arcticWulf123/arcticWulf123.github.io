# Jade Roland Eduard — Portfolio (GitHub Pages Edition)

This is the GitHub Pages–ready version of the portfolio site. Everything
lives at the repo root so you can push it to a GitHub repo and have it
online in under 5 minutes.

---

## What's in this folder

```
portfolio-github-pages/      ← this becomes the repo root
├── index.html               ← entry point (at root, as GitHub Pages expects)
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── data/
│   └── portfolio.json       ← single source of truth for ALL content
├── assets/
│   ├── favicon.svg / .png
│   ├── icons/               ← 17 SVG icons
│   ├── graphics/            ← logo, hero-graphic, og-image (SVG + PNG)
│   └── preview/             ← PNG screenshots
├── .nojekyll                ← tells GitHub Pages to skip Jekyll processing
├── .gitignore
├── LICENSE                  ← MIT
└── .github/
    └── workflows/
        └── deploy.yml       ← auto-deploys on every push to main
```

All asset paths in `index.html` and `script.js` use `./` (relative to
repo root), so the site works whether it's served at:

- `https://<username>.github.io/<repo-name>/` ← project repo (most common)
- `https://<username>.github.io/`             ← user site (repo must be named `<username>.github.io`)

---

## Deploy in 5 steps

### Step 1 — Create a new GitHub repo
Go to https://github.com/new and create a new repository.
- Name it whatever you like (e.g. `portfolio`), **or** name it
  `<your-username>.github.io` if you want the site at your root URL.
- Set it to **Public** (GitHub Pages on free accounts requires public repos).
- Don't initialize with a README (this folder already has one).

### Step 2 — Initialize git locally and push
```bash
cd portfolio-github-pages
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
In your repo on GitHub:
1. Go to **Settings → Pages**
2. Under **Build and deployment → Source**, select **GitHub Actions**
   (not "Deploy from a branch" — the workflow in `.github/workflows/deploy.yml`
   handles deployment automatically)

### Step 4 — Wait for the workflow
- Go to the **Actions** tab in your repo
- You'll see a workflow named "Deploy to GitHub Pages" running
- Wait ~30 seconds for the green checkmark ✓

### Step 5 — Visit your site
Your site is now live at:
- `https://<your-username>.github.io/<repo-name>/` (project repo), or
- `https://<your-username>.github.io/` (if repo is named `<username>.github.io`)

You'll find the exact URL in **Settings → Pages** once deployment succeeds.

---

## Updating your site

Just edit, commit, and push to `main`. The workflow re-deploys automatically.

```bash
# edit data/portfolio.json, then:
git add data/portfolio.json
git commit -m "Update bio"
git push
```

Live site updates within ~30 seconds of the push.

---

## Want a custom domain? (optional)

1. Buy a domain (e.g. `jaderolandeduard.dev`) from any registrar
2. Add a DNS record pointing to GitHub Pages:
   - **A records** (recommended): point apex domain to these IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **OR CNAME** (for subdomains like `www.jaderolandeduard.dev`):
     `<your-username>.github.io`
3. In your repo: **Settings → Pages → Custom domain** → enter your domain
4. Create a file named `CNAME` (no extension) at the repo root containing
   just your domain on one line:
   ```
   jaderolandeduard.dev
   ```
5. Check "Enforce HTTPS" in the Pages settings
6. Push the `CNAME` file and wait for DNS to propagate (5 min – 24 hr)

---

## Want a custom domain? (alternative: skip the workflow)

If you'd rather let GitHub handle deployment directly from a branch
(no Actions workflow), delete `.github/workflows/deploy.yml` and:

1. **Settings → Pages → Source: Deploy from a branch**
2. **Branch: `main` / root** (since `index.html` is at the repo root)
3. Save

This is simpler but slower (~1 min per update vs ~30s with Actions).

---

## Local development / preview

You don't need to deploy to see your changes — preview locally first:

```bash
cd portfolio-github-pages
python3 -m http.server 8000
# open http://localhost:8000
```

Or with Node:
```bash
cd portfolio-github-pages
npx serve .
```

A local server is required because `script.js` uses `fetch()` to load
`data/portfolio.json`. Opening `index.html` via `file://` won't work
(browsers block fetch from the file protocol).

---

## Customizing content

Everything visible lives in **`data/portfolio.json`**. Edit, save, push —
done. Common edits:

| Want to change…          | Edit in `portfolio.json`                          |
|--------------------------|---------------------------------------------------|
| Your name                | `owner.name`, `hero.intro`, `hero.highlightName`  |
| Typing phrases           | `typingPhrases.phrases` (array)                   |
| Hero buttons             | `hero.primaryButton`, `hero.secondaryButton`      |
| Marquee items            | `techMarquee.items` (array)                       |
| About paragraphs         | `about.paragraphs` (array)                        |
| Social links             | `about.socials[*]`, `contact.links[*]`            |
| Education info           | `education.items[0]`                              |
| Skills                   | `skills.categories[*]`                            |
| Projects                 | `projects.items[*]`                               |
| Email address            | `contact.email.label` + `contact.email.href`      |
| Theme colors             | `theme.*` and per-section color fields            |

To add a new project, append an object to `projects.items`:
```json
{
  "title": "My New Project",
  "year": "2025",
  "yearColor": "#E67E22",
  "description": "What it does and how it's built.",
  "tags": ["React", "TypeScript"],
  "codeUrl": "https://github.com/you/repo",
  "liveUrl": "https://github.com/you/repo"
}
```

---

## Why `.nojekyll`?

GitHub Pages runs files through [Jekyll](https://jekyllrb.com) by default.
Jekyll ignores any file or folder that starts with `_` or `.` (other than
special ones). The `.nojekyll` file tells GitHub Pages to serve the repo
exactly as-is, no Jekyll processing. This ensures your `assets/`,
`.github/`, and any future underscore-prefixed folders all work.

---

## Why an Actions workflow instead of "deploy from branch"?

The included `deploy.yml` does the same thing as "deploy from a branch"
but gives you:
- Faster deploys (~30s vs ~1min)
- A visible build/deploy log in the Actions tab
- Easy extensibility (add linting, tests, minification, etc. later)

If you prefer the simpler branch-based deployment, see the
"alternative: skip the workflow" section above.

---

## Troubleshooting

**Site shows 404 at the GitHub Pages URL**
- Confirm the workflow ran successfully in the Actions tab
- Confirm **Settings → Pages → Source** is set to "GitHub Actions"
- Confirm `index.html` is at the repo root (not in a subfolder)
- Wait 1–2 minutes — Pages can lag slightly behind the workflow

**CSS or JS not loading (404 in browser console)**
- All paths in `index.html` use `./` (relative). Confirm you haven't moved
  `index.html` into a subfolder — it must sit at the repo root next to
  `css/`, `js/`, `data/`, `assets/`

**`data/portfolio.json` 404**
- Same reason as above. The fetch in `script.js` uses `./data/portfolio.json`,
  which only resolves if `index.html` is at the same level as the `data/`
  folder

**Images broken on the live site but work locally**
- Check filename case — GitHub Pages is case-sensitive (unlike macOS/Windows
  locally). `Favicon.svg` ≠ `favicon.svg`
- Check the `.nojekyll` file is at the repo root (it disables Jekyll,
  which would otherwise eat files starting with `_`)

**Custom domain shows "Not Found"**
- DNS hasn't propagated yet. Wait up to 24 hours
- Verify the CNAME or A records in your registrar's DNS panel
- Confirm the `CNAME` file at repo root contains exactly your domain (no
  protocol, no path) on a single line

**Typing animation not running**
- Check `typingPhrases.phrases` in `portfolio.json` is an array with at
  least one string
- Open browser devtools console — any JS errors will print there

**Marquee not scrolling**
- `techMarquee.items` needs at least 2 items to look seamless. JS duplicates
  the list internally for the infinite-loop effect

---

## License

MIT — see [LICENSE](./LICENSE). You own everything you build on top of this.

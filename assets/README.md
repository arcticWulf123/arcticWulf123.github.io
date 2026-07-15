# Assets

Every visual asset used by the portfolio site, organized into one folder.
Most of the site's visuals are CSS-drawn (no image files needed) — this
folder collects the few SVG/PNG assets that do exist.

## Folder structure

```
assets/
├── README.md                  ← this file
├── favicon.svg                ← browser tab icon (rounded square with </>)
├── favicon.png                ← raster version (128×128) for legacy systems
│
├── icons/                     ← individual SVG icons (lucide-react style)
│   ├── menu.svg                  hamburger menu (mobile nav toggle)
│   ├── x.svg                     close icon (mobile nav toggle)
│   ├── arrow-right.svg           hero "View Projects" button arrow
│   ├── arrow-up-right.svg        contact email button arrow
│   ├── mail.svg                  email / "Get in Touch" icon
│   ├── code.svg                  "Code" button on project cards
│   ├── external-link.svg         "Live" button on project cards
│   ├── heart.svg                 footer heart icon (filled red)
│   ├── sparkles.svg              education "Currently studying" badge
│   ├── graduation-cap.svg        education card icon
│   ├── calendar.svg              education date meta
│   ├── book.svg                  education course meta
│   ├── github.svg                GitHub social link
│   ├── facebook.svg              Facebook social link
│   ├── instagram.svg             Instagram social link
│   ├── twitter.svg               Twitter icon (kept for reference, NOT used on site)
│   └── linkedin.svg              LinkedIn icon (kept for reference, NOT used on site)
│
├── graphics/                  ← larger standalone artwork (SVG + PNG pairs)
│   ├── logo.svg                  "● Jade Roland Eduard" wordmark
│   ├── logo.png                  raster version (560×64)
│   ├── hero-graphic.svg          the circular </> code icon with floating shapes
│   ├── hero-graphic.png          raster version (400×400)
│   ├── og-image.svg              1200×630 Open Graph preview for social sharing
│   └── og-image.png              raster version (1200×630) — use this for Twitter/FB
│
└── preview/                   ← PNG screenshots of the live site
    ├── desktop-full.png          1440×900, full page
    ├── desktop-viewport.png      1440×900, above-the-fold only
    ├── tablet-full.png           768×1024, full page
    ├── mobile-full.png           375×812, full page
    ├── section-hero.png          hero section close-up
    ├── section-about.png         about section close-up
    ├── section-education.png     education section close-up
    ├── section-skills.png        skills section close-up
    ├── section-projects.png      projects section close-up
    └── section-contact.png       contact section close-up
```

## How icons are used

All icons in `icons/` use the [lucide](https://lucide.dev) style:
- 24×24 viewBox
- `stroke="currentColor"` (inherits text color)
- `stroke-width="2"`, round caps & joins
- No fill (except `heart.svg` which is filled red when used in footer)

To recolor an icon, set CSS `color` on the element wrapping the SVG, or
edit the SVG's `stroke` attribute directly.

## About the hero graphic

`graphics/hero-graphic.svg` is a static export of the hero code-icon.
On the live site, the same graphic is **animated** with CSS:
- outer dashed ring rotates clockwise
- inner faint blue dashed ring rotates counter-clockwise
- 6 floating geometric shapes (square, triangle, circle, diamond, dot,
  small diamond) each animate independently (float / drift / pulse / wiggle)

The SVG file captures a single frozen frame of that composition.

## About the Open Graph image

`graphics/og-image.svg` is sized 1200×630 (the standard social-share
aspect ratio). To use it, add this to your page `<head>`:

```html
<meta property="og:image" content="https://yoursite.com/assets/graphics/og-image.svg"/>
<meta property="og:title" content="Jade Roland Eduard — Front-End Developer"/>
<meta property="og:description" content="Portfolio of Jade Roland Eduard."/>
<meta name="twitter:card" content="summary_large_image"/>
```

Note: some platforms (Twitter/X, Facebook) prefer PNG/JPG over SVG for
OG images. If previews don't show, convert `og-image.svg` to `og-image.png`
at 1200×630 and update the meta tag.

## Preview screenshots

The PNG files in `preview/` are real screenshots of the live site
captured at three breakpoints:

| File                  | Viewport    | Purpose                          |
|-----------------------|-------------|----------------------------------|
| desktop-full.png      | 1440×900    | Full desktop page, scrollable    |
| desktop-viewport.png  | 1440×900    | Above-the-fold only              |
| tablet-full.png       | 768×1024    | Full tablet page                 |
| mobile-full.png       | 375×812     | Full mobile page (iPhone X size) |
| section-*.png         | 1440×900    | Per-section close-ups            |

Use these as design references, or include them in your README/portfolio
documentation.

## Fonts (loaded via CDN, not in this folder)

The site uses two Google Fonts, loaded via `<link>` in `index.html`:
- **Plus Jakarta Sans** (300–800) — body and headings
- **JetBrains Mono** (400–700) — section indices and the code icon

No font files are bundled. If you need offline support, download the
font files from Google Fonts and add them to a `fonts/` folder, then
update the `@font-face` declarations in `css/styles.css`.

## Decorative shapes

The floating background shapes (squares, triangles, circles, dots)
visible in the hero, about, education, and contact sections are
**pure CSS** — they are `<span>` elements with background colors and
keyframe animations. There are no image files for them; if you want
to modify them, edit the `.shape-*` and `.cshape-*` rules in
`css/styles.css`.

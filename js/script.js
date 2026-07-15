/* ============================================================
   Jade Roland Eduard — Portfolio
   Static JS (no build step required)
   Loads data from ./data/portfolio.json and renders the page.
   ============================================================ */

(() => {
  "use strict";

  // ---------- SVG icon library ----------
  const ICONS = {
    github: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
    facebook: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    twitter: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
    code: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    external: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
    arrowUpRight: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>',
    graduation: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    book: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    sparkle: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z"></path></svg>',
  };

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

  // ---------- Render functions ----------
  function renderNavigation(nav) {
    // Desktop
    const desktop = $(".nav-desktop");
    desktop.innerHTML = nav.items
      .map(
        (i) =>
          `<a href="${esc(i.href)}">${esc(i.label)}</a>`
      )
      .join("");

    // Mobile
    const mobile = $("#navMobile");
    mobile.innerHTML = nav.items
      .map(
        (i) =>
          `<a href="${esc(i.href)}"><span class="nav-index">${esc(i.index)}</span><span>${esc(i.label)}</span></a>`
      )
      .join("");

    // Logo
    $("[data-field='navigation.logo.text']").textContent = nav.logo.text;
    if (nav.logo.accentDotColor) {
      $(".logo-dot").style.background = nav.logo.accentDotColor;
    }
  }

  function renderHero(hero) {
    $("[data-field='hero.greeting']").textContent = hero.greeting;
    $("[data-field='hero.intro']").textContent = hero.intro;
    $("[data-field='hero.highlightName']").textContent = hero.highlightName;
    if (hero.highlightColor) {
      $(".hero-name").style.color = hero.highlightColor;
    }
    $("[data-field='hero.primaryButton.label']").childNodes[0].nodeValue = hero.primaryButton.label + " ";
    $("[data-field='hero.primaryButton.label']").href = hero.primaryButton.href;
    $("[data-field='hero.secondaryButton.label']").href = hero.secondaryButton.href;
    // Button label has an SVG inside; update only the leading text node.
    const secBtn = $("[data-field='hero.secondaryButton.label']");
    secBtn.childNodes[0].nodeValue = " " + hero.secondaryButton.label + " ";

    // Graphic colors
    if (hero.graphic) {
      if (hero.graphic.circleBg) $(".hero-circle").style.background = hero.graphic.circleBg;
      if (hero.graphic.iconColor) $(".hero-code-icon").style.color = hero.graphic.iconColor;
      if (hero.graphic.dashedRing) $(".ring-outer").style.borderColor = hero.graphic.dashedRing;
    }
  }

  function startTyping(phrases, accentColor) {
    const el = $("#typingText");
    if (accentColor) el.style.color = accentColor;
    const cursor = $(".typing-cursor");
    if (accentColor) cursor.style.background = accentColor;

    if (!phrases || phrases.length === 0) return;

    let phraseIdx = 0;
    let displayed = "";
    let deleting = false;
    const TYPE = 85, DELETE = 40, HOLD = 1600;

    function tick() {
      const current = phrases[phraseIdx];
      if (!deleting && displayed === current) {
        setTimeout(() => { deleting = true; tick(); }, HOLD);
        return;
      }
      if (deleting && displayed === "") {
        setTimeout(() => {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          tick();
        }, 250);
        return;
      }
      displayed = deleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1);
      el.textContent = displayed;
      setTimeout(tick, deleting ? DELETE : TYPE);
    }
    tick();
  }

  function renderMarquee(m) {
    const track = $("#marqueeTrack");
    if (m.backgroundColor) track.parentElement.style.background = m.backgroundColor;
    const sepColor = m.separatorColor || "#F1C40F";
    const sep = m.separator || "•";
    const buildItem = (item) =>
      `<span class="marquee-item"><span class="label">${esc(item)}</span><span class="dot" style="color:${esc(sepColor)}">${esc(sep)}</span></span>`;
    // Duplicate twice for seamless -50% loop
    track.innerHTML = (m.items.map(buildItem).join("")) + (m.items.map(buildItem).join(""));
  }

  function renderAbout(about) {
    $("[data-field='about.index']").textContent = about.index;
    $("[data-field='about.label']").textContent = about.label;
    $("[data-field='about.heading']").textContent = about.heading;

    $("#aboutParagraphs").innerHTML = about.paragraphs
      .map((p) => `<p>${esc(p)}</p>`)
      .join("");

    $("#aboutSocials").innerHTML = about.socials
      .map(
        (s) =>
          `<a href="${esc(s.href)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)}">${ICONS[s.icon] || ICONS.github}</a>`
      )
      .join("");
  }

  function renderEducation(edu) {
    $("[data-field='education.index']").textContent = edu.index;
    $("[data-field='education.label']").textContent = edu.label;
    $("[data-field='education.heading']").textContent = edu.heading;
    if (edu.underlineColor) {
      // Education uses same .underlined style; we keep default yellow globally.
    }

    $("#educationCards").innerHTML = edu.items
      .map((e) => {
        const highlights = e.highlights
          .map(
            (h) =>
              `<span class="edu-highlight" style="border-color:${esc(e.accentColor)}40;background:${esc(e.accentColor)}10;color:${esc("#2C3E50")}">${esc(h)}</span>`
          )
          .join("");
        return `
          <article class="edu-card">
            <span class="accent-bar" style="background:${esc(e.accentColor)}"></span>
            <span class="edu-glow" style="background:${esc(e.accentColor)}"></span>
            <div class="edu-grid">
              <div class="edu-icon-wrap">
                <div class="edu-icon" style="background:${esc(e.iconBg)};color:${esc(e.accentColor)}">${ICONS.graduation}</div>
              </div>
              <div>
                <div class="edu-header">
                  <h3 class="edu-institution">${esc(e.institution)}</h3>
                  <span class="edu-badge" style="background:${esc(e.accentColor)}">${ICONS.sparkle}${esc(e.status)}</span>
                </div>
                <p class="edu-degree" style="color:${esc(e.accentColor)}">${esc(e.degree)}</p>
                <div class="edu-meta">
                  <span>${ICONS.calendar}${esc(e.startYear)} — ${esc(e.endYear)}</span>
                  <span>${ICONS.book}${esc(e.shortCourse)}</span>
                </div>
                <p class="edu-desc">${esc(e.description)}</p>
                <p class="edu-highlights-label">Course Highlights</p>
                <div class="edu-highlights">${highlights}</div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderSkills(s) {
    $("[data-field='skills.index']").textContent = s.index;
    $("[data-field='skills.label']").textContent = s.label;
    $("[data-field='skills.heading']").textContent = s.heading;

    $("#skillsGrid").innerHTML = s.categories
      .map((cat) => {
        const items = cat.items
          .map(
            (i) =>
              `<li><span style="background:${esc(cat.iconColor)}"></span>${esc(i)}</li>`
          )
          .join("");
        return `
          <div class="skill-card">
            <div class="skill-icon" style="background:${esc(cat.iconBg)};color:${esc(cat.iconColor)}">${ICONS.code}</div>
            <h3 class="skill-name">${esc(cat.name)}</h3>
            <ul class="skill-list">${items}</ul>
          </div>
        `;
      })
      .join("");
  }

  function renderProjects(p) {
    $("[data-field='projects.index']").textContent = p.index;
    $("[data-field='projects.label']").textContent = p.label;
    $("[data-field='projects.heading']").textContent = p.heading;

    $("#projectsGrid").innerHTML = p.items
      .map((proj) => {
        const tags = proj.tags
          .map((t) => `<span class="project-tag">${esc(t)}</span>`)
          .join("");
        return `
          <article class="project-card">
            <span class="project-year" style="background:${esc(proj.yearColor)}">${esc(proj.year)}</span>
            <h3 class="project-title">${esc(proj.title)}</h3>
            <p class="project-desc">${esc(proj.description)}</p>
            <div class="project-tags">${tags}</div>
            <div class="project-actions">
              <a href="${esc(proj.codeUrl)}" target="_blank" rel="noopener noreferrer" class="btn-small btn-code">${ICONS.code}Code</a>
              <a href="${esc(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn-small btn-live">${ICONS.external}Live</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderContact(c) {
    $("[data-field='contact.index']").textContent = c.index;
    $("[data-field='contact.label']").textContent = c.label;
    $("[data-field='contact.heading']").textContent = c.heading;
    $("[data-field='contact.subtext']").textContent = c.subtext;

    $("#contactLinks").innerHTML = c.links
      .map(
        (l) =>
          `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="contact-link-icon">${ICONS[l.icon] || ICONS.github}</span>${esc(l.label)}</a>`
      )
      .join("");

    const emailBtn = $("#contactEmail");
    emailBtn.href = c.email.href;
    emailBtn.style.background = c.email.buttonColor;
    emailBtn.querySelector(".email-label").textContent = c.email.label;

    if (c.backgroundColor) $(".contact-section").style.background = c.backgroundColor;
  }

  // ---------- Behavior ----------
  function setupHeaderScroll() {
    const header = $("#siteHeader");
    const onScroll = () => {
      if (window.scrollY > 10) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupMobileMenu() {
    const toggle = $("#navToggle");
    const mobile = $("#navMobile");
    const menuIcon = toggle.querySelector(".icon-menu");
    const closeIcon = toggle.querySelector(".icon-close");

    toggle.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      menuIcon.style.display = isOpen ? "none" : "block";
      closeIcon.style.display = isOpen ? "block" : "none";
    });

    // Close when a link is clicked
    $$("#navMobile a").forEach((a) =>
      a.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
      })
    );
  }

  // ---------- Init ----------
  async function init() {
    // Fetch the JSON data
    let data;
    try {
      const res = await fetch("./data/portfolio.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      data = await res.json();
    } catch (err) {
      console.error("Failed to load portfolio.json:", err);
      document.body.insertAdjacentHTML(
        "afterbegin",
        `<div style="background:#E74C3C;color:#fff;padding:1rem;text-align:center;font-family:sans-serif">
          Could not load <code>data/portfolio.json</code>. Please run this site through a local web server
          (e.g. <code>python3 -m http.server</code> from the project root) instead of opening the file directly.
        </div>`
      );
      return;
    }

    renderNavigation(data.navigation);
    renderHero(data.hero);
    renderMarquee(data.techMarquee);
    renderAbout(data.about);
    renderEducation(data.education);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderContact(data.contact);

    if (data.typingPhrases) {
      startTyping(data.typingPhrases.phrases, data.typingPhrases.accentColor);
    }

    setupHeaderScroll();
    setupMobileMenu();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

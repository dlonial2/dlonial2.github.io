// ---- data you edit ----
const PROJECTS = [
  {
    title: "Crypto Trading Bot",
    desc: "Python trading bot with SMA/RSI logic, live Flask dashboard showing price and indicators (SMA), and ccxt connectors for exchages.",
    tech: ["Python", "Flask", "Pandas", "ccxt"],
    image: "projects/crypto-bot.png",
    links: [
      { label: "GitHub", href: "https://github.com/dlonial2/crypto-trade-bot" },
      { label: "Demo (local)", href: "http://127.0.0.1:5050/" }
    ]
  }
];

// photos removed to keep the site minimal per user's request

// ---- render logic (no edits needed) ----
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function renderProjects() {
  const grid = $("#projectsGrid");
  const tpl = $("#projectCard").content;
  PROJECTS.forEach(p => {
    const node = document.importNode(tpl, true);
  const imgEl = node.querySelector(".project__img");
  imgEl.src = p.image;
  imgEl.addEventListener('error', () => { imgEl.style.display = 'none'; });
    node.querySelector(".project__img").alt = p.title;
    node.querySelector(".project__title").textContent = p.title;
    node.querySelector(".project__desc").textContent = p.desc;

    const chips = node.querySelector(".chips");
    p.tech.forEach(t => {
      const s = document.createElement("span");
      s.textContent = t;
      chips.appendChild(s);
    });

    const links = node.querySelector(".project__links");
    p.links.forEach(l => {
      const a = document.createElement("a");
      a.href = l.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = l.label + " ↗";
      links.appendChild(a);
    });

    grid.appendChild(node);
  });
}

// renderPhotos removed as photos were eliminated from the page

function setupTheme() {
  const key = "theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(key);
  if (saved === "light") root.classList.add("light");
  $("#themeToggle").addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem(key, root.classList.contains("light") ? "light" : "dark");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  renderProjects();
  // renderPhotos() removed as photos were eliminated from the page
  setupTheme();
});
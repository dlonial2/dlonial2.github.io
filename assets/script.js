// ---- Edit your project data here ----
const PROJECTS = [
  {
    title: "Crypto Trading Bot",
    desc: "Python + ccxt trading agent that blends SMA/RSI signals with lightweight ML scoring to manage positions and stream telemetry into a Flask dashboard for live tuning.",
    tech: ["Python", "Flask", "Pandas", "ccxt"],
    image: "projects/crypto-bot.png",
    links: [
      { label: "GitHub", href: "https://github.com/dlonial2/crypto-trade-bot" },
      { label: "Demo notes", href: "https://github.com/dlonial2/crypto-trade-bot#local-demo" }
    ]
  }
];

// ---- Render logic ----
const $ = (sel) => document.querySelector(sel);

function renderProjects() {
  const grid = $("#projectsGrid");
  if (!grid) return;
  const tpl = $("#projectCard").content;

  PROJECTS.forEach((project) => {
    const node = document.importNode(tpl, true);
    const imgEl = node.querySelector(".project__img");
    imgEl.src = project.image;
    imgEl.alt = project.title;
    imgEl.addEventListener("error", () => {
      imgEl.style.display = "none";
    });

    node.querySelector(".project__title").textContent = project.title;
    node.querySelector(".project__desc").textContent = project.desc;

    const techList = node.querySelector(".project__tech");
    project.tech.forEach((tech) => {
      const item = document.createElement("li");
      item.textContent = tech;
      techList.appendChild(item);
    });

    const links = node.querySelector(".project__links");
    project.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = `${link.label} ↗`;
      links.appendChild(anchor);
    });

    grid.appendChild(node);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  renderProjects();
});

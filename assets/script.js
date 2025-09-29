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

const TRAVEL_STOPS = {
  austin: {
    title: "Austin, Texas",
    blurb: "Coffee crawls, golden-hour walks along Lady Bird Lake, and plenty of live music energy.",
    photos: [
      { src: "photos/austin-1.jpg", alt: "Sunset skyline view of Austin, Texas" }
    ]
  },
  paris: {
    title: "Paris, France",
    blurb: "Photo walks through the Marais, sunrise croissants near the Seine, and museum days that stretch into late-night metro rides.",
    photos: [
      { src: "photos/paris-1.jpg", alt: "Street scene from Paris, France" }
    ]
  }
};

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

function setupTravelMap() {
  const pins = document.querySelectorAll(".map__pin");
  const modal = $("#galleryModal");
  if (!pins.length || !modal) return;

  const titleEl = $("#galleryTitle");
  const blurbEl = $("#galleryBlurb");
  const gridEl = $("#galleryImages");
  const closeEls = modal.querySelectorAll("[data-close]");
  let lastFocus = null;

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (gridEl) gridEl.innerHTML = "";
    if (lastFocus) {
      lastFocus.focus();
      lastFocus = null;
    }
  };

  const open = (id) => {
    const stop = TRAVEL_STOPS[id];
    if (!stop || !titleEl || !blurbEl || !gridEl) return;

    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    titleEl.textContent = stop.title;
    blurbEl.textContent = stop.blurb;
    gridEl.innerHTML = "";

    stop.photos.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt || stop.title;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        img.remove();
      });
      gridEl.appendChild(img);
    });

    const closeButton = modal.querySelector(".gallery__close");
    if (closeButton instanceof HTMLElement) {
      closeButton.focus({ preventScroll: true });
    }
  };

  pins.forEach((pin) => {
    pin.addEventListener("click", () => {
      open(pin.dataset.stop);
    });
    pin.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        open(pin.dataset.stop);
      }
    });
  });

  closeEls.forEach((el) => {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && modal.classList.contains("is-open")) {
      close();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  renderProjects();
  setupTravelMap();
});

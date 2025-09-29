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
  },
  {
    title: "Personal Shopper",
    desc: "React + FastAPI experience that lets an LLM curate outfits from product catalogs, ranks options through user preferences, and returns shoppable looks.",
    tech: ["React", "FastAPI", "OpenAI", "PostgreSQL"],
    image: "projects/personal-shopper.png",
    links: [
      { label: "GitHub", href: "https://github.com/dlonial2/personal-shopper" }
    ]
  },
  {
    title: "Diabetes Risk Prediction (India)",
    desc: "Benchmarked logistic regression vs. random forest on Kaggle's India diabetes dataset after building a robust preprocessing pipeline for 26 clinical + lifestyle features.",
    tech: ["Python", "scikit-learn", "Pandas", "Streamlit"],
    image: "assets/project-placeholder.svg",
    links: [
      { label: "GitHub", href: "https://github.com/dlonial2/diabetes-risk-india" },
      { label: "Case study", href: "/projects/diabetes-risk-india" }
    ]
  }
];

const TRAVEL_STOPS = {
  austin: {
    title: "Austin, Texas",
    blurb: "",
    photos: [
      { src: "photos/austin-1.png" },
      { src: "photos/austin-2.png" }
    ]
  },
  paris: {
    title: "Paris, France",
    blurb: "",
    photos: [
      { src: "photos/paris-1.png" },
      { src: "photos/paris-2.png" }
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
  const contentEl = modal.querySelector(".gallery__content");
  let lastFocus = null;
  let activeImg = null;
  let currentStop = null;
  let currentIndex = 0;

  const ensureNavButton = (className, label, symbol) => {
    if (!contentEl) return null;
    let btn = contentEl.querySelector(`.${className}`);
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = `gallery__nav ${className}`;
      btn.setAttribute("aria-label", label);
      btn.textContent = symbol;
      contentEl.appendChild(btn);
    }
    return btn;
  };

  const prevBtn = ensureNavButton("gallery__nav--prev", "Previous photo", "‹");
  const nextBtn = ensureNavButton("gallery__nav--next", "Next photo", "›");

  const updateNavVisibility = () => {
    const hideNav = !currentStop || !currentStop.photos || currentStop.photos.length <= 1;
    [prevBtn, nextBtn].forEach((btn) => {
      if (!btn) return;
      btn.hidden = hideNav;
    });
  };

  updateNavVisibility();

  const showPhoto = (index) => {
    if (!currentStop || !activeImg) return;
    const photos = currentStop.photos || [];
    if (!photos.length) return;
    const total = photos.length;
    const normalized = ((index % total) + total) % total;
    const photo = photos[normalized];
    currentIndex = normalized;
    activeImg.src = photo.src;
    activeImg.alt = photo.alt || currentStop.title || "";
    updateNavVisibility();
  };

  const stepPhoto = (delta) => {
    if (!currentStop) return;
    const photos = currentStop.photos || [];
    if (photos.length <= 1) return;
    showPhoto(currentIndex + delta);
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => stepPhoto(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => stepPhoto(1));
  }

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (gridEl) gridEl.innerHTML = "";
    activeImg = null;
    currentStop = null;
    currentIndex = 0;
    updateNavVisibility();
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

    titleEl.textContent = stop.title || "";
    if (stop.blurb) {
      blurbEl.textContent = stop.blurb;
      blurbEl.hidden = false;
    } else {
      blurbEl.textContent = "";
      blurbEl.hidden = true;
    }
    gridEl.innerHTML = "";

    activeImg = document.createElement("img");
    activeImg.loading = "lazy";
    activeImg.addEventListener("error", () => {
      if (!activeImg) return;
      activeImg.remove();
      activeImg = null;
    });
    gridEl.appendChild(activeImg);

    currentStop = stop;
    currentIndex = 0;
    showPhoto(currentIndex);

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
      return;
    }
    if (!modal.classList.contains("is-open")) return;
    if (ev.key === "ArrowRight") {
      ev.preventDefault();
      stepPhoto(1);
    }
    if (ev.key === "ArrowLeft") {
      ev.preventDefault();
      stepPhoto(-1);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  renderProjects();
  setupTravelMap();
});

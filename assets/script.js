// ---- Edit your project data here ----
const PROJECTS = [
  {
    title: "Crypto Trading Bot",
    desc: "Python + ccxt trading agent that blends SMA/RSI signals with lightweight ML scoring to manage positions and stream telemetry into a Flask dashboard for live tuning.",
    tech: ["Python", "Flask", "Pandas", "ccxt"],
    image: "projects/crypto-bot1.png",
    images: [
      "projects/crypto-bot1.png",
      "projects/crypto2.png",
      "projects/crypto3.png"
    ],
    links: [
      { label: "GitHub", href: "https://github.com/dlonial2/crypto-trade-bot" }
    ]
  },
  {
    title: "Personal Shopper",
    desc: "React + FastAPI experience that lets an LLM curate outfits from product catalogs, ranks options through user preferences, and returns shoppable looks.",
    tech: ["React", "FastAPI", "OpenAI", "PostgreSQL"],
    image: "projects/personalshopper1.png",
    images: [
      "projects/personalshopper1.png"
    ],
    links: [
      { label: "GitHub", href: "https://github.com/dlonial2/personal-shopper" }
    ]
  }
];

const TRAVEL_STOPS = {
  austin: {
    title: "Austin, Texas",
    blurb: "",
    // Austin coordinates
    lat: 30.2672,
    lon: -97.7431,
    // manual percent override to place Austin more centrally in Texas on the map
    posPercent: { left: 30, top: 36 },
    photos: [
      { src: "photos/austin-1.png" },
      { src: "photos/austin-2.png" }
    ]
  },
  paris: {
    title: "Paris, France",
    blurb: "",
    // coordinates for Paris
    lat: 48.8566,
    lon: 2.3522,
    photos: [
      { src: "photos/paris-1.png" },
      { src: "photos/paris-2.png" }
    ]
  },
  barcelona: {
    title: "Barcelona, Spain",
    blurb: "",
    // lat, lon used to compute pin position on the equirectangular SVG map
    lat: 41.3851,
    lon: 2.1734,
    photos: []
  },
  sf: {
    title: "San Francisco, California",
    blurb: "",
    lat: 37.7749,
    lon: -122.4194,
    // manual percent override to nudge SF further to the west edge
    posPercent: { left: 4, top: 34 },
    photos: []
  },
  camas: {
    title: "Camas, Washington",
    blurb: "",
    lat: 45.5843,
    lon: -122.3991,
    // nudge Camas to the far west edge for visual alignment
    posPercent: { left: 2, top: 22 },
    photos: []
  },
  india: {
    title: "India",
    blurb: "",
    // approximate center of India
    lat: 22.0,
    lon: 79.0,
    photos: []
  },
  nyc: {
    title: "New York City, NY",
    blurb: "",
    lat: 40.7128,
    lon: -74.0060,
    photos: []
  }
};

// Render travel pins dynamically from TRAVEL_STOPS using lat/lon -> percentage mapping.
function renderTravelPins() {
  const container = document.querySelector('.map__pins');
  if (!container) return;

  // Helper: convert lat/lon to top/left percentages for an equirectangular projection
  const latLonToPercent = (lat, lon) => {
    // longitude -180..180 -> 0..100%
    const left = ((lon + 180) / 360) * 100;
    // latitude 90..-90 -> 0..100% (top to bottom)
    const top = ((90 - lat) / 180) * 100;
    return { left, top };
  };

  // Clear any existing pins
  container.innerHTML = '';

  Object.keys(TRAVEL_STOPS).forEach((key) => {
    const stop = TRAVEL_STOPS[key];
    if (!stop) return;
    // require lat/lon to render a pin; skip stops without coordinates
    if (typeof stop.lat !== 'number' || typeof stop.lon !== 'number') return;

    // compute percent position, but allow per-stop manual overrides (posPercent)
    const computed = latLonToPercent(stop.lat, stop.lon);
    const leftPct = (stop.posPercent && typeof stop.posPercent.left === 'number')
      ? stop.posPercent.left
      : computed.left;
    const topPct = (stop.posPercent && typeof stop.posPercent.top === 'number')
      ? stop.posPercent.top
      : computed.top;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'map__pin';
    btn.style.left = `${leftPct}%`;
    btn.style.top = `${topPct}%`;
    btn.dataset.stop = key;
    btn.setAttribute('aria-label', stop.title || key);

    const pulse = document.createElement('div');
    pulse.className = 'map__pulse';
    btn.appendChild(pulse);

    const label = document.createElement('span');
    label.className = 'map__label';
    label.textContent = stop.title || key;
    btn.appendChild(label);

    container.appendChild(btn);
  });
}

// ---- Render logic ----
const $ = (sel) => document.querySelector(sel);

function renderProjects() {
  const grid = $("#projectsGrid");
  if (!grid) return;
  const tpl = $("#projectCard").content;

  PROJECTS.forEach((project) => {
    const node = document.importNode(tpl, true);
    const imgEl = node.querySelector(".project__img");
    const gallery = Array.isArray(project.images) && project.images.length
      ? project.images
      : [project.image].filter(Boolean);
    const fallbackImage = project.image || "assets/project-placeholder.svg";
    const primaryImage = gallery[0] || fallbackImage;

    imgEl.src = primaryImage;
    imgEl.alt = project.title;
    imgEl.addEventListener("error", () => {
      imgEl.src = fallbackImage;
    });

    if (gallery.length > 1) {
      const media = node.querySelector(".project__media");
      const thumbWrap = document.createElement("div");
      thumbWrap.className = "project__thumbs";

      const updateActive = (activeBtn) => {
        thumbWrap.querySelectorAll(".project__thumb").forEach((btn) => {
          btn.classList.toggle("is-active", btn === activeBtn);
        });
      };

      gallery.forEach((src, index) => {
        const thumbBtn = document.createElement("button");
        thumbBtn.type = "button";
        thumbBtn.className = "project__thumb";
        thumbBtn.setAttribute("aria-label", `${project.title} preview ${index + 1}`);

        const thumbImg = document.createElement("img");
        thumbImg.src = src;
        thumbImg.alt = "";
        thumbImg.loading = "lazy";
        thumbBtn.appendChild(thumbImg);

        if (index === 0) {
          thumbBtn.classList.add("is-active");
        }

        thumbBtn.addEventListener("click", () => {
          imgEl.src = src;
          updateActive(thumbBtn);
        });

        thumbWrap.appendChild(thumbBtn);
      });

      media.appendChild(thumbWrap);
    }

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
  // render pins first so setupTravelMap can bind to them
  renderTravelPins();
  setupTravelMap();
});

// ---- Edit your project data here ----
const PROJECTS = [
  {
    title: "KhojNepal",
    desc: "A phonetic matcher that collapses Devanagari and Latin name records onto a single key, indexing 32,769 rows in 138 lines of Python and rebuilt nightly by a four stage GitHub Actions pipeline.",
    tech: ["Python", "Phonetic matching", "GitHub Actions", "Web Speech API", "Static site"],
    image: "projects/khojnepal-1.jpg",
    images: [
      "projects/khojnepal-1.jpg",
      "projects/lostinnepal-1.jpg"
    ],
    links: [
      { label: "Live site", href: "https://khojnepal.github.io" },
      { label: "GitHub", href: "https://github.com/khojnepal/khojnepal.github.io" },
      { label: "lostinnepal.org", href: "https://lostinnepal.org" }
    ]
  },
  {
    title: "Sonny",
    desc: "An LLM student seeded with specific misconceptions, scoring each turn against a 750 problem knowledge graph that propagates mastery along prerequisite edges.",
    tech: ["Python", "LLM agents", "Knowledge graphs", "Spaced retrieval"],
    image: "projects/sonny-1.png",
    images: [
      "projects/sonny-1.png",
      "projects/sonny-knowledge-graph.jpg"
    ],
    links: [
      { label: "Live demo", href: "https://happybunny-1.taild032ca.ts.net/" },
      { label: "GitHub", href: "https://github.com/dlonial2/learning-integrity" }
    ]
  },
  {
    title: "Diabetes Risk Checker",
    desc: "A Random Forest risk model with ethnicity adjusted thresholds, SHAP attributions and a counterfactual engine, served from Docker on Hugging Face Spaces.",
    tech: ["Python", "scikit-learn", "SHAP", "Streamlit", "Docker", "Hugging Face"],
    image: "projects/huggingface.png",
    images: [
      "projects/huggingface.png",
      "projects/diabetes_india_clinic_confusion_matrix.png",
      "projects/diabetes_india_clinic_roc_curve.png"
    ],
    links: [
      { label: "Live demo", href: "https://huggingface.co/spaces/dlonial/diabetes-risk-docker" },
      { label: "GitHub", href: "https://github.com/dlonial2/diabetes-risk-india" }
    ]
  },
  {
    title: "Crypto Trading Bot",
    desc: "An SMA crossover signal service over the CoinGecko API, with exponential backoff, Retry-After handling and a TTL cache that serves stale data rather than failing under rate limits.",
    tech: ["Python", "Flask", "Pandas", "Chart.js", "CoinGecko API"],
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
    title: "Personal Shopper AI",
    desc: "An intent parser and ranker running on a transformer written from scratch in NumPy, with backpropagation derived by hand and checked against numerical gradients.",
    tech: ["Python", "NumPy", "Transformers", "Flask"],
    image: "projects/personalshopper1.png",
    images: [
      "projects/personalshopper1.png"
    ],
    links: [
      { label: "GitHub", href: "https://github.com/dlonial2/personal-shopper" }
    ]
  }
];

const MAP_DIMENSIONS = {
  width: 1000,
  height: 520
};

const TRAVEL_STOPS = {
  austin: {
    title: "Austin, Texas",
    blurb: "",
    // Austin coordinates
    lat: 30.2672,
    lon: -97.7431,
    photos: [
      { src: "photos/web/austin-1.jpg" },
      { src: "photos/web/austin-2.jpg" }
    ]
  },
  paris: {
    title: "Paris, France",
    blurb: "",
    // coordinates for Paris
    lat: 48.8566,
    lon: 2.3522,
    photos: [
      { src: "photos/web/paris-1.jpg" },
      { src: "photos/web/paris-2.jpg" }
    ]
  },
  barcelona: {
    title: "Barcelona, Spain",
    blurb: "",
    // lat, lon used to compute pin position on the equirectangular SVG map
    lat: 41.3851,
    lon: 2.1734,
    photos: [
      { src: "photos/web/bcn1.jpg" },
      { src: "photos/web/bcn2.jpg" },
      { src: "photos/web/bcn3.jpg" },
      { src: "photos/web/bcn4.jpg" },
      { src: "photos/web/bcn5.jpg" },
      { src: "photos/web/bcn6.jpg" },
      { src: "photos/web/bcn7.jpg" }
    ]
  },
  sf: {
    title: "San Francisco, California",
    blurb: "",
    lat: 37.7749,
    lon: -122.4194,
    photos: [
      { src: "photos/web/sf1.jpg" },
      { src: "photos/web/sf2.jpg" },
      { src: "photos/web/sf3.jpg" }
    ]
  },
  camas: {
    title: "Camas, Washington",
    blurb: "",
    lat: 45.5843,
    lon: -122.3991,
    photos: [
      { src: "photos/web/camas1.jpg" },
      { src: "photos/web/camas2.jpg" },
      { src: "photos/web/camas3.jpg" }
    ]
  },
  india: {
    title: "India",
    blurb: "",
    // approximate center of India
    lat: 22.0,
    lon: 79.0,
    photos: [
      { src: "photos/web/india1.jpg" },
      { src: "photos/web/india2.jpg" },
      { src: "photos/web/india3.jpg" }
    ]
  },
  nyc: {
    title: "New York City, NY",
    blurb: "",
    lat: 40.7128,
    lon: -74.0060,
    photos: [
      { src: "photos/web/ny1.jpg" },
      { src: "photos/web/ny2.jpg" },
      { src: "photos/web/ny3.jpg" }
    ]
  }
};

// Render travel pins dynamically from TRAVEL_STOPS using lat/lon -> percentage mapping.
function renderTravelPins() {
  const container = document.querySelector('.map__pins');
  if (!container) return;
  const mapEl = document.querySelector('.map');
  const imgEl = document.querySelector('.map__image');

  const naturalWidth = (imgEl && imgEl.naturalWidth) || MAP_DIMENSIONS.width;
  const naturalHeight = (imgEl && imgEl.naturalHeight) || MAP_DIMENSIONS.height;
  const containerWidth = (mapEl && mapEl.clientWidth) || 0;
  const containerHeight = (mapEl && mapEl.clientHeight) || 0;

  let widthScale = 1;
  let heightScale = 1;

  if (naturalWidth && naturalHeight && containerWidth && containerHeight) {
    const scale = Math.max(containerWidth / naturalWidth, containerHeight / naturalHeight);
    const displayedWidth = naturalWidth * scale;
    const displayedHeight = naturalHeight * scale;
    widthScale = displayedWidth / containerWidth;
    heightScale = displayedHeight / containerHeight;
  }

  // Helper: convert lat/lon to top/left percentages for an equirectangular projection
  const latLonToPercent = (lat, lon) => {
    // longitude -180..180 -> 0..100%
    const normX = (lon + 180) / 360;
    // latitude 90..-90 -> 0..100% (top to bottom)
    const normY = (90 - lat) / 180;
    let left = normX;
    let top = normY;

    if (widthScale !== 1) {
      left = widthScale * normX - (widthScale - 1) / 2;
    }
    if (heightScale !== 1) {
      top = heightScale * normY - (heightScale - 1) / 2;
    }

    const clamp = (value) => Math.min(1, Math.max(0, value));
    return {
      left: clamp(left) * 100,
      top: clamp(top) * 100
    };
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
    const tldrEl = node.querySelector(".project__tldr");
    if (tldrEl) {
      if (project.tldr) {
        tldrEl.textContent = project.tldr;
      } else {
        tldrEl.remove();
      }
    }
    const descEl = node.querySelector(".project__desc");
    if (descEl) {
      if (Array.isArray(project.bullets) && project.bullets.length) {
        const ul = document.createElement("ul");
        ul.className = "project__points";
        project.bullets.forEach((b) => {
          const li = document.createElement("li");
          li.textContent = b;
          ul.appendChild(li);
        });
        descEl.replaceWith(ul);
      } else {
        descEl.textContent = project.desc || "";
      }
    }

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

  const preload = (src) => { if (src) { const i = new Image(); i.src = src; } };

  const showPhoto = (index) => {
    if (!currentStop || !activeImg) return;
    const photos = currentStop.photos || [];
    if (!photos.length) return;
    const total = photos.length;
    const normalized = ((index % total) + total) % total;
    const photo = photos[normalized];
    currentIndex = normalized;

    activeImg.classList.add("is-swapping");
    const swap = () => {
      activeImg.src = photo.src;
      activeImg.alt = photo.alt || currentStop.title || "";
    };
    swap();
    requestAnimationFrame(() => activeImg.classList.remove("is-swapping"));

    // keep the neighbours warm so arrow-ing through doesn't flash
    preload(photos[(normalized + 1) % total] && photos[(normalized + 1) % total].src);
    preload(photos[(normalized - 1 + total) % total] && photos[(normalized - 1 + total) % total].src);

    const counter = contentEl.querySelector(".gallery__count");
    if (counter) {
      counter.textContent = total > 1 ? `${normalized + 1} / ${total}` : "";
      counter.hidden = total <= 1;
    }
    const strip = contentEl.querySelector(".gallery__strip");
    if (strip) {
      strip.querySelectorAll("button").forEach((b, i) => {
        b.classList.toggle("is-active", i === normalized);
        b.setAttribute("aria-current", i === normalized ? "true" : "false");
      });
    }
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

    const photos = stop.photos || [];

    // counter
    let counter = contentEl.querySelector(".gallery__count");
    if (!counter) {
      counter = document.createElement("p");
      counter.className = "gallery__count";
      gridEl.insertAdjacentElement("afterend", counter);
    }

    // thumbnail strip
    let strip = contentEl.querySelector(".gallery__strip");
    if (!strip) {
      strip = document.createElement("div");
      strip.className = "gallery__strip";
      counter.insertAdjacentElement("afterend", strip);
    }
    strip.innerHTML = "";
    strip.hidden = photos.length <= 1;
    photos.forEach((photo, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Photo ${i + 1} of ${photos.length}`);
      const thumb = document.createElement("img");
      thumb.src = photo.src.replace("/web/", "/thumb/");
      thumb.alt = "";
      thumb.loading = "lazy";
      b.appendChild(thumb);
      b.addEventListener("click", () => showPhoto(i));
      strip.appendChild(b);
    });

    // swipe on touch
    let touchX = null;
    gridEl.ontouchstart = (e) => { touchX = e.changedTouches[0].clientX; };
    gridEl.ontouchend = (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 45) stepPhoto(dx < 0 ? 1 : -1);
      touchX = null;
    };

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

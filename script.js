// ===== Portfolio Script =====

// --- Loader ---
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
    initHeroAnimation();
  }, 1200);

  // Set footer year
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// --- Custom Cursor ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursorDot) {
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  }
});

// Smooth ring follow
function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  if (cursorRing) {
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document
  .querySelectorAll(
    "a, button, .btn, .skill-card, .about-card, .project-card, .contact-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot?.classList.add("hover");
      cursorRing?.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursorDot?.classList.remove("hover");
      cursorRing?.classList.remove("hover");
    });
  });

// --- Navigation ---
function setupNavigation() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const mobileOverlay = document.getElementById("mobileOverlay");

  // Smooth scroll
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        const offset = navbar.offsetHeight;
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      // Close mobile menu if open
      navToggle?.classList.remove("active");
      mobileOverlay?.classList.remove("active");
    });
  });

  // Mobile menu toggle
  if (navToggle && mobileOverlay) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      mobileOverlay.classList.toggle("active");
      navToggle.setAttribute(
        "aria-expanded",
        navToggle.classList.contains("active"),
      );
    });
  }

  // Navbar scroll style
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNav();
  });
}

// Active nav link based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

setupNavigation();

// --- GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.to(".char", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.04,
  })
    .fromTo(
      ".hero-badge",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4",
    )
    .fromTo(
      ".hero-tagline",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.2",
    )
    .fromTo(
      ".hero-actions",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.2",
    )
    .fromTo(
      ".scroll-cue",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.2",
    );
}

// Section headers
gsap.utils.toArray(".section-header").forEach((header) => {
  gsap.fromTo(
    header,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );
});

// Reveal elements
gsap.utils.toArray(".reveal").forEach((el, i) => {
  gsap.fromTo(
    el,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      delay: (i % 4) * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    },
  );
});

// Hide cursor on mobile
if (window.innerWidth <= 1024) {
  if (cursorDot) cursorDot.style.display = "none";
  if (cursorRing) cursorRing.style.display = "none";
}

console.log("Portfolio loaded successfully.");

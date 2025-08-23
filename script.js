// Clean Portfolio Script - Working Version

// Fixed Custom Cursor
const customCursor = document.querySelector(".cursor");
const cursorInner = document.querySelector(".cursor-inner");

// Cursor following mouse properly
document.addEventListener("mousemove", (e) => {
  if (customCursor) {
    customCursor.style.left = e.clientX + "px";
    customCursor.style.top = e.clientY + "px";
  }

  if (cursorInner) {
    cursorInner.style.right = e.clientX + "px";
    cursorInner.style.top = e.clientY + "px";
    cursorInner.style.left = e.clientX + "px";
    cursorInner.style.bottom = e.clientY + "px";
  }
});

// Cursor hover effects
const hoverElements = document.querySelectorAll(
  "a, button, .btn, .skill-category, .highlight-item"
);

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (customCursor) customCursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    if (customCursor) customCursor.classList.remove("hover");
  });
});

// Cursor click effect
document.addEventListener("mousedown", () => {
  if (customCursor) customCursor.classList.add("click");
});

document.addEventListener("mouseup", () => {
  if (customCursor) customCursor.classList.remove("click");
});

// WORKING NAVIGATION - Simple and Reliable
function setupNavigation() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Get the exact position
        const rect = targetSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        const targetPosition = rect.top + scrollTop - 80; // 80px for navbar

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        console.log(`Navigated to ${targetId}`);
      }
    });
  });
}

// Initialize navigation immediately
setupNavigation();

// Simple GSAP animations without Locomotive Scroll conflicts
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.set(".letter", { opacity: 0, y: 50 });
gsap.set(".hero-intro, .hero-role, .hero-description, .cta-buttons", {
  opacity: 0,
  y: 30,
});

// Animate letters
gsap.to(".letter", {
  duration: 0.8,
  opacity: 1,
  y: 0,
  stagger: 0.1,
  ease: "back.out(1.7)",
  delay: 0.5,
});

// Animate other hero elements
gsap.to(".hero-intro", {
  duration: 1,
  opacity: 1,
  y: 0,
  ease: "power3.out",
  delay: 1.5,
});
gsap.to(".hero-role", {
  duration: 1,
  opacity: 1,
  y: 0,
  ease: "power3.out",
  delay: 2,
});
gsap.to(".hero-description", {
  duration: 1,
  opacity: 1,
  y: 0,
  ease: "power3.out",
  delay: 2.5,
});
gsap.to(".cta-buttons", {
  duration: 1,
  opacity: 1,
  y: 0,
  ease: "power3.out",
  delay: 3,
});

// Background circles
gsap.to(".bg-circle", {
  rotation: 360,
  duration: 20,
  ease: "none",
  repeat: -1,
});

// Scroll-triggered animations
ScrollTrigger.create({
  trigger: ".skills",
  start: "top 80%",
  onEnter: () => {
    document.querySelectorAll(".progress-bar").forEach((bar) => {
      const width = bar.getAttribute("data-width");
      gsap.to(bar, { width: width + "%", duration: 2, ease: "power3.out" });
    });
  },
});

// Section titles
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.fromTo(
    title,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// Mobile Menu Functionality
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".mobile-nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Loading animation
window.addEventListener("load", () => {
  gsap.to("body", { opacity: 1, duration: 0.5, ease: "power2.out" });
});

// Initialize body opacity
gsap.set("body", { opacity: 0 });

// Hide cursor on mobile
if (window.innerWidth <= 768) {
  if (customCursor) customCursor.style.display = "none";
  if (cursorInner) cursorInner.style.display = "none";
}

console.log("Portfolio script loaded successfully!");

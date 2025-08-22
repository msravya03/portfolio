// Enhanced Custom Cursor
const customCursor = document.querySelector(".cursor");
const cursorInner = document.querySelector(".cursor-inner");

document.addEventListener("mousemove", (e) => {
  gsap.to(customCursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(cursorInner, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: "power2.out",
  });
});

// Cursor hover effects
const hoverElements = document.querySelectorAll(
  "a, button, .btn, .skill-category, .highlight-item"
);
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    customCursor.classList.add("hover");
    gsap.to(cursorInner, {
      scale: 2,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  el.addEventListener("mouseleave", () => {
    customCursor.classList.remove("hover");
    gsap.to(cursorInner, {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });
});

// Cursor click effect
document.addEventListener("mousedown", () => {
  customCursor.classList.add("click");
  gsap.to(cursorInner, {
    scale: 0.8,
    duration: 0.1,
    ease: "power2.out",
  });
});

document.addEventListener("mouseup", () => {
  customCursor.classList.remove("click");
  gsap.to(cursorInner, {
    scale: 1,
    duration: 0.3,
    ease: "back.out(1.7)",
  });
});

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  multiplier: 1.2,
  class: "is-reveal",
  smoothMobile: true,
  tablet: {
    smooth: true,
    direction: "vertical",
    gestureDirection: "vertical",
  },
  smartphone: {
    smooth: true,
    direction: "vertical",
    gestureDirection: "vertical",
  },
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger when Locomotive Scroll updates
scroll.on("scroll", ScrollTrigger.update);

// Tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform
    ? "transform"
    : "fixed",
});

// Enhanced Hero Section Animations
gsap.set(".letter", { opacity: 0, y: 50, rotationX: 90 });
gsap.set(".hero-intro, .hero-role, .hero-description, .cta-buttons", {
  opacity: 0,
  y: 30,
});

// Letter animation for name
gsap.to(".letter", {
  duration: 0.8,
  opacity: 1,
  y: 0,
  rotationX: 0,
  stagger: 0.1,
  ease: "back.out(1.7)",
  delay: 0.5,
});

// Other hero elements
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

// Floating background circles animation
gsap.to(".bg-circle", {
  rotation: 360,
  duration: 20,
  ease: "none",
  repeat: -1,
});

// Skills Progress Bars Animation
ScrollTrigger.create({
  trigger: ".skills",
  scroller: "[data-scroll-container]",
  start: "top 80%",
  onEnter: () => {
    document.querySelectorAll(".progress-bar").forEach((bar) => {
      const width = bar.getAttribute("data-width");
      gsap.to(bar, {
        width: width + "%",
        duration: 2,
        ease: "power3.out",
      });
    });
  },
});

// Code snippet typing animation
ScrollTrigger.create({
  trigger: ".code-snippet",
  scroller: "[data-scroll-container]",
  start: "top 80%",
  onEnter: () => {
    const lines = document.querySelectorAll(".code-line");
    gsap.set(lines, { opacity: 0, x: -20 });
    gsap.to(lines, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: "power2.out",
    });
  },
});

// Enhanced skill cards hover effects
document.querySelectorAll(".skill-category").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card.querySelector(".skill-icon"), {
      rotation: 360,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
  });
});

// Floating shapes parallax
ScrollTrigger.create({
  trigger: ".about",
  scroller: "[data-scroll-container]",
  start: "top bottom",
  end: "bottom top",
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    gsap.set(".floating-shape", {
      y: progress * 100,
      rotation: progress * 360,
    });
  },
});

// Section Titles Animation
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.fromTo(
    title,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        scroller: "[data-scroll-container]",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// Skills Cards Animation
gsap.utils.toArray(".skill-item").forEach((item, index) => {
  gsap.fromTo(
    item,
    {
      y: 60,
      opacity: 0,
      scale: 0.9,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        scroller: "[data-scroll-container]",
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// About Section Animation
gsap.fromTo(
  ".about-text",
  {
    x: -100,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-content",
      scroller: "[data-scroll-container]",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  }
);

gsap.fromTo(
  ".about-image",
  {
    x: 100,
    opacity: 0,
    scale: 0.8,
  },
  {
    x: 0,
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-content",
      scroller: "[data-scroll-container]",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  }
);

// Contact Links Animation
gsap.utils.toArray(".contact-link").forEach((link, index) => {
  gsap.fromTo(
    link,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-links",
        scroller: "[data-scroll-container]",
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      scroll.scrollTo(target);
    }
  });
});

// Navbar background on scroll
scroll.on("scroll", (instance) => {
  const navbar = document.querySelector(".navbar");
  if (instance.scroll.y > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Refresh ScrollTrigger when everything is set up
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

// Mouse cursor effect (optional enhancement)
const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

// Add cursor styles
const cursorStyle = document.createElement("style");
cursorStyle.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        background: #3498db;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    }
    
    .custom-cursor.hover {
        transform: scale(2);
    }
    
    * {
        cursor: none !important;
    }
`;
document.head.appendChild(cursorStyle);

// Mouse move effect
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX - 10 + "px";
  cursor.style.top = e.clientY - 10 + "px";
});

// Hover effects for interactive elements
document.querySelectorAll("a, button, .btn").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// Loading animation
window.addEventListener("load", () => {
  gsap.to("body", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });
});

// Initialize body opacity
gsap.set("body", { opacity: 0 });

// Parallax effect for hero background
gsap.to(".hero", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    scroller: "[data-scroll-container]",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

// Text reveal animation for paragraphs
gsap.utils.toArray(".about-text p").forEach((p, index) => {
  gsap.fromTo(
    p,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: p,
        scroller: "[data-scroll-container]",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// Add some interactive hover effects
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Typing effect for hero subtitle (optional)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Apply typing effect after initial animation
setTimeout(() => {
  const subtitle = document.querySelector(".hero-subtitle");
  const originalText = subtitle.textContent;
  typeWriter(subtitle, originalText, 80);
}, 2000);

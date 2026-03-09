gsap.registerPlugin(ScrollTrigger);

function initTypographyTransitionDivs() {
  const container = document.querySelector(
    ".typography_transition-container-top",
  );
  const divs = container.children;

  let height = 4;
  const multiplier = 1.33;

  for (let i = 0; i < divs.length; i++) {
    divs[i].style.height = `${height}px`;
    height *= multiplier;
  }
}

function initTypographyTransitionAnim() {
  const container = document.querySelector(
    ".typography_transition-container-bottom",
  );
  gsap.to(container, {
    scale: 0.9,
    opacity: 0.1,
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
      pin: true,
      pinSpacing: false,
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTypographyTransitionDivs();
  initTypographyTransitionAnim();
});

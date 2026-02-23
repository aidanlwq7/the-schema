gsap.registerPlugin(ScrollTrigger);

function initAboutPathsAnim() {
  const container = document.querySelector(".about_container");
  const orangePath = document.querySelector(".orange_path");
  const yellowPath = document.querySelector(".yellow_path");

  const orangeLength = orangePath.getTotalLength();
  const yellowLength = yellowPath.getTotalLength();

  gsap.set([orangePath, yellowPath], { strokeDashoffset: 0 });
  gsap.set(orangePath, {
    strokeDasharray: orangeLength,
    strokeDashoffset: orangeLength,
  });
  gsap.set(yellowPath, {
    strokeDasharray: yellowLength,
    strokeDashoffset: yellowLength,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      end: "bottom 80%",
      scrub: true,
    },
    defaults: { ease: "none" },
  });

  tl.to(orangePath, { strokeDashoffset: 0, duration: 1 }, 0).to(
    yellowPath,
    { strokeDashoffset: 0, duration: 1 },
    0.2,
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initAboutPathsAnim();
});


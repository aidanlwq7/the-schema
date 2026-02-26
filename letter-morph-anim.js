gsap.registerPlugin(MorphSVGPlugin);

function initMorphLoop() {
  const main = "#letter-first";

  const tl = gsap.timeline({
    repeat: -1,
    defaults: { duration: 1.1, ease: "power3.out" },
  });

  tl.to(main, { morphSVG: "#letter-second" }).to(main, {
    morphSVG: "#letter-first",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMorphLoop();
});

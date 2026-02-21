gsap.registerPlugin(Draggable, InertiaPlugin);

function initHeroDragInteraction() {
  const svg = document.querySelector(".hero_text_svg_wrapper svg");
  const icons = gsap.utils.toArray(svg.querySelectorAll("g.icon"));
  const container = document.querySelector(".hero_text_svg");

  icons.forEach((icon) => {
    Draggable.create(icon, {
      inertia: true,
      bounds: container,

      onPress() {
        gsap.to(this.target, {
          rotate: "random(-10, 10)",
          scale: 1.1,
          duration: 0.2,
          filter: "drop-shadow(0px 10px 8px rgba(0,0,0,0.25))",
          ease: "power2.out",
          transformOrigin: "center center",
        });
      },

      onRelease() {
        gsap.to(this.target, {
          rotate: 0,
          scale: 1,
          filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
          duration: 0.25,
          ease: "power2.out",
        });
      },
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 992px)", () => {
    initHeroDragInteraction();
  });
});

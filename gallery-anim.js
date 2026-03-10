gsap.registerPlugin(ScrollTrigger);

function initGalleryAnim() {
  const section = document.querySelector(".colors_container-top");
  const gallery = document.querySelector(".colors_gallery");

  const configs = [
    {
      el: document.querySelector(".gallery_img-1"),
      start: 0.1,
      end: 0.82,
      from: gallery.offsetHeight + 400,
      to: -gallery.offsetHeight - 300,
      rotateFrom: -24,
      rotateTo: 12,
    },
    {
      el: document.querySelector(".gallery_img-2"),
      start: 0,
      end: 1,
      from: gallery.offsetHeight + 320,
      to: -gallery.offsetHeight - 420,
      rotateFrom: 25,
      rotateTo: -50,
    },
    {
      el: document.querySelector(".gallery_img-3"),
      start: 0.3,
      end: 0.85,
      from: gallery.offsetHeight + 420,
      to: -gallery.offsetHeight - 560,
      rotateFrom: -20,
      rotateTo: 18,
    },
    {
      el: document.querySelector(".gallery_img-4"),
      start: 0.3,
      end: 0.9,
      from: gallery.offsetHeight + 400,
      to: -gallery.offsetHeight - 500,
      rotateFrom: 10,
      rotateTo: -20,
    },
    {
      el: document.querySelector(".gallery_img-5"),
      start: 0.2,
      end: 0.93,
      from: gallery.offsetHeight + 500,
      to: -gallery.offsetHeight - 100,
      rotateFrom: 35,
      rotateTo: -40,
    },
    {
      el: document.querySelector(".gallery_img-6"),
      start: 0.1,
      end: 0.9,
      from: gallery.offsetHeight + 500,
      to: -gallery.offsetHeight - 200,
      rotateFrom: -5,
      rotateTo: -30,
    },
  ];

  configs.forEach((cfg) => {
    gsap.set(cfg.el, { y: cfg.from });
  });

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=200%",
    pin: true,
    scrub: 0.8,
    onUpdate: (self) => {
      const globalProgress = self.progress;

      configs.forEach((cfg) => {
        let localProgress = gsap.utils.normalize(
          cfg.start,
          cfg.end,
          globalProgress,
        );

        localProgress = gsap.utils.clamp(0, 1, localProgress);

        const y = gsap.utils.mapRange(0, 1, cfg.from, cfg.to, localProgress);
        const rotation = gsap.utils.mapRange(
          0,
          1,
          cfg.rotateFrom,
          cfg.rotateTo,
          localProgress,
        );
        gsap.set(cfg.el, { y, rotation });
      });
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initGalleryAnim();
  });
});

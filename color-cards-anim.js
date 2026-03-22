gsap.registerPlugin(ScrollTrigger);

const BREAKPOINT = 992;

function initColorCardsAnimForLarger() {
  const stage = document.querySelector(".colors_container-cards");
  const cards = gsap.utils.toArray(".color_card", stage);
  const N = cards.length;

  const CARD_W = cards[0].offsetWidth;
  const CARD_H = cards[0].offsetHeight;
  const OVERLAP = Math.round(CARD_W * 0.5);
  const startX =
    (stage.offsetWidth - (N - 1) * (CARD_W - OVERLAP) - CARD_W) / 2;
  const centreY = (stage.offsetHeight - CARD_H) / 2;

  const zIndexes = Array.from({ length: N }, (_, i) => i + 1).sort(
    () => Math.random() - 0.5,
  );

  const configs = cards.map((el, i) => ({
    el,
    x: startX + i * (CARD_W - OVERLAP),
    y: centreY + (Math.random() - 0.5) * 30,
    rot: (Math.random() - 0.5) * 22,
    zi: zIndexes[i],
  }));

  configs.forEach((cfg) => {
    gsap.set(cfg.el, {
      x: cfg.x,
      y: cfg.y,
      rotation: cfg.rot,
      zIndex: cfg.zi,
      scale: 1,
    });
  });

  const MAX_PUSH = Math.round(CARD_W * 0.75);
  const FALLOFF = 0.45;

  function spreadCards(focusIdx) {
    configs.forEach((cfg, i) => {
      const rank = i - focusIdx;
      const focused = rank === 0;
      const pushX = focused
        ? 0
        : Math.sign(rank) * MAX_PUSH * Math.pow(FALLOFF, Math.abs(rank) - 1);

      gsap.to(cfg.el, {
        x: cfg.x + pushX,
        y: cfg.y,
        rotation: focused ? 0 : cfg.rot,
        scale: focused ? 1.05 : 1,
        duration: 0.5,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  }

  function resetCards() {
    configs.forEach((cfg) => {
      gsap.to(cfg.el, {
        x: cfg.x,
        y: cfg.y,
        rotation: cfg.rot,
        scale: 1,
        duration: 0.65,
        ease: "elastic.out(1, 0.55)",
        overwrite: "auto",
      });
    });
  }

  function getFocusIdx(mouseX) {
    return configs.reduce((closest, cfg, i) => {
      const dist = Math.abs(mouseX - (cfg.x + CARD_W / 2));
      return dist < Math.abs(mouseX - (configs[closest].x + CARD_W / 2))
        ? i
        : closest;
    }, 0);
  }

  stage.addEventListener("mousemove", (e) => {
    spreadCards(getFocusIdx(e.clientX - stage.getBoundingClientRect().left));
  });
  stage.addEventListener("mouseleave", resetCards);
}

function initColorCardsAnimForSmaller() {
  const stage = document.querySelector(".colors_container-bottom");
  const cards = gsap.utils.toArray(".color_card");
  const N = cards.length;

  const rotations = [10, -12, 5, -8, 2, 15];

  const configs = cards.map((el, index) => ({
    el,
    start: index / N,
    end: (index + 1) / N,
    distanceMultiplier: 1 - index * 0.15,
    rotation: rotations[index],
  }));

  configs.forEach((cfg) => {
    gsap.set(cfg.el, { y: window.innerHeight, rotate: cfg.rotation });
  });

  ScrollTrigger.create({
    trigger: stage,
    start: "top top",
    end: `+=${window.innerHeight * 6}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const globalProgress = self.progress;

      configs.forEach((cfg, index) => {
        const localProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.normalize(cfg.start, cfg.end, globalProgress),
        );

        const yIn = gsap.utils.mapRange(
          0,
          1,
          window.innerHeight,
          0,
          localProgress,
        );

        const isLanded = localProgress === 1 && index < N - 1;
        const exitProgress = isLanded
          ? gsap.utils.clamp(
              0,
              1,
              gsap.utils.normalize(cfg.end, 1, globalProgress),
            )
          : 0;

        const x = gsap.utils.mapRange(
          0,
          1,
          0,
          -window.innerWidth * 0.3 * cfg.distanceMultiplier,
          exitProgress,
        );
        const y = isLanded
          ? gsap.utils.mapRange(
              0,
              1,
              0,
              -window.innerHeight * 0.3 * cfg.distanceMultiplier,
              exitProgress,
            )
          : yIn;

        gsap.set(cfg.el, { x, y });
      });
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    if (window.innerWidth < BREAKPOINT) {
      initColorCardsAnimForSmaller();
    } else {
      initColorCardsAnimForLarger();
    }
  });
});

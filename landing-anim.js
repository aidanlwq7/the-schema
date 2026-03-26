gsap.registerPlugin(SplitText);

function initLandingAnimation() {
  const svg = document.querySelector(".hero_text_svg_wrapper svg");
  const items = [];
  const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT, null);

  while (walker.nextNode()) {
    const el = walker.currentNode;
    if (el.tagName === "g" && el.classList.contains("icon")) {
      items.push(el);
    } else if (el.tagName === "path" && !el.closest("g.icon")) {
      items.push(el);
    }
  }

  const video = document.querySelector(".hero_preview_video_wrapper");

  const tagline = document.querySelector(".hero_tagline");

  const tagSplit = SplitText.create(tagline, {
    type: "lines",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      return gsap.from(self.lines, {
        yPercent: 120,
        ease: "power3.inOut",
        duration: 0.9,
        stagger: 0.1,
        onComplete: () => self.revert(),
      });
    },
  });

  const scrollNote = document.querySelector(".hero-scroll-note");

  const noteSplit = SplitText.create(scrollNote, {
    type: "lines",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      return gsap.from(self.lines, {
        yPercent: 120,
        ease: "power3.inOut",
        duration: 0.9,
        onComplete: () => self.revert(),
      });
    },
  });

  gsap.set(items, {
    transformOrigin: "50% 50%",
    scale: 0.6,
    opacity: 0,
    rotation: "random(-20, 20)",
  });

  gsap.set(video, {
    transformOrigin: "bottom center",
    clipPath: "inset(100% 0% 0% 0%)",
    scale: 0.7,
  });

  gsap.set([tagSplit.lines, noteSplit.lines], { yPercent: 120 });

  const tl = gsap.timeline({
    delay: 0.5,
  });

  tl.to(items, {
    scale: 1,
    opacity: 1,
    rotation: 0,
    duration: 0.6,
    ease: "back.out(2.2)",
    stagger: {
      each: 0.01,
      from: "end",
    },
  })
    .to(
      video,
      {
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power3.inOut",
        duration: 0.9,
      },
      "<=0.15",
    )
    .to(tagSplit.lines, {
      yPercent: 0,
      ease: "power3.inOut",
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => tagSplit.revert(),
    })
    .to(noteSplit.lines, {
      yPercent: 0,
      ease: "power3.inOut",
      duration: 0.5,
      onComplete: () => noteSplit.revert(),
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initLandingAnimation();
  });
});

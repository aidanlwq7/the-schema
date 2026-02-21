gsap.registerPlugin(ScrollTrigger, SplitText);

function initAboutTitleAnim() {
  const titles = document.querySelectorAll(".about_title-anim");

  titles.forEach((title) => {
    const split = SplitText.create(title, { type: "chars", aria: "hidden" });

    gsap.to(split.chars, {
      yPercent: -100,
      duration: 1,
      stagger: { each: 0.05, from: "random" },
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 90%"
      },
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initAboutTitleAnim();
  });
});


function initMagicGuidelinesButton() {
  const cols = document.querySelectorAll(".magic_guidelines-col");
  const button = document.querySelector(".guidelines-button");

  let isOpen = false;

  button.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      button.classList.add("is-active");
    } else {
      button.classList.remove("is-active");
    }

    gsap.to(cols, {
      scaleY: isOpen ? 1 : 0,
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.05,
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initMagicGuidelinesButton();
  });
});

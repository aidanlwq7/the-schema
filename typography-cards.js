document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".typography_card");

  cards.forEach((card) => {
    if (window.matchMedia("(min-width: 992px)").matches) {
      card.addEventListener("mouseenter", () => {
        card.classList.add("is-revealed");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("is-revealed");
      });
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      card.addEventListener("click", () => {
        card.classList.toggle("is-revealed");
      });
    }
  });
});

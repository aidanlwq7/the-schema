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
        const isActive = card.classList.contains("is-revealed");

        cards.forEach((c) => c.classList.remove("is-revealed"));

        if (!isActive) {
          card.classList.add("is-revealed");
        }
      });
    }
  });
});

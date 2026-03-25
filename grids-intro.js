const size = 0.03;

function initIntroPixelGrid() {
  const grid = document.querySelector(".intro-pixel-grid");
  const rect = grid.getBoundingClientRect();

  const gridWidth = rect.width;
  const gridHeight = rect.height;

  grid.innerHTML = "";

  const blockSize = gridWidth * size;
  const columns = Math.ceil(gridWidth / blockSize);
  const blocksPerColumn = Math.ceil(gridHeight / blockSize);

  const blocks = [];
  for (let i = 0; i < blocksPerColumn; i++) {
    const block = document.createElement("div");
    block.classList.add("intro_pixel_grid-block");
    blocks.push(block);
  }

  for (let i = 0; i < columns; i++) {
    const column = document.createElement("div");
    column.classList.add("column");

    blocks.forEach((block) => {
      column.appendChild(block.cloneNode(true));
    });

    grid.appendChild(column);
  }
}

function initIntroPixelHoverEffect() {
  const grid = document.querySelector(".intro-pixel-grid");

  grid.addEventListener("mousemove", (e) => {
    const block = e.target.closest(".intro_pixel_grid-block");
    if (!block) return;

    if (block.classList.contains("is-active")) return;

    block.classList.add("is-active");

    setTimeout(() => {
      block.classList.remove("is-active");
    }, 300);
  });
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initIntroPixelGrid();
    initIntroPixelHoverEffect();

    const handleResize = debounce(() => {
      initIntroPixelGrid();
    }, 150);

    window.addEventListener("resize", handleResize);
  });
});

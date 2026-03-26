const BLOCK_DELAY = 0.025;

const overlay = document.querySelector(".carousel-pixel-overlay");
let allBlocks = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSize() {
  return window.innerWidth >= 991 ? 0.03 : 0.05;
}

function initCarouselPixelOverlay() {
  const rect = overlay.getBoundingClientRect();
  const overlayWidth = rect.width;
  const overlayHeight = rect.height;

  overlay.innerHTML = "";
  allBlocks = [];

  const blockSize = overlayWidth * getSize();
  const columns = Math.ceil(overlayWidth / blockSize);
  const rows = Math.ceil(overlayHeight / blockSize);

  const blocks = [];
  for (let i = 0; i < rows; i++) {
    const block = document.createElement("div");
    block.className = "carousel_pixel_overlay-block";
    blocks.push(block);
  }

  for (let i = 0; i < columns; i++) {
    const column = document.createElement("div");
    column.className = "column";

    const colBlocks = [];
    blocks.forEach((block) => {
      const clone = block.cloneNode(true);
      column.appendChild(clone);
      colBlocks.push(clone);
    });

    overlay.appendChild(column);
    allBlocks.push(colBlocks);
  }
}

function pixelTransition() {
  return new Promise((resolve) => {
    const tl = gsap.timeline();

    const rows = allBlocks[0].length;
    const totalInTime = BLOCK_DELAY * (rows - 1);

    for (let c = 0; c < allBlocks.length; c++) {
      const shuffledRows = shuffle([...Array(rows)].map((_, i) => i));

      shuffledRows.forEach((randomRow, r) => {
        const block = allBlocks[c][r];
        const delay = BLOCK_DELAY * randomRow;

        tl.to(block, { opacity: 1, duration: 0, delay }, 0);
        tl.to(block, { opacity: 0, duration: 0, delay }, totalInTime + 0.25);
      });
    }

    tl.call(resolve, null, totalInTime + 0.05);
  });
}

let currentSlide = 1;
let isAnimating = false;
const slides = document.querySelectorAll(".layout-slide");
const buttons = document.querySelectorAll(".layout-button");

function setActiveButton(index) {
  buttons.forEach((b) => b.classList.remove("is-active"));
  buttons[index - 1].classList.add("is-active");
}

async function goToSlide(target) {
  if (target === currentSlide || isAnimating) return;
  isAnimating = true;

  const midpoint = pixelTransition();
  await midpoint;

  slides.forEach((s) => s.classList.remove("is-active"));
  document.querySelector(`[data-slide="${target}"]`).classList.add("is-active");

  setActiveButton(target);
  currentSlide = target;

  const totalInTime = BLOCK_DELAY * (allBlocks[0].length - 1) * 1000;
  setTimeout(
    () => {
      isAnimating = false;
    },
    totalInTime + 0.25 * 1000 + 400,
  );
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = parseInt(btn.dataset.target, 10);
    goToSlide(target);
  });
});

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initCarouselPixelOverlay();

    const handleResize = debounce(() => {
      initCarouselPixelOverlay();
    }, 150);

    window.addEventListener("resize", handleResize);
  });
});

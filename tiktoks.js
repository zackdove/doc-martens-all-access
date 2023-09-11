const tiktokContainers = document.querySelectorAll(
  "#tiktoksContainer .tiktokContainer"
);

const tiktoksContainer = document.getElementById("tiktoksContainer");

let tiktokOffsetX = 0;

const rightArrows = document.querySelectorAll(".tiktokRightArrow");

const leftArrows = document.querySelectorAll(".tiktokLeftArrow");

for (let i = 0; i < rightArrows.length; i++) {
  rightArrows[i].addEventListener("click", () => {
    console.log("eh");
    tiktokOffsetX += 100;
    tiktokOffsetX = mod(tiktokOffsetX, tiktokContainers.length * 100);
    console.log(tiktokOffsetX);
    tiktoksContainer.style.transform = `translateX(${-tiktokOffsetX}vw)`;
  });
}

for (let i = 0; i < leftArrows.length; i++) {
  leftArrows[i].addEventListener("click", () => {
    tiktokOffsetX -= 100;
    tiktokOffsetX = mod(tiktokOffsetX, tiktokContainers.length * 100);
    console.log(tiktokOffsetX);
    tiktoksContainer.style.transform = `translateX(${-tiktokOffsetX}vw)`;
  });
}

// Scrollers

const lerp = (current, target, factor) =>
  current * (1 - factor) + target * factor;

class LoopingText {
  constructor(el, vertical = false) {
    this.el = el;
    this.lerp = { current: 0, target: 0 };
    this.interpolationFactor = 0.1;
    this.speed = 0.3;
    this.direction = el.classList.contains("reverse") ? -1 : 1; // -1 (to-left), 1 (to-right)
    // Init
    this.vertical = vertical;
    this.el.style.cssText = `position: relative; display: inline-flex; white-space: nowrap;`;
    this.el.children[1].style.cssText = `position: absolute; ${
      vertical ? "top" : "left"
    }: ${100 * -this.direction}%;`;
    // this.events();
    // this.render();
  }

  update() {
    this.lerp.target += this.speed;
    this.lerp.current = lerp(
      this.lerp.current,
      this.lerp.target,
      this.interpolationFactor
    );

    if (this.lerp.target > 100) {
      this.lerp.current -= this.lerp.target;
      this.lerp.target = 0;
    }

    const x = this.lerp.current * this.direction;

    this.el.style.transform = this.vertical
      ? `translateY(${x}%)`
      : `translateX(${x}%)`;
  }
}

const updatables = [];

function render() {
  window.requestAnimationFrame(render);
  for (let i = 0; i < updatables.length; i++) {
    updatables[i].update();
  }
}
render();

updatables.push(
  new LoopingText(document.getElementById("horizontalScrollerContainer"))
);

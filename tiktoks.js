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
